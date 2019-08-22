import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ThfNotificationService } from '@totvs/thf-ui/services/thf-notification';

import * as moment from 'moment';

@Component({
  selector: 'app-manufacture-component',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit {

  pageTitle = 'Cadastro de Cliente';
  posting = false;
  currentUserProfile: any = {};

  manufacture: any = {};
  customer: any = {};
  connectorId: any = {};

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private thfNotificationService: ThfNotificationService,
  ) {
    this.authService.sessionObservable.subscribe(
      (res) => {
        this.currentUserProfile = res;
      }
    );
  }

  ngOnInit() {
    this.route.params.subscribe(
      ({id}) => {
        if (id !== 'add') {
          this.pageTitle = 'Edição de Cliente';
          this.getCustomerById(id);
        }
      }
    );

    this.http.get(
      '/api/v1/connectors/name/webapp',
    ).subscribe(
      (res: any) => {
        if (res == undefined) {
          this.thfNotificationService.information('Connector WebApp não encontrado.');
          this.router.navigate(['/']);
          return;
        }

        this.connectorId = res["mdmId"];
      }
    );

  }

  getCustomerById(id) {
    this.http.post(
      '/api/v1/queries/named/listcustomers',
      {id}
    ).subscribe(
      ({hits}: any) => {
        if (!hits.length) {
          this.thfNotificationService.information('Registro não encontrado');
          this.router.navigate(['/']);
          return;
        }

        const recordById = hits[0].mdmGoldenFieldAndValues;
        const parsedDate: any = moment.utc(recordById.mdmregisterdate);

        this.customer = {
          name : recordById.mdmname,
          dba : recordById.mdmdba,
          customerid: recordById.mdmcustomerid,
          taxid: recordById.mdmtaxid,
          citytaxid    : recordById.mdmstatetaxid,
          statetaxid       : recordById.mdmcitytaxid,
          registereddate: parsedDate._d,
          address1: ((recordById.mdmaddress != undefined && recordById.mdmaddress.length > 0) ? recordById.mdmaddress[0].mdmaddress1 : ""),
          address2: ((recordById.mdmaddress != undefined && recordById.mdmaddress.length > 0) ? recordById.mdmaddress[0].mdmaddress2 : ""),
          address3: ((recordById.mdmaddress != undefined && recordById.mdmaddress.length > 0) ? recordById.mdmaddress[0].mdmaddress3 : ""),
          zipcode: ((recordById.mdmaddress != undefined && recordById.mdmaddress.length > 0) ? recordById.mdmaddress[0].mdmzipcode : ""),
          city: ((recordById.mdmaddress != undefined && recordById.mdmaddress.length > 0) ? recordById.mdmaddress[0].mdmcity : ""),
          state: ((recordById.mdmaddress != undefined && recordById.mdmaddress.length > 0) ? recordById.mdmaddress[0].mdmstate : ""),
          country: ((recordById.mdmaddress != undefined && recordById.mdmaddress.length > 0) ? recordById.mdmaddress[0].mdmcountry : "")
        };
      }
    );
  }

  missingRequiredData() {
    const { name, customerid, taxid, registereddate } = this.customer;

    return !name || !customerid || !taxid || !registereddate;
  }

  saveCustomer() {
    if (this.missingRequiredData() || this.posting)  {
      return;
    }

    this.posting = true;

    this.customer.registereddate = new Date(this.customer.registereddate);

    const payload = {...this.customer};

    this.http.post(
      `/api/v2/staging/tables/customer/sync?connectorId=` + this.connectorId,
      payload
    ).subscribe(
      () => {
        this.thfNotificationService.success('Registro salvo com sucesso');
        this.router.navigate(['/']);
      }
    );
  }

  cancel() {
    if (this.posting) {
      return;
    }

    this.router.navigate(['/']);
  }
}
