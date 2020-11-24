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
        if (err) return console.error(err.message);
        console.log('Quotes table created');
      });
      dbClose();
    }
  };

  dbInsertItem = function(quote) {
    dbOpen();
    dbGet().run('INSERT INTO quotes(quote) VALUES(?)', quote, (err) => {
      if (err) return console.error(err.message);
      console.log(`Quote saved: ${quote}`);
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

  dbDeleteItemLast = function() {
    return new Promise(function(resolve, reject) {
      dbOpen();
      var idLast;
      var quoteLast;
      // Query last saved quote
      dbGet().get('SELECT rowid, quote FROM quotes ORDER BY rowid DESC LIMIT 1', (err, row) => {
        if (err) return console.error(err.message);
        if (row == null || row.quote == null) {
          console.log('Error: Cannot get last saved quote. No quote found in database');
          resolve(null);
        } else {
          // If exists, we store information for further display...
          idLast = row.rowid;
          quoteLast = row.quote;
          // And trigger deletion
          dbGet().run(`DELETE FROM quotes WHERE rowid = ?`, idLast, function(err) {
            if (err) return console.error(err.message);
            console.log(`Deleted last saved quote → #${idLast} - ${quoteLast}`);
          });
          resolve(quoteLast);
        }
      });
      dbClose();
    });
  };

};
