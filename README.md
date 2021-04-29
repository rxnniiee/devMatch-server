### Setup
Configure `.env` and/or `.env.dev` file(s) using the template found at `.env.sample`.  
Given that all credentials are valid you're ready to move to the next section

### Running
**Dev** environment with nodemon hot-reload (using variables from `.env.dev`)
```shell
$ npm run dev
```

**Production** environment with **NO HOT-RELOAD** (using variables from `.env`)
```shell
$ npm start
```

### Environment variables template
```properties
# MySQL / MariaDB
DB='database'
DB_HOST='localhost'
DB_PORT=3306
DB_USER='username'
DB_PASS='password'

# Express
EXPRESS_PORT=9001
```