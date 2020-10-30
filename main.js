/*jshint esversion: 6 */

require('./discordHelper.js')();
require('./dbQueries.js')();
require('./tools.js')();

login();

createTableIfNecessary();

getClient().on('message', (message) => {
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
      message.channel.send(randomQuote || FEEDBACK.failure);
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
