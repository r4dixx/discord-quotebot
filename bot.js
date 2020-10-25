const SQLITE = require('sqlite3').verbose();
const DISCORD = require('discord.js');
const CONFIG = require('./config.json');

const CLIENT = new DISCORD.Client();

const PREFIX = CONFIG.prefix;
const COMMAND_QUOTE = CONFIG.command_quote
const COMMAND_HELP = CONFIG.command_help;
const FEEDBACK_CONFIRM = CONFIG.feedback_confirm;

let db = null

openDb()
db.run('CREATE TABLE IF NOT EXISTS quotes(quote text)');
closeDb()

CLIENT.on('message', (message) => {
  var msg = message.content
  var trigger_quote = PREFIX + COMMAND_QUOTE
  var trigger_help = PREFIX + COMMAND_HELP

  if (msg == trigger_quote) {
    openDb()
    db.all('SELECT * FROM quotes WHERE quote IN (SELECT quote FROM quotes ORDER BY RANDOM() LIMIT 1)', [], (err, rows) => {
      if (err) {
        throw err;
      }
      rows.forEach((row) => {
        console.log(`Quote displayed: ${row.quote}`);
        message.channel.send(row.quote)
      });
    })
    closeDb()
  } else if (msg.startsWith(trigger_quote)) {
    var quoteClean = msg.replace(trigger_quote, ``).substring(1)
    openDb()
    db.run('INSERT INTO quotes(quote) VALUES(?)', quoteClean, function(err) {
      if (err) {
        return console.log(err.message);
      }
      console.log(`Quote saved: ${quoteClean}`);
    });
    closeDb()
    message.channel.send(`${FEEDBACK_CONFIRM}\n${quoteClean}`);
  } else if (msg.startsWith(trigger_help)) {
    message.channel.send(`${CONFIG.help_add} \`${trigger_quote}\` \`${CONFIG.help_add_formatting}\`\n${CONFIG.help_display} \`${trigger_quote}\`\n${CONFIG.help_self} \`${trigger_help}\``)
    console.log("Help displayed");
  } else if (msg == "/ping") {
    message.reply("Pong");
    console.log("Pong");
  } else if (msg.startsWith("/ping")) {
    var pong = msg.replace("/ping", "").substring(1)
    message.reply(`Pong: ${pong}`);
    console.log(`Pong: ${pong}`);
  }
});

CLIENT.login(CONFIG.token);

function openDb() {
  db = new SQLITE.Database('./quotes.db', (err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log("Connected to SQlite database");
  });
}

function closeDb() {
  db.close((err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log("Closed database connection");
  });
}
