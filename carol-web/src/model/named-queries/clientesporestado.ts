export class Clientesporestado {
  static namedQueryName = 'clientesporestado';
}

export class ClientesporestadoParams {

  constructor(obj: ClientesporestadoParams) {
    if (obj) {
      Object.keys(obj).forEach(key => {
        this[key] = obj[key];
      });
    }
  }

}
