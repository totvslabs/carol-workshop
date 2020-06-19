
export class CustomerAnalysis {

  static dataModelName = 'customeranalysis';

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
    mdmcustomerid: string;
    mdmcustomername: string;
    mdmtaxid: string;
    predictiondate: Date;
    score: number;
    empty_predictiondate: boolean;
    offset_predictiondate: string;
  };

  static mdmId = 'mdmId';
  static mdmUpdatedUser = 'mdmUpdatedUser';
  static mdmEntityType = 'mdmEntityType';
  static mdmCreatedUser = 'mdmCreatedUser';
  static mdmLastUpdated = 'mdmLastUpdated';
  static mdmCreated = 'mdmCreated';

  static mdmGoldenFieldAndValues = {
    mdmcustomerid: '.mdmcustomerid',
    mdmcustomername: '.mdmcustomername',
    mdmtaxid: '.mdmtaxid',
    predictiondate: '.predictiondate',
    score: '.score',
    empty_predictiondate: '.empty_predictiondate',
    offset_predictiondate: '.offset_predictiondate'
  };
}

