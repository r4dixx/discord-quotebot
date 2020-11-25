/*jshint esversion: 6 */

require('./discordHelper.js')();
require('./dbQueries.js')();
require('./triggersUser.js')();
require('./triggersAdmin.js')();

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
  else if (message.content === buildTrigger(CONFIG_COMMANDS.help) || (message.mentions.members.has(getClient().user.id) || null))
    sendHelp();
  else if (message.content === buildTrigger('ping'))
    sendPong();
  else if (userIsAdmin()) {
    if (message.content.startsWith(buildTrigger(CONFIG_COMMANDS_UPDATE.command) + ' '))
      updateQuoteItemOrLast();
    else if (message.content.startsWith(buildTrigger(CONFIG_COMMANDS.delete)))
      deleteQuoteLastOrItem();
  }

  function updateQuoteItemOrLast() {
    const MESSAGE_CLEAN = message.content.replace(`${buildTrigger(CONFIG_COMMANDS_UPDATE.command)} `, '');
    if (message.content.includes(CONFIG_COMMANDS_UPDATE.current) && message.content.includes(CONFIG_COMMANDS_UPDATE.new)) {
      const CONFIG_TRIGGER_COMMANDS_UPDATE = CONFIG.trigger.commands.update;
      updateQuoteItem(
        MESSAGE_CLEAN.split(CONFIG_TRIGGER_COMMANDS_UPDATE.current).pop().split(CONFIG_TRIGGER_COMMANDS_UPDATE.new)[0], // CURRENT
        MESSAGE_CLEAN.split(CONFIG_TRIGGER_COMMANDS_UPDATE.new).pop() // NEW
      );
    } else updateQuoteLast(MESSAGE_CLEAN);
  }

  function deleteQuoteLastOrItem() {
    if (message.content === buildTrigger(CONFIG_COMMANDS.delete))
      deleteQuoteLast();
    else if (message.content.startsWith(buildTrigger(CONFIG_COMMANDS.delete) + ' '))
      deleteQuoteItem(message.content.replace(`${buildTrigger(CONFIG_COMMANDS.delete)} `, ''));
  }

  function userIsAdmin() {
    if (getRightsAdmin(message.author.id)) return true;
    else {
      message.channel.send(CONFIG.feedback.error.rights);
      return false;
    }
  }

});
