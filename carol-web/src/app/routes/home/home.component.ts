import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import * as moment from 'moment';
import { PoNotificationService } from '@po-ui/ng-components';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  // grid
  selectedRows = [];
  gridColumns = [
    { property: 'customerid', label: '#', width: '10%'},
    { property: 'taxid', label: 'CNPJ', width: '20%'},
    { property: 'name', label: 'Nome Cliente', width: '35%'},
    { property: 'address1', label: 'Endereço', width: '10%'},
    { property: 'address2', label: 'Bairro', width: '10%'},
    { property: 'city', label: 'Cidade', width: '10%'},
    { property: 'state', label: 'Estado', width: '10%'}
  ];
  loadingGrid   = false;
  gridData: any = [];
  offset        = 0;
  pageSize      = 20;
  currentPage   = 1;
  selectedFilter;

  loadingGraph = true;

  // paginator
  currentPageHits = 0;
  totalHits = 0;

  pendingAction = false;

  categories = [];

  totalSecondInsight = 0;

  constructor(
    private http: HttpClient,
    private notificationService: PoNotificationService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getCustomers();
    this.getFirstGraphData();
    this.getSecondGraphData();
  }

  getSecondGraphData() {
    this.http.post(
      `/api/v1/queries/named/totaldeclientes?&indexType=MASTER&pageSize=0`,
      {}
    ).subscribe((res: any) => {
      this.totalSecondInsight = res.totalHits.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
    });
  }

  graphDataSource = [
    { name: 'Quantidade Pedidos', data: [] }
  ];

  getFirstGraphData() {
    this.http.post('/api/v1/queries/named/ordersovertime?pageSize=10&indexType=MASTER&scrollable=false&sortBy=&sortOrder=ASC', {}).subscribe(
      (res: any) => {
        const buckets = res.aggs.mdmregisterdate.buckets
        // const countPerPeriod = Math.floor(Object.keys(buckets).length / 6);
        const countPerPeriod = 1;

        for (let i = 0; i < Object.keys(buckets).length; i += countPerPeriod) {
          const span = Object.keys(buckets).sort().slice(i, i + countPerPeriod);
          this.categories.push(moment(span[0]).format('DD/MM/YYYY'));
          this.graphDataSource[0].data.push(buckets[span[0]].docCount);
        }

        this.loadingGraph = false;
      }
    )

  }

  getCustomers() {
    this.loadingGrid = true;
    this.selectedRows = [];

    const offset = (this.currentPage - 1) * this.pageSize;
    const params: any = {};

    if (this.selectedFilter) {
      params.name = this.selectedFilter;
    }

    this.http.post(
      `/api/v1/queries/named/listcustomers?offset=${offset}&pageSize=${this.pageSize}&indexType=MASTER&scrollable=false`, params
    ).subscribe(
      ({hits, count, totalHits}: any) => {
        this.loadingGrid     = false;
        this.currentPageHits = count;
        this.totalHits       = totalHits;

        this.gridData = hits.map(
          ({mdmGoldenFieldAndValues, mdmId, mdmCrosswalk}: any) => ({
            name: mdmGoldenFieldAndValues.mdmname,
            customerid: mdmGoldenFieldAndValues.mdmcustomerid,
            taxid: mdmGoldenFieldAndValues.mdmtaxid,
            registereddate: mdmGoldenFieldAndValues.mdmregisterdate,
            address1: (mdmGoldenFieldAndValues.mdmaddress != undefined ? mdmGoldenFieldAndValues.mdmaddress[0].mdmaddress1 : ""),
            address2: (mdmGoldenFieldAndValues.mdmaddress != undefined ? mdmGoldenFieldAndValues.mdmaddress[0].mdmaddress2 : ""),
            zipcode: (mdmGoldenFieldAndValues.mdmaddress != undefined ? mdmGoldenFieldAndValues.mdmaddress[0].mdmzipcode : ""),
            city: (mdmGoldenFieldAndValues.mdmaddress != undefined ? mdmGoldenFieldAndValues.mdmaddress[0].mdmcity : ""),
            state: (mdmGoldenFieldAndValues.mdmaddress != undefined ? mdmGoldenFieldAndValues.mdmaddress[0].mdmstate : ""),
            mdmId: mdmId
          })
        );

        this.getSecondGraphData();
      }
    );
  }

  onChangeFilter(value) {
    this.selectedFilter = value;
    this.currentPage = 1;
    this.getCustomers();
  }

  onChangePage({currentPage}) {
    this.currentPage = currentPage;
    this.getCustomers();
  }

  changeSelectionState = (event) => {
    if (event instanceof Array) {
      if (event[0]['$selected']) {
        this.selectedRows = [...event];
      } else {
        this.selectedRows = [];
      }
    } else {
      if (event['$selected']) {
        this.selectedRows.push(event);
      } else {
        const idx = this.selectedRows.findIndex(p => p.requestId === event.requestId);
        this.selectedRows.splice(idx, 1);
      }
    }
  }

  addNew() {
    this.router.navigate(['customer', 'add']);
  }

  editSelected() {
    this.router.navigate(['customer', this.selectedRows[0].mdmId]);
  }

  deleteSelected() {
    this.pendingAction = true;
    this.selectedRows.forEach(
      (selectedRow, index) => {
        var id = selectedRow.mdmId;

        this.http.get(`/api/v1/entities/templates/02310e10c1ed11e9a42842010a840092/goldenRecords/${selectedRow.mdmId}`).subscribe(
        // this.http.post(
        //   '/api/v1/queries/named/listcustomers',
        //   {id}
        // ).subscribe(
          (res: any) => {
            // if(res.hits != undefined && res.hits.length > 0) {
              // const crossWalks = res.hits[0].mdmCrosswalk;
              const crossWalks = res.mdmCrosswalk;
              crossWalks.forEach((cw, idx) => {
                this.http.delete(
                  `/api/v2/staging/tables/${cw.mdmStagingType}/using_identifier?crosswalks=${JSON.stringify(cw.mdmCrossreference)}&connectorId=${cw.mdmConnectorId}&propagateCleanup=true`
                ).subscribe(() => {
                    this.notificationService.success('Registros excluídos com sucesso');
                    this.pendingAction = false;
                    setTimeout((delay=2500) => {
                      this.getCustomers();
                    });
                });
              });
            // }
          }
        );
      }
    );
  }
}
