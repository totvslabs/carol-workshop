import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BaseComponent } from './routes/base/base.component';
import { CustomerComponent } from './routes/customer/customer.component';
import { HomeComponent } from './routes/home/home.component';

const routes: Routes = [
  { path: '', component: BaseComponent, children: [
    { path: '', component: HomeComponent },
    { path: 'customer/:id', component: CustomerComponent }
  ]}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { useHash: true })
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
