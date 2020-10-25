const SQLITE = require("sqlite3").verbose();
const DISCORD = require("discord.js");
const CONFIG = require("./config.json");
const PREFIX = CONFIG.prefix;
const COMMAND_QUOTE = CONFIG.command_quote
const COMMAND_HELP = CONFIG.command_help;
const COMMAND_PING = CONFIG.command_ping;
const FEEDBACK_CONFIRM = CONFIG.feedback_confirm;

const client = new DISCORD.Client();

let db = new SQLITE.Database('./quotes.db', (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Connected to SQlite database.');
});

db.run("CREATE TABLE IF NOT EXISTS quotes(quote text)");

db.close((err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Close the database connection.');
});

client.on("message", (message) => {
  var msg = message.content
  var trigger_quote = PREFIX + COMMAND_QUOTE
  var trigger_help = PREFIX + COMMAND_HELP
  var trigger_ping = PREFIX + COMMAND_PING

  if (msg == trigger_quote) {

    let db = new SQLITE.Database('./quotes.db', (err) => {
      if (err) {
        return console.error(err.message);
      }
      console.log('Connected to SQlite database.');
    });

    db.all("SELECT * FROM quotes WHERE quote IN (SELECT quote FROM quotes ORDER BY RANDOM() LIMIT 1)", [], (err, rows) => {
      if (err) {
        throw err;
      }
      rows.forEach((row) => {
        console.log("quote displayed: " + row.quote);
        message.channel.send(row.quote)
      });
    })

    db.close((err) => {
      if (err) {
        return console.error(err.message);
      }
      console.log('Close the database connection.');
    });

  } else if (msg.startsWith(trigger_quote)) {
    var quoteClean = msg.replace(trigger_quote, "").substring(1)

    let db = new SQLITE.Database('./quotes.db', (err) => {
      if (err) {
        return console.error(err.message);
      }
      console.log('Connected to SQlite database.');
    });

    db.run("INSERT INTO quotes(quote) VALUES(?)", quoteClean, function(err) {
      if (err) {
        return console.log(err.message);
      }
      console.log("quote saved: " + quoteClean);
    });

    db.close((err) => {
      if (err) {
        return console.error(err.message);
      }
      console.log('Close the database connection.');
    });

    message.channel.send("_" + FEEDBACK_CONFIRM + "_" + "\n" + quoteClean);
  } else if (msg.startsWith(trigger_help)) {
    message.channel.send(
      CONFIG.help_add + " " + "`" + trigger_quote + "`" + " " + "`" + CONFIG.required_formatting + "`" + "\n" +
      CONFIG.help_get + " " + "`" + trigger_quote + "`" + "\n" +
      CONFIG.help_ping + " " + "`" + trigger_ping + "`" + "\n" +
      CONFIG.help_self + " " + "`" + trigger_help + "`" + "\n"
    )
    console.log("help displayed");
  } else if (msg == trigger_ping) {
    message.reply("pong");
  } else if (msg.startsWith(trigger_ping)) {
    message.reply(msg.replace(trigger_ping, ""));
  }
});

client.login(CONFIG.token);
