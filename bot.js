const FS = require('fs');
const SQLITE = require('sqlite3');
const DISCORD = require('discord.js');
const CONFIG = require('./config.json');

const DB_PATH = './quotes.db';
const TOKEN_PATH = './token.json';
const TOKEN_FILE = require(TOKEN_PATH);

const CLIENT = new DISCORD.Client();

const PREFIX = CONFIG.prefix;

if (FS.existsSync(TOKEN_PATH)) {
  CLIENT.login(TOKEN_FILE.token);
} else {
  console.log('Error: No token file');
}

let db;

function openDb() {
  db = new SQLITE.Database(DB_PATH, (err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log('Connected to SQlite database');
  });
}

function closeDb() {
  db.close((err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log('Closed database connection');
  });
}

if (FS.existsSync(DB_PATH)) {
  console.log(`File ${DB_PATH} exists. Moving on`);
} else {
  console.log(`${DB_PATH} not found, creating...`);
  openDb();
  db.run('CREATE TABLE IF NOT EXISTS quotes(quote text)', (err) => {
    if (err) {
      return console.log(err.message);
    }
    console.log('Quotes table created');
  });
  closeDb();
}

CLIENT.on('message', (message) => {
  const msg = message.content;
  const triggerQuote = PREFIX + CONFIG.command_quote;
  const triggerHelp = PREFIX + CONFIG.command_help;

  if (msg === triggerQuote) {
    openDb();
    db.all('SELECT * FROM quotes WHERE quote IN (SELECT quote FROM quotes ORDER BY RANDOM() LIMIT 1)', [], (err, rows) => {
      if (err) {
        throw err;
      }
      rows.forEach((row) => {
        console.log(`Quote displayed: ${row.quote}`);
        message.channel.send(row.quote);
      });
    });
    closeDb();
  } else if (msg.startsWith(triggerQuote)) {
    const quoteClean = msg.replace(triggerQuote, '').substring(1);
    openDb();
    db.run('INSERT INTO quotes(quote) VALUES(?)', quoteClean, (err) => {
      if (err) {
        return console.log(err.message);
      }
      console.log(`Quote saved: ${quoteClean}`);
    });
    closeDb();
    message.channel.send(`${CONFIG.feedback_confirm}\n${quoteClean}`);
  } else if (msg.startsWith(triggerHelp)) {
    message.channel.send(`${CONFIG.help_add} \`${triggerQuote}\` \`${CONFIG.help_add_formatting}\`\n${CONFIG.help_display} \`${triggerQuote}\`\n${CONFIG.help_self} \`${triggerHelp}\``);
    console.log('Help displayed');
  } else if (msg === '/ping') {
    message.reply('Pong');
    console.log('Pong');
  } else if (msg.startsWith('/ping')) {
    const pong = msg.replace('/ping', '').substring(1);
    message.reply(`Pong: ${pong}`);
    console.log(`Pong: ${pong}`);
  }
});
