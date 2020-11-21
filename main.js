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
  const COMMAND_ADD_ALT = PREFIX + CONFIG_COMMAND.add_alt;
  const COMMAND_GET = PREFIX + CONFIG_COMMAND.get;
  const COMMAND_HELP = PREFIX + CONFIG_COMMAND.help;

  if (MESSAGE === COMMAND_GET) sendRandomQuote();
  else if (MESSAGE.startsWith(`${COMMAND_ADD} `) || MESSAGE.startsWith(`${COMMAND_ADD_ALT} `)) addQuote();
  else if (MESSAGE === COMMAND_HELP) sendHelp();
  else ping();

  function sendRandomQuote() {
    queryQuoteRandom().then(function(result) {
      message.channel.send(result || CONFIG_FEEDBACK.error.get);
    });
  }

  function addQuote() {
    let quote = MESSAGE.replace(`${COMMAND_ADD} `, '');
    insertQuote(quote);
    message.channel.send(`${CONFIG_FEEDBACK.success.add}\n→ ${quote}`);
  }

  function sendHelp() {
    const HELP = CONFIG.help;
    message.channel.send(`${HELP.about}\n\n${HELP.title}\n\n${HELP.add}\n→ \`${COMMAND_ADD}\` \`${HELP.add_format}\`\n→ \`${COMMAND_ADD_ALT}\` \`${HELP.add_format}\`\n${HELP.get}\n→ \`${COMMAND_GET}\`\n\n${HELP.self} _\`${COMMAND_HELP}\`_`);
    console.log('Help displayed');
  }

  function ping() {
    if (MESSAGE === '/ping') {
      console.log('Pong');
      message.reply('Pong');
    }
  }
});
