/*jshint esversion: 6 */

require('./discordHelper.js')();
require('./dbQueries.js')();
require('./commandHandler.js')();

login();

dbCreateTableIfNecessary();

getClient().on('message', (message) => {

  if (message.author.id == getClient().user.id) return;

  const CONFIG = require('./config.json');
  const CONFIG_COMMAND = CONFIG.trigger.command;

  if (message.content === buildTrigger(CONFIG_COMMAND.get))
    sendQuoteRandom();
  else if (message.content.startsWith(buildTrigger(CONFIG_COMMAND.add) + ' '))
    addQuote();
  else if (message.content == buildTrigger(CONFIG_COMMAND.delete) && hasRights())
    deleteQuoteOrRandom();
  else if (message.content.startsWith(`${buildTrigger(CONFIG_COMMAND.delete)} `) && hasRights()) {
    deleteQuoteOrRandom(message.content.replace(`${buildTrigger(CONFIG_COMMAND.delete)} `, ''));
  } else if (message.content === buildTrigger(CONFIG_COMMAND.help) || message.mentions.members.has(getClient().user.id))
    sendHelp();
  else if (message.content === buildTrigger('ping'))
    sendPong();

  function hasRights() {
    if (getRights(message.author.id)) return true;
    else {
      message.channel.send(CONFIG.feedback.error.rights);
      return false;
    }
  }

});
