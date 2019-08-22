import { Injectable, isDevMode } from '@angular/core';

import * as configs from '../../../proxy.conf.json';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  private objConnectors: any;

  getConnectorIdDefault(): string {
      return configs['connectorId'];
  }

  getApplicationId(): string {
      return this.getConnectors().applicationId;
  }

  getConnectorId(): string {
      return this.getConnectors().applicationIdInputConnector;
  }

  getAppIdInputConnStudentRetention(): string {
      return this.getConnectors().applicationIdInputConnStudentRetention;
  }

  getSubdomain(): string {
      if (isDevMode()) {
          return configs['subdomain'];
      } else {
          return window.location.host.split('.')[0];
      }
  }

  private getConnectors() {
      if (!this.objConnectors) {
          this.objConnectors = JSON.parse(localStorage.getItem('Connectors'));
      }

      return this.objConnectors;
  }
}
