<h1 align="center">ECommerce-Store Backend API</h1>

<p align="left">The main features of this project are : </br>

1: Provides a stable storefront API based on Node.js and Postgres DB.

2: The API default endpoints are /products /orders and /users.

</p>

## Database users and setup:
**Create user**

  psql-sh:  CREATE USER storefront_admin WITH PASSWORD password123

**Create database via SQL query** 

  CREATE DATABASE storefront
  CREATE DATABASE test_storefront

**grant privlieges to user on both databases**

  GRANT ALL PRIVILEGES ON DATABASE storefront TO storefront_admin
  GRANT ALL PRIVILEGES ON DATABASE test_storefront TO storefront_admin

## Available Commands

In the project directory, you can run:

### `db-start`
This command runs 'db-migrate db:up storefront' to initialize the development database with the tables mentioned in the requirements database schema.

### `db-test-start`
This command will run 'db-migrate db:up test_storefront' this will initialize the test database with the tables mentioned in the requirements database schema. 

### `npm run start`
This command runs 'node dist/server.js' which starts the express app on localhost:3000. Open http://localhost:3000/ and add the endpoint mentioned above.

### `npm run build`
Build the app for production into the `dist` folder. It correctly converts all dev code from .ts into working JavaScript files.

### `npm run test`
- This firstly launches a  test database migration (test_storefront) and creates all the necessary tables for the API to function in a testing environment.
- After that the test will run build in order to transpile the typescript in case it hadn't been done before.
- Once the build is completed the test will launch jasmine, which will test the endpoints for each model.
- Finally when all the tests are complete a down migration will be executed in order to clean the database and always have a clean slate to run the tests

### `npm run nodemon`
For running the developement version of the app

## Built With
- TypeScript
- Express
- Node.js
- Jasmine
- NPM
- PostgreSQL
- JWT (JSON web Tokens for Authenitcation)

## Future Updates
- [ ] Include further endpoints implementations
- [ ] Work on a potential front end with a framework
