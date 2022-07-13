# familytree

### Steps to run
1. Clone the repository.
2. Install packages/dependencies of the server.
```
  yarn install
```
3. Install packages/dependencies of the webapp.
```
  cd web
  yarn install
```
4. Create a Postgres database named `familytree`.
5. Run the migration script to create the tables.
```
yarn migrations
```
6. Create .env file on the root of the project and fill up the values.
```
NODE_ENV=development
PORT=3005
DB_NAME=familytree
DB_USER=
DB_PASSWORD=
FRONTEND_APP=http://localhost:3000
```
7. To run the server, on root project directory run: 
```
yarn dev
```
8. To run the webapp, on root web directory run: 
```
yarn start
```
