module.exports = function() {

  let db
  const chalk = require('chalk');

  dbOpen = function() {
    db = new(require('sqlite3')).Database(require('path').resolve(__dirname, '../quotes.db'), (err) => {
      if (err) return console.error(chalk.red(err.message))
      console.log('Connected to SQlite database')
    })
  }

  dbClose = function() {
    db.close((err) => {
      if (err) return console.error(chalk.red(err.message))
      console.log('Closed database connection')
    })
  }

  dbGet = function() {
    return db
  }

}
