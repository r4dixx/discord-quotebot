/*jshint esversion: 6 */

module.exports = function() {

  require('./dbHelper.js')();

  dbCreateTableIfNecessary = function() {
    const DB_PATH = 'database/quotes.db';
    if (require('fs').existsSync(DB_PATH)) console.log(`File ${DB_PATH} exists. Moving on`);
    else {
      console.log(`${DB_PATH} not found, creating...`);
      dbOpen();
      dbGet().run('CREATE TABLE IF NOT EXISTS quotes(quote TEXT PRIMARY KEY)', (err) => {
        if (err) return console.error(err.message);
        console.log('Quotes table created');
      });
      dbClose();
    }
  };

  dbInsertItem = function(quoteForInsertion) {
    return new Promise(function(resolve, reject) {
      dbOpen();
      dbGet().run('INSERT INTO quotes(quote) VALUES(?)', quoteForInsertion, (err) => {
        if (err) {
          let errorMessage = err.message;
          if (errorMessage == 'SQLITE_CONSTRAINT: UNIQUE constraint failed: quotes.quote') {
            errorMessage = `${errorMessage} → ${quoteForInsertion}`;
            resolve("error-duplicate");
          } else resolve("error");
          return console.error(errorMessage);
        }
        console.log(`Inserted item: ${quoteForInsertion}`);
        resolve("success");
      });
      dbClose();
    });
  };

  dbQueryItemRandom = function() {
    return new Promise(function(resolve, reject) {
      dbOpen();
      dbGet().get('SELECT quote FROM quotes ORDER BY RANDOM() LIMIT 1', (err, row) => {
        if (err) {
          resolve("error");
          return console.error(err.message);
        }
        if (row == null || row.quote == null) {
          resolve("error-not-found");
          return console.error('Cannot get random quote. No quote found in database');
        }
        console.log(`Got item: ${row.quote}`);
        resolve(row.quote);
      });
      dbClose();
    });
  };

  dbUpdateItem = function(quoteOld, quoteNew) {
    return new Promise(function(resolve, reject) {
      dbOpen();
      dbGet().get('SELECT quote FROM quotes WHERE quote = ?', quoteOld, (err, row) => {
        if (err) {
          resolve("error");
          return console.error(err.message);
        }
        if (row == null || row.quote == null) {
          resolve("error-not-found");
          return console.error(`Error: Cannot get quote for edition. Not found in database: ${quoteOld}`);
        }
        if (quoteNew == quoteOld) {
          resolve("error-no-changes");
          return console.error(`Aborting edition. No changes made → ${quoteOld}`);
        }
        dbGet().run('UPDATE quotes SET quote = ? WHERE quote = ?', quoteNew, quoteOld, function(err) {
          if (err) {
            let errorMessage = err.message;
            if (errorMessage == 'SQLITE_CONSTRAINT: UNIQUE constraint failed: quotes.quote') {
              errorMessage = `${errorMessage} → ${quoteNew}`;
              resolve("error-duplicate");
            } else resolve("error");
            return console.error(errorMessage);
          }
          console.log(`Selected item updated. FROM: ${quoteOld} TO: ${quoteNew}`);
          resolve("success");
        });
      });
      dbClose();
    });
  };

  dbUpdateLast = function(quoteNew) {
    return new Promise(function(resolve, reject) {
      dbOpen();
      dbGet().get('SELECT rowid, quote FROM quotes ORDER BY rowid DESC LIMIT 1', (err, row) => {
        if (err) {
          resolve("error");
          return console.error(err.message);
        }
        if (row == null || row.quote == null) {
          resolve("error-not-found");
          return console.error('Error: Cannot get last quote for edition. No quote found in database.');
        }
        let quoteOld = row.quote;
        if (quoteNew == quoteOld) {
          resolve("error-no-changes");
          return console.error(`Aborting edition. No changes made → ${quoteOld}`);
        }
        dbGet().run('UPDATE quotes SET quote = ? WHERE rowid = (SELECT MAX(rowid) FROM quotes)', quoteNew, function(err) {
          if (err) {
            let errorMessage = err.message;
            if (errorMessage == 'SQLITE_CONSTRAINT: UNIQUE constraint failed: quotes.quote') {
              errorMessage = `${errorMessage} → ${quoteNew}`;
              resolve("error-duplicate");
            } else resolve("error");
            return console.error(errorMessage);
          }
          console.log(`Last inserted item updated. FROM: ${quoteOld} TO: ${quoteNew}`);
          resolve(quoteOld);
        });
      });
      dbClose();
    });
  };

  dbDeleteItem = function(quote) {
    return new Promise(function(resolve, reject) {
      dbOpen();
      dbGet().get('SELECT quote FROM quotes WHERE quote = ?', quote, (err, row) => {
        if (err) {
          resolve("error");
          return console.error(err.message);
        }
        if (row == null || row.quote == null) {
          resolve("error-not-found");
          return console.error(`Error: Cannot get quote for deletion. Not found in database: ${quote}`);
        }
        dbDelete(quote);
        resolve("success");
      });
      dbClose();
    });
  };

  dbDeleteLast = function() {
    return new Promise(function(resolve, reject) {
      dbOpen();
      dbGet().get('SELECT rowid, quote FROM quotes ORDER BY rowid DESC LIMIT 1', (err, row) => {
        if (err) {
          resolve("error");
          return console.error(err.message);
        }
        if (row == null || row.quote == null) {
          resolve("error-not-found");
          return console.error('Error: Cannot get last quote for deletion. No quote found in database.');
        }
        dbDelete(row.quote);
        resolve(row.quote);
      });
      dbClose();
    });
  };

};

function dbDelete(quote) {
  dbGet().run('DELETE FROM quotes WHERE quote = ?', quote, function(err) {
    if (err) return console.error(err.message);
    console.log(`Item deleted: ${quote}`);
  });
}
