/*jshint esversion: 6 */

require('./dbHelper.js')();

module.exports = function() {

  dbCreateTableIfNecessary = function() {
    const DB_PATH = './quotes.db';
    if (require('fs').existsSync(DB_PATH)) console.log(`File ${DB_PATH} exists. Moving on`);
    else {
      console.log(`${DB_PATH} not found, creating...`);
      dbOpen();
      dbGet().run('CREATE TABLE IF NOT EXISTS quotes(quote TEXT)', (err) => {
        if (err) throw err;
        console.log('Quotes table created');
      });
      dbClose();
    }
  };

  dbInsertQuote = function(quote) {
    dbOpen();
    dbGet().run('INSERT INTO quotes(quote) VALUES(?)', quote, (err) => {
      if (err) throw err;
      console.log(`Quote saved: ${quote}`);
    });
    dbClose();
  };

  dbQueryQuoteRandom = function() {
    return new Promise(function(resolve, reject) {
      dbOpen();
      dbGet().get('SELECT quote FROM quotes ORDER BY RANDOM() LIMIT 1', (err, row) => {
        if (err) throw err;
        else if (row == null || row.quote == null) {
          console.log('Cannot get random quote. No quote found in database');
          resolve(null);
        } else {
          console.log(`Quote to be displayed: ${row.quote}`);
          resolve(row.quote);
        }
      });
      dbClose();
    });
  };

  // TODO check if there is a row
  dbDeleteQuoteLast = function() {
    dbOpen();
    dbGet().run('DELETE FROM quotes WHERE rowid = (SELECT MAX(rowid) FROM quotes)', (err) => {
      if (err) throw err;
      else console.log('Last quote deleted successfully');
    });
    dbClose();
  };

};
