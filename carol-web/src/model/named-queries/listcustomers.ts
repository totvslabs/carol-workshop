export class Listcustomers {
  static namedQueryName = 'listcustomers';
}

export class ListcustomersParams {

  constructor(obj: ListcustomersParams) {
    if (obj) {
      Object.keys(obj).forEach(key => {
        this[key] = obj[key];
      });
    }
  }

  id?: any;
  name?: any;
}
