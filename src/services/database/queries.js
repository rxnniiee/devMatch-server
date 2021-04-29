const dedent = require('dedent')

module.exports = {
  // ? Table - country
  country: {
    create_table: dedent(
      `CREATE TABLE IF NOT EXISTS country (
        id INT(11) UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(64) NOT NULL UNIQUE
      )`
    ),
  },
  // ? Table - city
  city: {
    create_table: dedent(
      `CREATE TABLE IF NOT EXISTS city (
        id INT(11) UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(64) NOT NULL UNIQUE,
        country VARCHAR(64) NOT NULL,
        FOREIGN KEY (country) REFERENCES country(name)
      )`
    ),
  },
  // ? Table - employee
  employee: {
    create_table: dedent(
      `CREATE TABLE IF NOT EXISTS employee (
        id INT(11) UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
        uid CHAR(16) NOT NULL UNIQUE,
        email VARCHAR(320) NOT NULL,
        password CHAR(60) NOT NULL,
        first_name VARCHAR(64) NOT NULL,
        last_name VARCHAR(64) NOT NULL,
        preferred_employment_type TINYINT(3),
        city VARCHAR(64) NOT NULL,
        created_at INT(11) UNSIGNED NOT NULL,
        FOREIGN KEY (city) REFERENCES city(name)
      )`
    ),
  },
}
