import { Component, OnInit } from '@angular/core';

import { PoMenuItem } from '@po-ui/ng-components';
import { AuthService } from './services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { carol } from '@carol/carol-sdk/lib/carol';
import { UtilsService } from './services/utils.service';
import { utils } from '@carol/carol-sdk/lib/utils';
import { httpClient } from '@carol/carol-sdk/lib/http-client';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(
    private auth: AuthService,
    private router: Router,
    private utils: UtilsService
  ) { }

  ngOnInit() {
    this.auth.sessionObservable.subscribe();

    carol.setOrganization(this.utils.getOrganization());
    carol.setEnvironment(this.utils.getEnvironment());

    if (this.getParameterByName('handoff')) {
      localStorage.setItem(this.auth.getTokenName(), this.getParameterByName('handoff'));
      this.updateQueryStringParam('handoff', null);
    }

    let idToken;
    if (utils.getOrganization()) {
      idToken = localStorage.getItem(`carol-${utils.getOrganization()}-${utils.getEnvironment()}-token`);
    } else {
      idToken = localStorage.getItem('carol-token');
    }

    if (idToken) {
      idToken = idToken.replace(/\"/g, '');

      carol.setAuthToken(idToken);
    }


    httpClient.addInterceptor('auth', (status, response) => {
      if (status === 401) {
        this.auth.goToLogin();
      }
    });
  }

  private getParameterByName(name) {
    const url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
      results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
  }

  private updateQueryStringParam(key, value) {

    var baseUrl = [location.protocol, '//', location.host, location.pathname].join(''),
      urlQueryString = document.location.search,
      newParam = key + '=' + value,
      params = '?' + newParam;

    if (urlQueryString) {

      const updateRegex = new RegExp('([\?&])' + key + '[^&]*');
      const removeRegex = new RegExp('([\?&])' + key + '=[^&;]+[&;]?');

      if (typeof value == 'undefined' || value == null || value == '') {
        params = urlQueryString.replace(removeRegex, '$1');
        params = params.replace(/[&;]$/, '');
      } else if (urlQueryString.match(updateRegex) !== null) {
        params = urlQueryString.replace(updateRegex, '$1' + newParam);
      } else {
        params = urlQueryString + '&' + newParam;
      }
    }
    window.history.replaceState({}, '', baseUrl + params);
  }

}
