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

  // Get
  if (message.content === buildTrigger(CONFIG_COMMANDS.get)) {
    sendQuoteRandom();
  }

  // Insert
  else if (message.content.startsWith(buildTrigger(CONFIG_COMMANDS.insert) + ' ')) {
    let messageClean = message.content.replace(`${buildTrigger(CONFIG_COMMANDS.insert)} `, '');
    if (message.mentions.members.size > 0) messageClean = messageClean.formatMentionIn();
    insertQuote(messageClean);
  }

  // Update
  else if (message.content.startsWith(buildTrigger(CONFIG_COMMANDS_UPDATE.command) + ' ') && userIsAdmin()) {
    let messageClean = message.content.replace(`${buildTrigger(CONFIG_COMMANDS_UPDATE.command)} `, '');
    if (message.mentions.members.size > 0) messageClean = messageClean.formatMentionIn();
    const CONFIG_TRIGGER_COMMANDS_UPDATE_SEPARATOR = CONFIG.trigger.commands.update.separator;
    if (message.content.includes(CONFIG_TRIGGER_COMMANDS_UPDATE_SEPARATOR)) {
      updateQuoteItem(messageClean.split(CONFIG_TRIGGER_COMMANDS_UPDATE_SEPARATOR).map(item => item.trim()));
    } else updateQuoteLast(messageClean);
  }

  // Delete
  else if (message.content.startsWith(buildTrigger(CONFIG_COMMANDS.delete)) && userIsAdmin()) {
    if (message.content === buildTrigger(CONFIG_COMMANDS.delete))
      deleteQuoteLast();
    else if (message.content.startsWith(buildTrigger(CONFIG_COMMANDS.delete) + ' ')) {
      let messageClean = message.content.replace(`${buildTrigger(CONFIG_COMMANDS.delete)} `, '');
      if (message.mentions.members.size > 0) messageClean = messageClean.formatMentionIn();
      deleteQuoteItem(messageClean);
    }
  }

  // Help
  else if (message.content === buildTrigger(CONFIG_COMMANDS.help) || (message.mentions.members.has(getClient().user.id) || null)) {
    sendHelp();
  }

  // Pong
  else if (message.content === buildTrigger('ping')) {
    sendPong();
  }

  // Rights
  function userIsAdmin() {
    if (getRightsAdmin(message.author.id)) return true;
    else {
      message.channel.send(CONFIG.feedback.error.rights);
      return false;
    }
  }

});
