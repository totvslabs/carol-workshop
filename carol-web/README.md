# SeedCarolApp

This project can be used as a seed when you want to start building a Carol app. 

[Carol](https://docs.carol.ai) is a data platform with Machine Learning developed and maintained by [Totvs Labs](https://www.totvslabs.com/).

This project is constantly maintained and updated by TOTVS Labs. At the same time we encourage you to open a PR with your improvements and contribute.

The project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.1.3, it also contains [THF 3.21.0](https://thf.totvs.com.br/home) and some extra features to make your life easier when building a Carol App and retrieving data from Carol.

### Included Features/Configurations

1. Ability to easily change the target Tenant. For this edit the file `proxy.conf.json` in the root of the project.
2. Authentication page. 
3. An interceptor that will automatically add the auth token in every HTTP request.
4. THF is ready to use.
5. A script that will connect to your tenant, download the Data Models schema and generate Typescript classes so you have typings in the FE.
6. A service called `carol.service.ts` which wraps the logic to build queries, save and delete data.

### Steps to start building a Carol App

1. Install [Node.js](https://nodejs.org/en/download/)
2. Clone this repo `git clone https://github.com/totvslabs/carolapp-std-tface`
3. Install Angular as a global dependency: `npm install -g @angular/cli`
4. Install the project dependencies: `npm install`
5. Set your tenant in the file `proxy.conf.json`
6. Run the command `npm run update-datamodels` to generate the classes for the data models available in your tenant
7. Start coding

### How to GET data from Carol

The easiest way to get data from Carol is generating the Data Models and using the built-in Carol service, it should support the most common types of Queries.

Inject the Carol service:

```javascript
  import { Carol } from 'src/app/services/carol.service';
  
  constructor(
    private carol: Carol
  ) {}
```

Build a query using the Data Models generated:

```javascript
  this.carol.query<Customer>()
      .from(Customer)
      .and(Customer.mdmGoldenFieldAndValues.mdmname).equals('John')
      .pageSize(1)
      .execute()
      .subscribe(response => {
        ...
      });
```

To save a Golden record you can also use the Carol service:

```javascript
  const customer = new Customer();
  customer.mdmGoldenFieldAndValues.mdmname = 'John';
  
  this.carol.postGolden(Customer, customer.mdmGoldenFieldAndValues)
      .subscribe(response => {
        ...
      });
```

To update a golden record:
```javascript
  const customer: Customer;
  customer.mdmGoldenFieldAndValues.mdmname = 'John';
  
  this.carol.updateGolden(Customer, customer.mdmId, customer.mdmGoldenFieldAndValues)
      .subscribe(response => {
        ...
      });
```

To delete a golden record:
```javascript
  const customer: Customer;
    
  this.carol.deleteGolden(Customer, customer.mdmId).subscribe(response => ...);
```

To run a Named Query:
```javascript
  this.carol.query()
    .named('myNamedQuery')
    .params({
      name: 'John'
    })
    .execute()
    .subscribe(response => {
      ...
    });
```

## Roadmap

1. Keep the dependencies up-to-date
2. Improve the Query builder with more complex Aggregations
3. Improve the Documentation
4. Generate model for Named Queries and Type named queries response
5. Automate the process to deploy the app

## Development server

Run `npm start` for a dev server. Navigate to `http://localhost:3000/`. The app will automatically reload if you change any of the source files.

## Build

Run `ng build --prod` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

For further help feel free to open an issue.
