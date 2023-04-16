# To-Do App

## Description

This is a simple full stack todo application written in JQuery with an
Express.js backend that interfaces with a PostgreSQL database. It allows
users to view, add, remove, and check off their todo items.

## Prerequisites

- [Node.js](https://nodejs.org/en)
- [Postgres](https://www.postgresql.org/)
- [Postico](https://eggerapps.at/postico/v1.php) (Optional Postgres GUI)

### Installation

1. Clone this repo.
2. Create a Postgres database named `weekend-to-do-app` and initialize the `todos` table
   using the SQL found in the `database.sql` file.
3. Run `npm install` to install npm dependencies.
4. Run:
   - `npm run start` to start the server running on the default port
   - `npm run dev` to start the server with hot reload enabled
   - `PORT=<port> npm run <script>` to run either of the above scripts 
     overriding the default port

---
Additional README details can be found [here](https://github.com/PrimeAcademy/readme-template/blob/master/README.md).
