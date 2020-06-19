import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BaseComponent } from './routes/base/base.component';
import { CadastrarClienteComponent } from './routes/cadastrar-cliente/cadastrar-cliente.component';
import { DashboardComponent } from './routes/dashboard/dashboard.component';


const routes: Routes = [
  { path: '', component: BaseComponent, children: [
    { path: '', component: DashboardComponent },
    { path: 'clientes/:id', component: CadastrarClienteComponent }
  ]}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
