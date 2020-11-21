/*jshint esversion: 6 */

require('./discordHelper.js')();
require('./dbQueries.js')();

login();

createTableIfNecessary();

getClient().on('message', (message) => {

  const MESSAGE = message.content;
  const CONFIG = require('./config.json');

  const PREFIX = CONFIG.prefix;
  const CONFIG_COMMAND = CONFIG.command;
  const CONFIG_FEEDBACK = CONFIG.feedback;

  const COMMAND_ADD = PREFIX + CONFIG_COMMAND.add;
  const COMMAND_GET = PREFIX + CONFIG_COMMAND.get;
  const COMMAND_HELP = PREFIX + CONFIG_COMMAND.help;

  if (MESSAGE === COMMAND_GET) sendRandomQuote();
  else if (MESSAGE.startsWith(`${COMMAND_ADD} `)) addQuote();
  else if (MESSAGE === COMMAND_HELP) sendHelp();
  else ping();

  function sendRandomQuote() {
    queryQuoteRandom().then(function(result) {
      message.channel.send(result || CONFIG_FEEDBACK.error.get);
    });
  }

  function addQuote() {
    let quote = MESSAGE.replace(`${COMMAND_GET} `, '');
    insertQuote(quote);
    message.channel.send(`${CONFIG_FEEDBACK.success.add}\n${quote}`);
  }

  function sendHelp() {
    const HELP = CONFIG.help;
    message.channel.send(`${HELP.about}\n\n${HELP.add}\n→ \`${COMMAND_GET} ${HELP.add_format}\`\n${HELP.get}\n→ \`${COMMAND_GET}\`\n${HELP.self}\n→ \`${COMMAND_HELP}\``);
    console.log('Help displayed');
  }

  function ping() {
    if (MESSAGE === '/ping') {
      console.log('Pong');
      message.reply('Pong');
    }
  }
});
