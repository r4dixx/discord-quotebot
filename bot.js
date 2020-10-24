const SQLITE = require("sqlite3").verbose();
const DISCORD = require("discord.js");
const CONFIG = require("./config.json");
const PREFIX = CONFIG.prefix;
const COMMAND_QUOTE = CONFIG.command_quote
const COMMAND_HELP = CONFIG.command_help;
const COMMAND_PING = CONFIG.command_ping;
const FEEDBACK_CONFIRM = CONFIG.feedback_confirm;

const client = new DISCORD.Client();

let db = new SQLITE.Database('./quotes.db')
db.run("CREATE TABLE IF NOT EXISTS quotes(quote text)");
db.close();

client.on("message", (message) => {
  var msg = message.content
  var trigger_quote = PREFIX + COMMAND_QUOTE
  var trigger_ping = PREFIX + COMMAND_PING

  if (msg == trigger_quote) {
    let db = new SQLITE.Database('./quotes.db')
    let query = "SELECT * FROM quotes WHERE quote IN (SELECT quote FROM quotes ORDER BY RANDOM() LIMIT 1)";
    db.all(query, [], (err, rows) => {
      if (err) {
        throw err;
      }
      rows.forEach((row) => {
        console.log("quote displayed: " + row.quote);
        message.channel.send(row.quote)
      });
    })
    db.close();
  } else if (msg.startsWith(trigger_quote)) {
    var quoteClean = msg.replace(trigger_quote, "").substring(1)
    let db = new SQLITE.Database('./quotes.db')
    let query = "INSERT INTO quotes(quote) VALUES(?)"
    db.run(query, quoteClean, function(err) {
      if (err) {
        return console.log(err.message);
      }
      console.log("quote saved: " + quoteClean);
    });
    db.close();
    message.channel.send(FEEDBACK_CONFIRM + "\n" + quoteClean);
  } else if (msg.startsWith(PREFIX + COMMAND_HELP)) {
    message.channel.send(
      "Enregistrer une citation" + "\n" +
      "→ `/quote` `utilisateur` `:` `\"citation\"`" + "\n" +
      "Afficher une citation aléatoire" + "\n" +
      "→ `/quote`" + "\n" +
      "Afficher ce message" + "\n" +
      "→ `/help`"
    )
    console.log("help displayed");
  } else if (msg == trigger_ping) {
    message.reply("pong");
  } else if (msg.startsWith(trigger_ping)) {
    message.reply(msg.replace(trigger_ping, ""));
  }
});

client.login(CONFIG.token);
