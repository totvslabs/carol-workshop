import { Injectable, isDevMode } from '@angular/core';
import { Router } from '@angular/router';
import { carol } from '@carol/carol-sdk/lib/carol';
import * as moment from 'moment';
import { Observable, Observer } from 'rxjs';
import { utils } from '@carol/carol-sdk/lib/utils';
import { httpClient } from '@carol/carol-sdk/lib/http-client';
import { PoToolbarProfile } from '@po-ui/ng-components';
import * as conf from '../../../proxy.conf.json';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  sessionObservable: Observable<PoToolbarProfile>;
  sessionObserver: Observer<PoToolbarProfile>;

  constructor(
    private router: Router
  ) {
    this.sessionObservable = new Observable(observer => {
      this.sessionObserver = observer;

      if (localStorage.getItem('user')) {
        observer.next(this.buildProfile());
      }
    });
  }

  setSession(authResult, user) {
    carol.setAuthToken(authResult['access_token']);

    const tokenName = this.getTokenName();

    localStorage.setItem(tokenName, authResult['access_token']);
    localStorage.setItem('user', user);

    const expiresAt = moment().add(authResult['expires_in'], 'second');
    localStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()));

    this.sessionObserver.next(this.buildProfile());
  }

  getTokenName() {
    if (utils.getOrganization()) {
      return `carol-${utils.getOrganization()}-${utils.getEnvironment()}-token`;
    } else {
      return 'carol-token';
    }
  }

  getSession(): Observable < any > {
    return this.sessionObservable;
  }

  logout() {
    return carol.logout().then(() => {
      localStorage.clear();

      this.goToLogin(true);
    });
  }

  isLoggedIn() {
    return moment().isBefore(this.getExpiration());
  }

  isLoggedOut() {
    return !this.isLoggedIn();
  }

  getExpiration() {
    const expiration = localStorage.getItem('expires_at');
    const expiresAt = JSON.parse(expiration);
    return moment(expiresAt);
  }

  buildProfile(): PoToolbarProfile {
    return {
      avatar: 'assets/images/avatar-24x24.png',
      title: localStorage.getItem('user')
    };
  }

  goToLogin(logout = false) {
    let origin;
    let url;

    let redirect = encodeURI(location.pathname);

    if (isDevMode()) {
      origin = conf['/api/*'].target;
      url = `${origin}/auth/?redirect=${redirect}&env=${httpClient.environment}&org=${httpClient.organization}&logout=${logout}`;
    } else {
      origin = location.origin;
      url = `${origin}/auth/?redirect=${redirect}&env=${httpClient.environment}&org=${httpClient.organization}&logout=${logout}`;
    }


    window.open(url, '_self');
  }
}

