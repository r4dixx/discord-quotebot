/*jshint esversion: 6 */

require('./discordHelper.js')();
require('./dbQueries.js')();
require('./triggersUser.js')();
require('./triggersAdmin.js')();
require('./formatter.js')();

login();

dbCreateTableIfNecessary();

getClient().on('message', (message) => {

  if (message.author.id == getClient().user.id) return;

  const CONFIG = require('./config.json');
  const CONFIG_COMMANDS = CONFIG.trigger.commands;
  const CONFIG_UPDATE_COMMAND = CONFIG_COMMANDS.update.command;
  const CONFIG_DELETE_COMMAND = CONFIG_COMMANDS.delete;

  const CONTENT = message.content;

  // Get
  if (CONTENT.isCommand(CONFIG_COMMANDS.get))
    sendQuoteRandom();

  // Insert
  else if (CONTENT.startsWithCommand(CONFIG_COMMANDS.insert))
    insertQuote(CONTENT.toMessageCleanWith(CONFIG_COMMANDS.insert));

  // Update
  else if (CONTENT.startsWithCommand(CONFIG_UPDATE_COMMAND) && userIsAdmin()) {
    const CONFIG_TRIGGER_COMMANDS_UPDATE_SEPARATOR = CONFIG.trigger.commands.update.separator;
    let msgClean = CONTENT.toMessageCleanWith(CONFIG_UPDATE_COMMAND);
    if (CONTENT.includes(CONFIG_TRIGGER_COMMANDS_UPDATE_SEPARATOR)) {
      updateQuoteItem(msgClean.split(CONFIG_TRIGGER_COMMANDS_UPDATE_SEPARATOR).map(item => item.trim()));
    } else {
      updateQuoteLast(msgClean);
    }
  }

  // Delete
  else if (CONTENT.isCommand(CONFIG_DELETE_COMMAND) && userIsAdmin()) {
    deleteQuoteLast();
  } else if (CONTENT.startsWithCommand(CONFIG_DELETE_COMMAND) && userIsAdmin()) {
    deleteQuoteItem(CONTENT.toMessageCleanWith(CONFIG_COMMANDS.delete));
  }

  // Help
  else if (CONTENT.isCommand(CONFIG_COMMANDS.help) || (message.mentions.members.has(getClient().user.id) || null))
    sendHelp();

  // Pong
  else if (CONTENT.isCommand('ping')) {
    sendPong();
  }

  function userIsAdmin() {
    if (getUserRights(message.author.id)) {
      return true;
    } else {
      message.channel.send(CONFIG.feedback.error.rights);
      return false;
    }
  }

});
