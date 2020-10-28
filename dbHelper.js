/*jshint esversion: 6 */

module.exports = function() {

  let db;

  openDb = function() {
    const SQLITE = require('sqlite3');
    const DB_PATH = './quotes.db';
    db = new SQLITE.Database(DB_PATH, (err) => {
      if (err) return console.error(err.message);
      console.log('Connected to SQlite database');
    });
  };

  closeDb = function() {
    db.close((err) => {
      if (err) return console.error(err.message);
      console.log('Closed database connection');
    });
  };

  getDb = function() {
    return db;
  };

};
