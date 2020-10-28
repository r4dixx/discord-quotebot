/*jshint esversion: 6 */

require('./tools.js')();
require('./dbHelper.js')();

const DISCORD = require('discord.js');
const CLIENT = new DISCORD.Client();

const FS = require('fs');
const DB_PATH = './quotes.db';

login();

createTableIfNecessary();

CLIENT.on('message', (message) => {
  const MESSAGE = message.content;
  const CONFIG = require('./config.json');
  const PREFIX = CONFIG.prefix;
  const TRIGGER_QUOTE = PREFIX + CONFIG.command.quote;
  const TRIGGER_HELP = PREFIX + CONFIG.command.help;
  const FEEDBACK = CONFIG.feedback;

  if (MESSAGE === TRIGGER_QUOTE) displayRandomQuote();
  else if (MESSAGE.startsWith(`${TRIGGER_QUOTE} `)) saveQuote();
  else if (MESSAGE === TRIGGER_HELP) displayHelp();
  else ping();

  function displayRandomQuote() {
    openDb();
    getDb().all('SELECT * FROM quotes ORDER BY RANDOM() LIMIT 1', [], (err, rows) => {
      if (err) throw err;
      if (isEmpty(rows)) {
        message.channel.send(FEEDBACK.failure);
        console.log('No quote saved in database');
      } else {
        rows.forEach((row) => {
          message.channel.send(row.quote);
          console.log(`Quote displayed: ${row.quote}`);
        });
      }
    });
    closeDb();
  }

  function saveQuote() {
    var quoteClean = MESSAGE.replace(`${TRIGGER_QUOTE} `, '').substring(1);
    openDb();
    getDb().run('INSERT INTO quotes(quote) VALUES(?)', quoteClean, (err) => {
      if (err) return console.log(err.message);
      message.channel.send(`${FEEDBACK.confirmation}\n${quoteClean}`);
      console.log(`Quote saved: ${quoteClean}`);
    });
    closeDb();
  }

  function displayHelp() {
    const HELP = FEEDBACK.help;
    message.channel.send(`${HELP.add}\n→ \`${TRIGGER_QUOTE}\` \`${HELP.formatting}\`\n${HELP.display}\n→ \`${TRIGGER_QUOTE}\`\n${HELP.self}\n→ \`${TRIGGER_HELP}\``);
    console.log('Help displayed');
  }

  function ping() {
    if (MESSAGE === '/ping') {
      message.reply('Pong');
      console.log('Pong');
    } else if (MESSAGE.startsWith('/ping ')) {
      const pong = MESSAGE.replace('/ping ', '').substring(1);
      message.reply(`Pong: ${pong}`);
      console.log(`Pong: ${pong}`);
    }
  }
});

function createTableIfNecessary() {
  if (FS.existsSync(DB_PATH)) console.log(`File ${DB_PATH} exists. Moving on`);
  else {
    console.log(`${DB_PATH} not found, creating...`);
    openDb();
    getDb().run('CREATE TABLE IF NOT EXISTS quotes(quote text)', (err) => {
      if (err) return console.log(err.message);
      console.log('Quotes table created');
    });
    closeDb();
  }
}

function login() {
  const TOKEN_PATH = './token.json';
  const TOKEN_FILE = require(TOKEN_PATH);
  if (FS.existsSync(TOKEN_PATH)) {
    CLIENT.login(TOKEN_FILE.token);
    CLIENT.on('ready', () => {
      console.log('Discord client logged in');
    });
  } else console.log('Error: No token file');
}
