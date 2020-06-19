import { Component, OnInit } from '@angular/core';
import { carol } from '@carol/carol-sdk/lib/carol';
import { PoPieChartSeries, PoNotificationService } from '@po-ui/ng-components';
import { CustomerAnalysis } from 'src/model/data-models/customer-analysis';
import { Customer } from 'src/model/data-models/customer';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'dashboard.component.html',
  styleUrls: ['dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  readonly PAGE_SIZE = 30;

  chartSeries: PoPieChartSeries[];

  columns = [
    { property: 'id', label: '#', width: '120px' },
    { property: 'taxid', label: 'CNPJ', width: '120px' },
    { property: 'name', label: 'Name' },
    { property: 'address1', label: 'Endereço', width: '240px' },
    { property: 'address2', label: 'Bairro', width: '240px' },
    { property: 'city', label: 'Cidade', width: '240px' },
    { property: 'state', label: 'Estado', width: '240px' }
  ];

  customers: {
    mdmId: string,
    id: string,
    name: string,
    taxid: string,
    address1: string,
    address2: string,
    city: string,
    state: string
  }[];

  selectedCustomer: any;

  customerName = '';

  customersTotalHits
  currentPage = 1;

  constructor(
    private notification: PoNotificationService
  ) {}

  ngOnInit() {
    this.getChartData();
    this.changePage(1);
  }

  changePage(newPage: number = this.currentPage) {
    this.currentPage = newPage;
    this.getCustomers();
  }

  async removeCustomer(mdmId) {
    await carol.deleteGolden(Customer, mdmId);
    this.notification.success('Cliente removido');
    this.changePage();
  }

  private getChartData() {
    carol.select<{ mdmcustomername: string, score: number }>(
        CustomerAnalysis.mdmGoldenFieldAndValues.mdmcustomername,
        CustomerAnalysis.mdmGoldenFieldAndValues.score
      )
      .from(CustomerAnalysis)
      .execute().then(response => {
        this.chartSeries = response.hits.map((h: any) => {
          return {
            category: h.mdmGoldenFieldAndValues.mdmcustomername,
            value: Number(h.mdmGoldenFieldAndValues.score)
          };
        });

        console.log(this.chartSeries);
      });
  }

  private getCustomers() {
    const query = carol.select<Customer>()
      .from(Customer)
      .pageSize(this.PAGE_SIZE)
      .offset((this.currentPage - 1) * this.PAGE_SIZE);

    if (this.customerName) {
      query.and(Customer.mdmGoldenFieldAndValues.mdmname).like(this.customerName);
    }

    query.execute().then(response => {
      this.customers = response.hits.map(customer => {
        return {
          mdmId: customer.mdmId,
          id: customer.mdmGoldenFieldAndValues.mdmcustomerid,
          taxid: customer.mdmGoldenFieldAndValues.mdmtaxid,
          name: customer.mdmGoldenFieldAndValues.mdmname,
          address1: customer.mdmGoldenFieldAndValues.mdmaddress?.mdmaddress1,
          address2: customer.mdmGoldenFieldAndValues.mdmaddress?.mdmaddress2,
          city: customer.mdmGoldenFieldAndValues.mdmaddress?.mdmcity,
          state: customer.mdmGoldenFieldAndValues.mdmaddress?.mdmstate
        };
      });
      this.customersTotalHits = response.totalHits;
    });
  }


}

