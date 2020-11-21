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
  const COMMAND_GET_ALT = PREFIX + CONFIG_COMMAND.get_alt;
  const COMMAND_HELP = PREFIX + CONFIG_COMMAND.help;

  if (MESSAGE === COMMAND_GET || MESSAGE === COMMAND_GET_ALT) sendRandomQuote();
  else if (MESSAGE.startsWith(`${COMMAND_ADD} `) || MESSAGE.startsWith(`${COMMAND_ADD_ALT} `)) addQuote();
  else if (MESSAGE === COMMAND_HELP || message.mentions.members.has(getClient().user.id)) sendHelp();
  else ping();

  function sendRandomQuote() {
    queryQuoteRandom().then(function(result) {
      message.channel.send(result || CONFIG_FEEDBACK.error.get);
    });
  }

  function addQuote() {
    let quote = "";
    if (MESSAGE.startsWith(`${COMMAND_ADD} `)) quote = MESSAGE.replace(`${COMMAND_ADD} `, '');
    else if (MESSAGE.startsWith(`${COMMAND_ADD_ALT} `)) quote = MESSAGE.replace(`${COMMAND_ADD_ALT} `, '');

    insertQuote(quote);
    message.channel.send(`${CONFIG_FEEDBACK.success.add}\n→ ${quote}`);
  }

  function sendHelp() {
    const HELP = CONFIG.help;
    message.channel.send(`${HELP.about}\n\n${HELP.title}\n\n${HELP.add}\n→ \`${COMMAND_ADD}\` \`${HELP.add_format}\`\n→ \`${COMMAND_ADD_ALT}\` \`${HELP.add_format}\`\n${HELP.get}\n→ \`${COMMAND_GET}\`\n→ \`${COMMAND_GET_ALT}\`\n\n${HELP.self} _\`${COMMAND_HELP}\`_`);
    console.log('Help displayed');
  }

  function ping() {
    if (MESSAGE === '/ping') {
      console.log('Pong');
      message.reply('Pong');
    }
  }
});
