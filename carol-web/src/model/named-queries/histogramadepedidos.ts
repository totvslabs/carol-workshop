export class Histogramadepedidos {
  static namedQueryName = 'histogramadepedidos';
}

export class HistogramadepedidosParams {

  constructor(obj: HistogramadepedidosParams) {
    if (obj) {
      Object.keys(obj).forEach(key => {
        this[key] = obj[key];
      });
    }
  }

}
