import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { carol } from '@carol/carol-sdk/lib/carol';
import { PoNotificationService } from '@po-ui/ng-components';
import { Customer } from 'src/model/data-models/customer';

@Component({
  selector: 'app-cadastrar-cliente',
  templateUrl: 'cadastrar-cliente.component.html'
})
export class CadastrarClienteComponent implements OnInit {

  customer: Customer;

  constructor(
    private notification: PoNotificationService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  async ngOnInit() {
    if (this.activatedRoute.snapshot.params.id === 'add') {
      this.customer = new Customer();
      this.customer.mdmGoldenFieldAndValues = { mdmaddress: {} } as any;
    } else {
      const response = await carol.select<Customer>().from(Customer).and(Customer.mdmId).equals(this.activatedRoute.snapshot.params.id).execute();
      this.customer = response.hits[0];
    }

  }

  async save() {
    if (this.customer.mdmId) {
      await carol.updateGolden(Customer, this.customer.mdmId, this.customer.mdmGoldenFieldAndValues);
    } else {
      await carol.postGolden(Customer, this.customer.mdmGoldenFieldAndValues);
    }

    this.notification.success('Cliente cadastrado com sucesso');
    this.router.navigate(['/']);
  }

  goBack() {
    this.router.navigate(['/']);
  }

}

