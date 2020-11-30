/*jshint esversion: 6 */

module.exports = function() {

  require('./dbHelper.js')();

  dbCreateTableIfNecessary = function() {
    const DB_PATH = './quotes.db';
    if (require('fs').existsSync(DB_PATH)) console.log(`File ${DB_PATH} exists. Moving on`);
    else {
      console.log(`${DB_PATH} not found, creating...`);
      dbOpen();
      dbGet().run('CREATE TABLE IF NOT EXISTS quotes(quote TEXT, UNIQUE(quote))', (err) => {
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

  dbUpdateItem = function(quoteCurrent, quoteNew) {
    return new Promise(function(resolve, reject) {
      dbOpen();
      dbGet().get('SELECT quote FROM quotes WHERE quote = ?', quoteCurrent, (err, row) => {
        if (err) return console.error(err.message);
        if (row == null || row.quote == null) {
          console.log(`Error: Cannot get quote for edition. Not found in database: ${quoteCurrent}`);
          resolve(null);
        } else {
          dbGet().run('UPDATE quotes SET quote = ? WHERE quote = ?', quoteNew, quoteCurrent, function(err) {
            if (err) return console.error(err.message);
            console.log(`Updated quote. FROM: ${quoteCurrent} TO: ${quoteNew}`);
          });
          resolve(quoteCurrent);
        }
      });
      dbClose();
    });
  };

  dbUpdateLast = function(quoteNew) {
    return new Promise(function(resolve, reject) {
      dbOpen();
      dbGet().get('SELECT rowid, quote FROM quotes ORDER BY rowid DESC LIMIT 1', (err, row) => {
        if (err) return console.error(err.message);
        if (row == null || row.quote == null) {
          console.log('Error: Cannot get last quote for edition. No quote found in database.');
          resolve(null);
        } else {
          quoteOld = row.quote;
          dbGet().run('UPDATE quotes SET quote = ? WHERE rowid = (SELECT MAX(rowid) FROM quotes)', quoteNew, function(err) {
            if (err) return console.error(err.message);
            console.log(`Updated last quote. FROM: ${quoteOld} TO: ${quoteNew}`);
          });
          resolve(quoteOld);
        }
      });
      dbClose();
    });
  };

  dbDeleteItem = function(quote) {
    return new Promise(function(resolve, reject) {
      dbOpen();
      dbGet().get('SELECT quote FROM quotes WHERE quote = ?', quote, (err, row) => {
        if (err) return console.error(err.message);
        if (row == null || row.quote == null) {
          console.log(`Error: Cannot get quote for deletion. Not found in database: ${quote}`);
          resolve(null);
        } else {
          dbDelete(quote);
          resolve(quote);
        }
      });
      dbClose();
    });
  };

  dbDeleteLast = function() {
    return new Promise(function(resolve, reject) {
      dbOpen();
      dbGet().get('SELECT rowid, quote FROM quotes ORDER BY rowid DESC LIMIT 1', (err, row) => {
        if (err) return console.error(err.message);
        if (row == null || row.quote == null) {
          console.log(`Error: Cannot get last quote for deletion. No quote found in database.`);
          resolve(null);
        } else {
          dbDelete(row.quote);
          resolve(row.quote);
        }
      });
      dbClose();
    });
  };

};

function dbDelete(quote) {
  dbGet().run('DELETE FROM quotes WHERE quote = ?', quote, function(err) {
    if (err) return console.error(err.message);
    console.log(`Deleted quote: ${quote}`);
  });
}
