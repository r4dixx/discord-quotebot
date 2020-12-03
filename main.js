/*jshint esversion: 6 */

require('./discordHelper.js')();
require('./dbQueries.js')();
require('./triggersUser.js')();
require('./triggersAdmin.js')();
require('./formatter.js')();

dbCreateTableIfNecessary();

login();

getClient().on('message', (message) => {

  const CONFIG = require('./config.json');
  const TRIGGER = CONFIG.trigger;

  const CONTENT = message.content;

  if (message.author.id == getClient().user.id) return;

  const COMMAND = TRIGGER.commands;
  const COMMAND_UPDATE = COMMAND.update.command;
  const COMMAND_DELETE = COMMAND.delete;

  if (CONTENT.isCommand(COMMAND.get))
    sendQuoteRandom();

  if (CONTENT.startsWithCommand(COMMAND.insert))
    insertQuote(CONTENT.toMessageCleanWith(COMMAND.insert));

  if (CONTENT.startsWithCommand(COMMAND_UPDATE) && userIsAdmin()) {
    const TRIGGER_COMMANDS_UPDATE_SEPARATOR = CONFIG.trigger.commands.update.separator;
    let msgClean = CONTENT.toMessageCleanWith(COMMAND_UPDATE);
    if (!CONTENT.includes(TRIGGER_COMMANDS_UPDATE_SEPARATOR))
      updateQuoteLast(msgClean);
    else
      updateQuoteItem(msgClean.split(TRIGGER_COMMANDS_UPDATE_SEPARATOR).map(item => item.trim()));
  }

  if (CONTENT.isCommand(COMMAND_DELETE) && userIsAdmin())
    deleteQuoteLast();

  if (CONTENT.startsWithCommand(COMMAND_DELETE) && userIsAdmin())
    deleteQuoteItem(CONTENT.toMessageCleanWith(COMMAND.delete));

  if (CONTENT.isCommand(COMMAND.help) || message.mentions.users.map(user => user).includes(getClient().user))
    sendHelp();

  if (CONTENT.isCommand('ping'))
    sendPong();

  function userIsAdmin() {
    if (getRightsAdmin(message.author.id)) {
      return true;
    } else {
      message.channel.send(CONFIG.feedback.error.rights);
      return false;
    }
  }

});
