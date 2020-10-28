/*jshint esversion: 6 */

require('./tools.js')();
require('./dbQueries.js')();

const DISCORD = require('discord.js');
const CLIENT = new DISCORD.Client();

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
    let randomQuote = getQuoteRandom();
    if (isEmpty(randomQuote)) {
      message.channel.send(FEEDBACK.failure);
    } else {
      message.channel.send(randomQuote);
    }
  }

  function saveQuote() {
    let quote = MESSAGE.replace(`${TRIGGER_QUOTE} `, '');
    insertQuote(quote);
    message.channel.send(`${FEEDBACK.confirmation}\n${quote}`);
  }

  function displayHelp() {
    const HELP = FEEDBACK.help;
    message.channel.send(`${HELP.add}\n→ \`${TRIGGER_QUOTE}\` \`${HELP.formatting}\`\n${HELP.display}\n→ \`${TRIGGER_QUOTE}\`\n${HELP.self}\n→ \`${TRIGGER_HELP}\``);
    console.log('Help displayed');
  }

  function ping() {
    if (MESSAGE === '/ping') {
      console.log('Pong');
      message.reply('Pong');
    } else if (MESSAGE.startsWith('/ping ')) {
      pong = `Pong: ${MESSAGE.replace('/ping ', '')}`;
      console.log(pong);
      message.reply(pong);
    }
  }
});

function login() {
  const TOKEN_PATH = './token.json';
  const TOKEN_FILE = require(TOKEN_PATH);
  const FS = require('fs');
  if (FS.existsSync(TOKEN_PATH)) {
    CLIENT.login(TOKEN_FILE.token);
    CLIENT.on('ready', () => {
      console.log('Discord client logged in');
    });
  } else console.log('Error: No token file');
}
