module.exports = function() {

  let db;

  dbOpen = function() {
    db = new(require('sqlite3')).Database('database/quotes.db', (err) => {
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
