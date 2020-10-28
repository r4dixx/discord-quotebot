/*jshint esversion: 6 */

module.exports = function() {

  require('./dbHelper.js')();

  createTableIfNecessary = function() {
    const FS = require('fs');
    const DB_PATH = './quotes.db';
    if (FS.existsSync(DB_PATH)) console.log(`File ${DB_PATH} exists. Moving on`);
    else {
      console.log(`${DB_PATH} not found, creating...`);
      openDb();
      getDb().run('CREATE TABLE IF NOT EXISTS quotes(quote text)', (err) => {
        if (err) return console.log(err.message);
        console.log('Quotes table created');
      });
      closeDb();
    }
  };

  getQuoteRandom = function() {
    openDb();
    getDb().all('SELECT * FROM quotes ORDER BY RANDOM() LIMIT 1', [], (err, rows) => {
      if (err) throw err;
      rows.forEach((row) => {
        return row.quote;
      });
    });
    closeDb();
  };

  insertQuote = function(quote) {
    openDb();
    getDb().run('INSERT INTO quotes(quote) VALUES(?)', quote, (err) => {
      if (err) return console.log(err.message);
      console.log(`Quote saved: ${quote}`);
    });
    closeDb();
  };

};
