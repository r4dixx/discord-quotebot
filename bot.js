const CONFIG = require("./config.json");
const SQLITE = require("sqlite3").verbose();
const DISCORD = require("discord.js");

const PREFIX = CONFIG.prefix;
const COMMAND_QUOTE = CONFIG.command_quote
const TRIGGER = PREFIX + COMMAND_QUOTE
const COMMAND_HELP = CONFIG.command_help;

let db = new SQLITE.Database('./quotes.db')
db.run("CREATE TABLE IF NOT EXISTS quotes(quote text)");

var bot = new DISCORD.Client();

bot.on("message", (message) => {
  if (message.content == TRIGGER) {

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

  } else if (message.content.startsWith(TRIGGER)) {

    var quoteClean = message.content.replace(TRIGGER, "").substring(1)

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

var ping = PREFIX + "ping"
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

bot.login(CONFIG.token);
