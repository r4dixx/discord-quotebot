 module.exports = function() {

  require('./dbHelper.js')()
  const chalk = require('chalk');

  dbUpdateItem = function(quoteOld, quoteNew) {
    return new Promise(function(resolve, reject) {
      dbOpen()
      dbGet().get('SELECT quote FROM quotes WHERE quote = ?', quoteOld, (err, row) => {
        if (err) {
          resolve("error")
          return console.error(chalk.red(err.message))
        }
        if (row == null || row.quote == null) {
          resolve("error-not-found")
          return console.error(chalk.red(`Error: Cannot get quote for edition. Not found in database: ${quoteOld}`))
        }
        if (quoteNew == quoteOld) {
          resolve("error-no-changes")
          return console.error(chalk.red(`Aborting edition. No changes made → ${quoteOld}`))
        }
        dbGet().run('UPDATE quotes SET quote = ? WHERE quote = ?', quoteNew, quoteOld, function(err) {
          if (err) {
            let errorMessage = err.message
            if (errorMessage == 'SQLITE_CONSTRAINT: UNIQUE constraint failed: quotes.quote') {
              errorMessage = `${errorMessage} → ${quoteNew}`
              resolve("error-duplicate")
            } else resolve("error")
            return console.error(chalk.red(errorMessage))
          }
          console.log(`Selected item updated. FROM: ${quoteOld} TO: ${quoteNew}`)
          resolve("success")
        })
      })
      dbClose()
    })
  }

  dbUpdateLast = function(quoteNew) {
    return new Promise(function(resolve, reject) {
      dbOpen()
      dbGet().get('SELECT rowid, quote FROM quotes ORDER BY rowid DESC LIMIT 1', (err, row) => {
        if (err) {
          resolve("error")
          return console.error(chalk.red(err.message))
        }
        if (row == null || row.quote == null) {
          resolve("error-not-found")
          return console.error(chalk.red('Error: Cannot get last quote for edition. No quote found in database.'))
        }
        let quoteOld = row.quote
        if (quoteNew == quoteOld) {
          resolve("error-no-changes")
          return console.error(chalk.red(`Aborting edition. No changes made → ${quoteOld}`))
        }
        dbGet().run('UPDATE quotes SET quote = ? WHERE rowid = (SELECT MAX(rowid) FROM quotes)', quoteNew, function(err) {
          if (err) {
            let errorMessage = err.message
            if (errorMessage == 'SQLITE_CONSTRAINT: UNIQUE constraint failed: quotes.quote') {
              errorMessage = `${errorMessage} → ${quoteNew}`
              resolve("error-duplicate")
            } else resolve("error")
            return console.error(chalk.red(errorMessage))
          }
          console.log(`Last inserted item updated. FROM: ${quoteOld} TO: ${quoteNew}`)
          resolve(quoteOld)
        })
      })
      dbClose()
    })
  }

  dbDeleteItem = function(quote) {
    return new Promise(function(resolve, reject) {
      dbOpen()
      dbGet().get('SELECT quote FROM quotes WHERE quote = ?', quote, (err, row) => {
        if (err) {
          resolve("error")
          return console.error(chalk.red(err.message))
        }
        if (row == null || row.quote == null) {
          resolve("error-not-found")
          return console.error(chalk.red(`Error: Cannot get quote for deletion. Not found in database: ${quote}`))
        }
        dbDelete(quote)
        resolve("success")
      })
      dbClose()
    })
  }

  dbDeleteLast = function() {
    return new Promise(function(resolve, reject) {
      dbOpen()
      dbGet().get('SELECT rowid, quote FROM quotes ORDER BY rowid DESC LIMIT 1', (err, row) => {
        if (err) {
          resolve("error")
          return console.error(chalk.red(err.message))
        }
        if (row == null || row.quote == null) {
          resolve("error-not-found")
          return console.error(chalk.red('Error: Cannot get last quote for deletion. No quote found in database.'))
        }
        dbDelete(row.quote)
        resolve(row.quote)
      })
      dbClose()
    })
  }

}

function dbDelete(quote) {
  dbGet().run('DELETE FROM quotes WHERE quote = ?', quote, function(err) {
    if (err) return console.error(chalk.red(err.message))
    console.log(`Item deleted: ${quote}`)
  })

}
