const CONFIG = require("./config.json");
const SQLITE = require("sqlite3").verbose();
const DISCORD = require("discord.js");

const PREFIX = CONFIG.prefix;
const COMMAND_QUOTE = CONFIG.command_quote
const TRIGGER_QUOTE = PREFIX + COMMAND_QUOTE
const COMMAND_HELP = CONFIG.command_help;
const COMMAND_PING = CONFIG.command_ping;

const bot = new DISCORD.Client();

let db = new SQLITE.Database('./quotes.db')
db.run("CREATE TABLE IF NOT EXISTS quotes(quote text)");

bot.on("message", (message) => {
  if (message.content == TRIGGER_QUOTE) {

    let sql = "SELECT * FROM quotes WHERE quote IN (SELECT quote FROM quotes ORDER BY RANDOM() LIMIT 1)";

    db.all(sql, [], (err, rows) => {
      if (err) {
        throw err;
      }
      rows.forEach((row) => {
        console.log("quote displayed: " + row.quote);
        message.channel.send(row.quote)
      });
    })

  } else if (message.content.startsWith(TRIGGER_QUOTE)) {

    var quoteClean = message.content.replace(TRIGGER_QUOTE, "").substring(1)

    db.run("INSERT INTO quotes(quote) VALUES(?)", quoteClean, function(err) {
      if (err) {
        return console.log(err.message);
      }
      console.log("quote saved: " + quoteClean);
    });

    message.channel.send(
      "_C'est dans la boîte..._" +
      "\n" +
      quoteClean
    );
  } else if (message.content.startsWith(PREFIX + COMMAND_HELP)) {
    message.channel.send(
      "Enregistrer une citation" + "\n" +
      "→ `/quote` `utilisateur` `:` `\"citation\"`" + "\n" +
      "Afficher une citation aléatoire" + "\n" +
      "→ `/quote`" + "\n" +
      "Afficher ce message" + "\n" +
      "→ `/help`"
    )
  }

});

bot.on("message", (message) => {
  if (message.content == PREFIX + COMMAND_PING) {
    message.channel.send("pong");
  } else if (message.content.startsWith(PREFIX + COMMAND_PING)) {
    message.channel.send(message.content.replace(ping, ""));
  }
});

// db.close((err) => {
//   if (err) {
//     return console.error(err.message);
//   }
//   console.log('Close the database connection.');
// });

bot.login(CONFIG.token);
