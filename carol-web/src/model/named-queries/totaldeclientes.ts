export class Totaldeclientes {
  static namedQueryName = 'totaldeclientes';
}

export class TotaldeclientesParams {

  constructor(obj: TotaldeclientesParams) {
    if (obj) {
      Object.keys(obj).forEach(key => {
        this[key] = obj[key];
      });
    }
  }

}
