const config = require('./config.json');
var quotes = config.quotes;
var prefix = config.prefix;
var command = config.command;

const sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('./quote.db')
db.run('CREATE TABLE IF NOT EXISTS quotes(quote text)');

function randomQuote() {

  let sql = `SELECT * FROM quotes WHERE quote IN (SELECT quote FROM quotes ORDER BY RANDOM() LIMIT 1)`;

  db.all(sql, [], (err, rows) => {
    if (err) {
      throw err;
    }
    rows.forEach((row) => {
      console.log(row.quote);
      return row.quote
    });
  })

};

console.log(randomQuote());

var Discord = require("discord.js");
var bot = new Discord.Client();
var trigger = prefix + command

bot.on("message", (message) => {
  if (message.content == trigger) {
    message.channel.send(randomQuote());
  } else if (message.content.startsWith(trigger)) {

    var quoteClean = message.content.replace(trigger, "").substring(1)

    db.run(`INSERT INTO quotes(quote) VALUES(?)`, quoteClean, function(err) {
      if (err) {
        return console.log(err.message);
      }
      console.log(`A row has been inserted with rowid ${this.lastID}`);
    });

    message.channel.send("**Citation enregistrée → **" + quoteClean);
  }
});

var ping = prefix + "ping"
bot.on("message", (message) => {
  if (message.content == ping) {
    message.channel.send("pong");
  } else if (message.content.startsWith(ping)) {
    message.channel.send(message.content.replace(ping, ""));
  }
});

// db.close((err) => {
//   if (err) {
//     return console.error(err.message);
//   }
//   console.log('Close the database connection.');
// });

bot.login(config.token);
