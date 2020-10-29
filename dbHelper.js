/*jshint esversion: 6 */

module.exports = function() {

  let db;

  openDb = function() {
    db = new (require('sqlite3')).Database('./quotes.db', (err) => {
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
