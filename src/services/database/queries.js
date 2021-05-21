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
    get_all: `SELECT * FROM country`,
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
    get_all: `SELECT * FROM city`,
  },
  // ? Table - talent
  talent: {
    create_table: dedent(
      `CREATE TABLE IF NOT EXISTS talent (
        id INT(11) UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
        uid CHAR(16) NOT NULL UNIQUE,
        email VARCHAR(320) NOT NULL,
        password CHAR(60) NOT NULL,
        first_name VARCHAR(64) NOT NULL,
        last_name VARCHAR(64) NOT NULL,
        preferred_employment_type TINYINT(3) NOT NULL,
        city VARCHAR(64) NOT NULL,
        created_at INT(11) UNSIGNED NOT NULL
      )`
    ),
    delete_table: `DROP TABLE talent`,
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
    create: `INSERT INTO talent (uid, email, password, first_name, last_name, preferred_employment_type, city, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    /**
     * @param uid CHAR(16) - nanoid string
     */
    delete: `DELETE FROM talent WHERE uid = ? LIMIT 1`,
    get_all: `SELECT uid, first_name, last_name, city, preferred_employment_type, created_at FROM talent`,
    get_by_uid: `SELECT uid, first_name, last_name, preferred_employment_type, city, created_at FROM talent WHERE uid=? LIMIT 1`,
    get_by_email: `SELECT uid, first_name, last_name, preferred_employment_type, city, created_at FROM talent WHERE email=? LIMIT 1`,
    get_by_email_with_password: `SELECT * FROM talent where email=? LIMIT 1`,
    exists: `SELECT uid FROM talent WHERE email=? LIMIT 1`,
  },
  // ? table - employer
  employer: {
    create_table: dedent(
      `CREATE TABLE IF NOT EXISTS employer (
        id INT(11) UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
        uid CHAR(16) NOT NULL UNIQUE,
        email VARCHAR(320) NOT NULL,
        password CHAR(60) NOT NULL,
        company_name VARCHAR(64) NOT NULL,
        company_logo_path VARCHAR(128),
        created_at INT(11) UNSIGNED NOT NULL
      )`
    ),
    delete_table: `DROP TABLE employer`,
    /**
     * @param uid CHAR(16) - nanoid string
     * @param email VARCHAR(320)
     * @param password CHAR(60) - bcrypt hashed string
     * @param company_name VARCHAR(64)
     * @param company_logo_path VARCHAR(128)
     * @param created_at INT(11) - Unix Epoch Timestamp
     */
    create: `INSERT INTO employer (uid, email, password, company_name, company_logo_path, created_at) VALUES (?, ?, ?, ?, ?, ?)`,
    get_all: `SELECT uid, company_name, company_logo_path,  created_at FROM employer`,
    get_by_uid: `SELECT uid, company_name, company_logo_path, created_at FROM employer WHERE uid=? LIMIT 1`,
    get_by_email: `SELECT uid, company_name, company_logo_path, created_at FROM employer WHERE email=? LIMIT 1`,
    get_by_email_with_password: `SELECT * FROM employer where email=? LIMIT 1`,
    exists: `SELECT uid FROM employer WHERE email=? LIMIT 1`,
  },
  // ? table - job listing
  job_listing: {
    create_table: dedent(
      `CREATE TABLE IF NOT EXISTS job_listing (
        id INT(11) UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
        uid CHAR(16) NOT NULL UNIQUE,
        employer CHAR(16) NOT NULL,
        title VARCHAR(64) NOT NULL,
        body TEXT NOT NULL,
        expires_at INT(11) UNSIGNED NOT NULL,
        created_at INT(11) UNSIGNED NOT NULL,
        FOREIGN KEY (employer) REFERENCES employer(uid)
      )`
    ),
    delete_table: `DROP TABLE job_listing`,
  },
  // ? table - technology
  technology: {
    create_table: dedent(
      `CREATE TABLE IF NOT EXISTS technology (
        id INT(11) UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(64) NOT NULL UNIQUE
      )`
    ),
    delete_table: `DROP TABLE technology`,
  },
  // ? table - job_listing_technology
  job_listing_technology: {
    create_table: dedent(
      `CREATE TABLE IF NOT EXISTS job_listing_technology (
        id INT(11) UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
        job_listing CHAR(16) NOT NULL,
        technology VARCHAR(64) NOT NULL,
        FOREIGN KEY (job_listing) REFERENCES job_listing(uid),
        FOREIGN KEY (technology) REFERENCES technology(name)
      )`
    ),
    delete_table: `DROP TABLE job_listing_technology`,
  },
  // ? table - match/swipe
  // swipe: {
  //   create_table: dedent(
  //     `CREATE TABLE IF NOT EXISTS swipe (
  //       id INT(11) UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,

  //     )`
  //   ),
  // },
  // ? table - message
}
