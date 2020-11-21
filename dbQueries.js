/*jshint esversion: 6 */

require('./dbHelper.js')();

module.exports = function() {

  createTableIfNecessary = function() {
    const DB_PATH = './quotes.db';
    if (require('fs').existsSync(DB_PATH)) console.log(`File ${DB_PATH} exists. Moving on`);
    else {
      console.log(`${DB_PATH} not found, creating...`);
      openDb();
      getDb().run('CREATE TABLE IF NOT EXISTS quotes(quote text)', (err) => {
        if (err) throw err;
        console.log('Quotes table created');
      });
      closeDb();
    }
  };

  queryQuoteRandom = function() {
    return new Promise(function(resolve, reject) {
      openDb();
      getDb().get('SELECT rowid, quote FROM quotes ORDER BY RANDOM() LIMIT 1', (err, row) => {
        if (err) throw err;
        else if (row == null || row.quote == null) {
          console.log('No quote found in database');
          resolve(null);
        } else {
          resolve(row.quote);
        }
      });
      closeDb();
    });
  };

  insertQuote = function(quote) {
    openDb();
    getDb().run('INSERT INTO quotes(quote) VALUES(?)', quote, (err) => {
      if (err) throw err;
      console.log(`Quote saved: ${quote}`);
    });
    closeDb();
  };

};
