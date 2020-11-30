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
  if (isCommand(message.content, CONFIG_COMMANDS.get))
    sendQuoteRandom();

  // Insert
  else if (startsWithCommand(message.content, CONFIG_COMMANDS.insert))
    insertQuote(getMessageClean(message, CONFIG_COMMANDS.insert));

  // Update
  else if (startsWithCommand(message.content, CONFIG_UPDATE_COMMAND)) {
    if (userIsAdmin(message.author.id)) {
      const CONFIG_TRIGGER_COMMANDS_UPDATE_SEPARATOR = CONFIG.trigger.commands.update.separator;
      let msgClean = getMessageClean(message, CONFIG_UPDATE_COMMAND);
      if (message.content.includes(CONFIG_TRIGGER_COMMANDS_UPDATE_SEPARATOR)) {
        updateQuoteItem(msgClean.split(CONFIG.trigger.commands.update.separator).map(item => item.trim()));
      } else {
        updateQuoteLast(msgClean);
      }
    } else message.channel.send(CONFIG.feedback.error.rights);
  }

  // Delete
  else if (isCommand(message.content, CONFIG_DELETE_COMMAND)) {
    if (userIsAdmin(message.author.id)) deleteQuoteLast();
    else message.channel.send(CONFIG.feedback.error.rights);
  } else if (startsWithCommand(message.content, CONFIG_DELETE_COMMAND)) {
    if (userIsAdmin(message.author.id)) deleteQuoteItem(getMessageClean(message, CONFIG_COMMANDS.delete));
    else message.channel.send(CONFIG.feedback.error.rights);
  }

  // Help
  else if (isCommand(message.content, CONFIG_COMMANDS.help) || (message.mentions.members.has(getClient().user.id) || null))
    sendHelp();

  // Pong
  else if (isCommand(message.content, 'ping')) {
    sendPong();
  }

});
