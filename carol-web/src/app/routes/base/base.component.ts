import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Observable } from 'rxjs';
import { PoToolbarProfile, PoToolbarAction } from '@po-ui/ng-components';

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html'
})
export class BaseComponent {

  menus = [
    { label: 'Dashboard', link: '/' },
    { label: 'Adicionar Funcionário', link: '/clientes/add'}
  ];

  profile: Observable<PoToolbarProfile>;

  profileActions: Array<PoToolbarAction> = [
    {
      icon: 'po-icon-exit',
      label: 'Exit',
      type: 'danger',
      separator: true,
      action: item => this.authService.logout()
    }
  ];

  constructor(
    private authService: AuthService,
  ) {
    this.profile = this.authService.sessionObservable;
  }

}
