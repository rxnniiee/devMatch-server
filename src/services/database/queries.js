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
    delete_table: `DROP TABLE country`,
    /**
     * @param name
     */
    create: `INSERT INTO country (name) VALUES (?)`,
    /**
     * @param name
     */
    delete: `DELETE FROM country WHERE name=? LIMIT 1`,
    get_all: `SELECT * FROM country`
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
    delete_table: `DROP TABLE city`,
    /**
     * @param name
     * @param country
     */
    create: `INSERT INTO city (name, country) VALUES (?, ?)`,
    /**
     * @param name
     */
    delete: `DELETE FROM city WHERE name=? LIMIT 1`,
    get_all: `SELECT * FROM city`
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
    delete_table: `DROP TABLE employee`,
    /**
     * @param uid CHAR(16) - nanoid string
     * @param email VARCHAR(320)
     * @param password CHAR(60) - bcrypt hashed string
     * @param first_name VARCHAR(64)
     * @param last_name VARCHAR(64)
     * @param preferred_employment_type TINYINT(3)
     * @param city VARCHAR(64)
     * @param created_at INT(11) - Unix Epoch Timestamp
     */
    create: `INSERT INTO employee (uid, email, password, first_name, last_name, preferred_employment_type, city, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    /**
     * @param uid CHAR(16) - nanoid string
     */
    delete: `DELETE FROM employee WHERE uid = ? LIMIT 1`,
    get_all: `SELECT uid, first_name, last_name, city, preferred_employment_type, created_at FROM employee`
  },
}
