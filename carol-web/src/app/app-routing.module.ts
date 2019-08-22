import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './routes/home/home.component';
import { BaseComponent } from './routes/base/base.component';
import { CustomerComponent } from './routes/customer/customer.component';
import { LoginComponent } from './routes/login/login.component';


const routes: Routes = [
  { path: '', component: BaseComponent, children: [
    { path: '', component: HomeComponent },
    { path: 'customer/:id', component: CustomerComponent }
  ]},
  { path: 'login', component: LoginComponent }
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
