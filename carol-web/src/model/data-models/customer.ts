
export class Customer {

  static dataModelName = 'mdmcustomer';

  mdmId: string;
  mdmUpdatedUser: string;
  mdmEntityType: string;
  mdmCreatedUser: string;
  mdmLastUpdated: Date;
  mdmCreated: string;
  relations: any[];
  mdmCrosswalk: {
    mdmApplicationId: string;
    mdmStagingType: string;
    mdmConnectorId: string;
    mdmCrossreference: any;
  };
  mdmGoldenFieldAndValues: {
    mdmname: string;
    mdmdba: string;
    mdmcustomerid: string;
    mdmtaxid: string;
    mdmstatetaxid: string;
    mdmcitytaxid: string;
    mdmregisterdate: Date;
    mdmhomepage: string;
    mdmphone: any;
    mdmaddress: any;
    mdmemail: any;
    empty_mdmregisterdate: boolean;
    offset_mdmregisterdate: string;
  };

  static mdmId = 'mdmId';
  static mdmUpdatedUser = 'mdmUpdatedUser';
  static mdmEntityType = 'mdmEntityType';
  static mdmCreatedUser = 'mdmCreatedUser';
  static mdmLastUpdated = 'mdmLastUpdated';
  static mdmCreated = 'mdmCreated';

  static mdmGoldenFieldAndValues = {
    mdmname: '.mdmname',
    mdmdba: '.mdmdba',
    mdmcustomerid: '.mdmcustomerid',
    mdmtaxid: '.mdmtaxid',
    mdmstatetaxid: '.mdmstatetaxid',
    mdmcitytaxid: '.mdmcitytaxid',
    mdmregisterdate: '.mdmregisterdate',
    mdmhomepage: '.mdmhomepage',
    mdmphone: '.mdmphone',
    mdmaddress: '.mdmaddress',
    mdmemail: '.mdmemail',
    empty_mdmregisterdate: '.empty_mdmregisterdate',
    offset_mdmregisterdate: '.offset_mdmregisterdate'
  };
}

