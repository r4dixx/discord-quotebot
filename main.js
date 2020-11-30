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
  const CONFIG_UPDATE_COMMAND = CONFIG_COMMANDS.update.command;
  const CONFIG_DELETE_COMMAND = CONFIG_COMMANDS.delete;

  // Get
  if (isCommand(CONFIG_COMMANDS.get))
    sendQuoteRandom();
  // Insert
  else if (startsWithCommand(CONFIG_COMMANDS.insert))
    insertQuote(getMessageClean(CONFIG_COMMANDS.insert));
  // Update
  else if (startsWithCommand(CONFIG_UPDATE_COMMAND) && userIsAdmin()) {
    const CONFIG_TRIGGER_COMMANDS_UPDATE_SEPARATOR = CONFIG.trigger.commands.update.separator;
    let msgClean = getMessageClean(CONFIG_UPDATE_COMMAND);
    if (message.content.includes(CONFIG_TRIGGER_COMMANDS_UPDATE_SEPARATOR)) {
      updateQuoteItem(msgClean.split(CONFIG.trigger.commands.update.separator).map(item => item.trim()));
    } else {
      updateQuoteLast(msgClean);
    }
  }
  // Delete
  else if (isCommand(CONFIG_DELETE_COMMAND) && userIsAdmin())
    deleteQuoteLast();
  else if (startsWithCommand(CONFIG_DELETE_COMMAND) && userIsAdmin())
    deleteQuoteItem(getMessageClean(CONFIG_COMMANDS.delete));
  // Help
  else if (isCommand(CONFIG_COMMANDS.help) || (message.mentions.members.has(getClient().user.id) || null))
    sendHelp();
  // Pong
  else if (isCommand('ping')) {
    sendPong();
  }

  function startsWithCommand(command) {
    return message.content.startsWith(buildTrigger(command) + ' ');
  }

  function isCommand(command) {
    return message.content === buildTrigger(command);
  }

  function getMessageClean(command) {
    let msgClean = message.content.replace(`${buildTrigger(command)} `, '');
    if (message.mentions.members.size > 0) msgClean = msgClean.formatMentionIn();
    return msgClean;
  }

  function userIsAdmin() {
    if (getRightsAdmin(message.author.id)) return true;
    else {
      message.channel.send(CONFIG.feedback.error.rights);
      return false;
    }
  }
});
