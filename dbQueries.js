/*jshint esversion: 6 */

module.exports = function() {

  require('./dbHelper.js')();

  dbCreateTableIfNecessary = function() {
    const DB_PATH = './quotes.db';
    if (require('fs').existsSync(DB_PATH)) console.log(`File ${DB_PATH} exists. Moving on`);
    else {
      console.log(`${DB_PATH} not found, creating...`);
      dbOpen();
      dbGet().run('CREATE TABLE IF NOT EXISTS quotes(quote TEXT)', (err) => {
        if (err) return console.error(err.message);
        console.log('Quotes table created');
      });
      dbClose();
    }
  };

  dbInsertItem = function(quoteForInsertion) {
    dbOpen();
    dbGet().run('INSERT INTO quotes(quote) VALUES(?)', quoteForInsertion, (err) => {
      if (err) return console.error(err.message);
      console.log(`Quote saved: ${quoteForInsertion}`);
    });
    dbClose();
  };

  dbQueryItemRandom = function() {
    return new Promise(function(resolve, reject) {
      dbOpen();
      dbGet().get('SELECT quote FROM quotes ORDER BY RANDOM() LIMIT 1', (err, row) => {
        if (err) return console.error(err.message);
        if (row == null || row.quote == null) {
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

  dbDeleteItemOrLast = function(quoteForDeletion) {
    return new Promise(function(resolve, reject) {
      let query;
      dbOpen();
      if (quoteForDeletion != null) query = `SELECT quote FROM quotes WHERE quote = '${quoteForDeletion}'`;
      else query = 'SELECT rowid, quote FROM quotes ORDER BY rowid DESC LIMIT 1';
      dbGet().get(query, (err, row) => {
        if (err) return console.error(err.message);
        if (row == null || row.quote == null) {
          console.log('Error: Cannot get quote for deletion. Not found in database');
          resolve(null);
        } else {
          if (quoteForDeletion == null) quoteForDeletion = row.quote;
          dbGet().run(`DELETE FROM quotes WHERE quote = '${quoteForDeletion}'`, function(err) {
            if (err) return console.error(err.message);
            console.log(`Deleted quote: ${quoteForDeletion}`);
          });
          resolve(quoteForDeletion);
        }
      });
      dbClose();
    });
  };

};
