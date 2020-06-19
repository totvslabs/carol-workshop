
export class OrderManufacturing {

  static dataModelName = 'ordermanufacturing';

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
    mdmregisterdate: Date;
    orderid: string;
    orderserie: string;
    mdmcustomerid: string;
    mdmcustomername: string;
    itens: any;
    ordertotal: number;
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
    mdmregisterdate: '.mdmregisterdate',
    orderid: '.orderid',
    orderserie: '.orderserie',
    mdmcustomerid: '.mdmcustomerid',
    mdmcustomername: '.mdmcustomername',
    itens: '.itens',
    ordertotal: '.ordertotal',
    empty_mdmregisterdate: '.empty_mdmregisterdate',
    offset_mdmregisterdate: '.offset_mdmregisterdate'
  };
}

