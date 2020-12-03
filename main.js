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

  if (CONTENT.startsWith(TRIGGER.prefix) && message.author.id != getClient().user.id) {
    const COMMANDS = TRIGGER.commands;
    const COMMAND_UPDATE = COMMANDS.update.command;
    const COMMAND_DELETE = COMMANDS.delete;

    // Get
    if (CONTENT.isCommand(COMMANDS.get))
      sendQuoteRandom();

    // Insert
    if (CONTENT.startsWithCommand(COMMANDS.insert))
      insertQuote(CONTENT.toMessageCleanWith(COMMANDS.insert));

    // Update
    if (CONTENT.startsWithCommand(COMMAND_UPDATE) && userIsAdmin()) {
      const TRIGGER_COMMANDS_UPDATE_SEPARATOR = CONFIG.trigger.commands.update.separator;
      let msgClean = CONTENT.toMessageCleanWith(COMMAND_UPDATE);
      if (!CONTENT.includes(TRIGGER_COMMANDS_UPDATE_SEPARATOR))
        updateQuoteLast(msgClean);
      else
        updateQuoteItem(msgClean.split(TRIGGER_COMMANDS_UPDATE_SEPARATOR).map(item => item.trim()));
    }

    // Delete
    if (CONTENT.isCommand(COMMAND_DELETE) && userIsAdmin())
      deleteQuoteLast();
    if (CONTENT.startsWithCommand(COMMAND_DELETE) && userIsAdmin())
      deleteQuoteItem(CONTENT.toMessageCleanWith(COMMANDS.delete));

    // Help
    if (CONTENT.isCommand(COMMANDS.help) || (message.mentions.members.has(getClient().user.id || null)))
      sendHelp();

    // Pong
    if (CONTENT.isCommand('ping'))
      sendPong();
  }

  function userIsAdmin() {
    if (getRightsAdmin(message.author.id)) {
      return true;
    } else {
      message.channel.send(CONFIG.feedback.error.rights);
      return false;
    }
  }

});
