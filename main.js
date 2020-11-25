/*jshint esversion: 6 */

require('./discordHelper.js')();
require('./dbQueries.js')();
require('./commandHandler.js')();

login();

dbCreateTableIfNecessary();

getClient().on('message', (message) => {

  if (message.author.id == getClient().user.id) return;

  const CONFIG = require('./config.json');
  const CONFIG_COMMANDS = CONFIG.trigger.commands;
  const CONFIG_COMMANDS_UPDATE = CONFIG_COMMANDS.update;

  if (message.content === buildTrigger(CONFIG_COMMANDS.get))
    sendQuoteRandom();
  else if (message.content.startsWith(buildTrigger(CONFIG_COMMANDS.insert) + ' '))
    insertQuote(message.content.replace(`${buildTrigger(CONFIG_COMMANDS.insert)} `, ''));
  else if (message.content.startsWith(buildTrigger(CONFIG_COMMANDS_UPDATE.command) + ' ') && message.content.includes(CONFIG_COMMANDS_UPDATE.current) && message.content.includes(CONFIG_COMMANDS_UPDATE.new) && userIsAdmin()) {
    console.log(true);
    // updateQuote();
  } else if (message.content.startsWith(buildTrigger(CONFIG_COMMANDS_UPDATE.command) + ' ') && !message.content.includes(CONFIG_COMMANDS_UPDATE.current) && !message.content.includes(CONFIG_COMMANDS_UPDATE.new) && userIsAdmin())
    updateQuoteLast(message.content.replace(`${buildTrigger(CONFIG_COMMANDS_UPDATE.command)} `, ''));
  else if (message.content === buildTrigger(CONFIG_COMMANDS.delete) && userIsAdmin())
    deleteQuoteLast();
  else if (message.content.startsWith(buildTrigger(CONFIG_COMMANDS.delete) + ' ') && userIsAdmin())
    deleteQuote(message.content.replace(`${buildTrigger(CONFIG_COMMANDS.delete)} `, ''));
  else if (message.content === buildTrigger(CONFIG_COMMANDS.help) || (message.mentions.members.has(getClient().user.id) || null))
    sendHelp();
  else if (message.content === buildTrigger('ping'))
    sendPong();

  function userIsAdmin() {
    if (getRightsAdmin(message.author.id)) return true;
    else {
      message.channel.send(CONFIG.feedback.error.rights);
      return false;
    }
  }

});
