# LightningTalkExercise

## Database server
Start mysql on the default port with a `test` database. Grant user `developer` (password `12345678`) with all permissions.

In case of `ER_NOT_SUPPORTED_AUTH_MODE`, execute `ALTER USER 'developer'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password'`

## Backend API server

Run `npm run api-server-dev` for an API server. Navigate to `http://localhost:3000/`. The app will automatically reload if you change any of the source files under server folder.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build API server
Run `docker build -t <username>/lightning-talk-api-server` to build the Docker image.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
