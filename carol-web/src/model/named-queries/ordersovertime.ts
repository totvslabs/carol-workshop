export class Ordersovertime {
  static namedQueryName = 'ordersovertime';
}

export class OrdersovertimeParams {

  constructor(obj: OrdersovertimeParams) {
    if (obj) {
      Object.keys(obj).forEach(key => {
        this[key] = obj[key];
      });
    }
  }

}
