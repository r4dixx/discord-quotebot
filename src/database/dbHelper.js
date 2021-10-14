module.exports = function() {

  let db;

  dbOpen = function() {
    const db_path = require('path').resolve(__dirname, './quotes.db');
    db = new(require('sqlite3')).Database(db_path, (err) => {
      if (err) return console.error(err.message);
      console.log('Connected to SQlite database');
    });
  };

  dbClose = function() {
    db.close((err) => {
      if (err) return console.error(err.message);
      console.log('Closed database connection');
    });
  };

  dbGet = function() {
    return db;
  };

};
