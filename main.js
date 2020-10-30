/*jshint esversion: 6 */

require('./discordHelper.js')();
require('./dbQueries.js')();

login();

createTableIfNecessary();

getClient().on('message', (message) => {
  const MESSAGE = message.content;
  const CONFIG = require('./config.json');
  const PREFIX = CONFIG.prefix;
  const TRIGGER_QUOTE = PREFIX + CONFIG.command.quote;
  const TRIGGER_HELP = PREFIX + CONFIG.command.help;
  const FEEDBACK = CONFIG.feedback;

  if (MESSAGE === TRIGGER_QUOTE) sendRandomQuote();
  else if (MESSAGE.startsWith(`${TRIGGER_QUOTE} `)) saveQuote();
  else if (MESSAGE === TRIGGER_HELP) sendHelp();
  else ping();

  function sendRandomQuote() {
    queryQuoteRandom().then(function(result) {
      message.channel.send(result || FEEDBACK.failure);
    });
  }

  function saveQuote() {
    let quote = MESSAGE.replace(`${TRIGGER_QUOTE} `, '');
    insertQuote(quote);
    message.channel.send(`${FEEDBACK.success}\n${quote}`);
  }

  function sendHelp() {
    const HELP = CONFIG.help;
    message.channel.send(`${HELP.save}\n→ \`${TRIGGER_QUOTE} ${HELP.format}\`\n${HELP.send}\n→ \`${TRIGGER_QUOTE}\`\n${HELP.self}\n→ \`${TRIGGER_HELP}\``);
    console.log('Help displayed');
  }

  function ping() {
    if (MESSAGE === '/ping') {
      console.log('Pong');
      message.reply('Pong');
    } else if (MESSAGE.startsWith('/ping ')) {
      let pong = `Pong: ${MESSAGE.replace('/ping ', '')}`;
      console.log(pong);
      message.reply(pong);
    }
  }
});
