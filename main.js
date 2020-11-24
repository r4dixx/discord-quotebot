/*jshint esversion: 6 */

require('./discordHelper.js')();
require('./dbQueries.js')();

login();

dbCreateTableIfNecessary();

getClient().on('message', (message) => {

  const CONFIG = require('./config.json');
  const CONFIG_TRIGGER = CONFIG.trigger;
  const CONFIG_PREFIX = CONFIG_TRIGGER.prefix;
  const CONFIG_COMMAND = CONFIG_TRIGGER.command;

  const THIS_AUTHOR_ID = getClient().user.id;
  const MESSAGE_AUTHOR_ID = message.author.id;
  const MESSAGE_CONTENT = message.content;

  if (MESSAGE_AUTHOR_ID == THIS_AUTHOR_ID) return;

  const CONFIG_FEEDBACK = CONFIG.feedback;
  const CONFIG_FEEDBACK_SUCCESS = CONFIG_FEEDBACK.success;
  const CONFIG_FEEDBACK_ERROR = CONFIG_FEEDBACK.error;

  if (MESSAGE_CONTENT === getTrigger(CONFIG_COMMAND.get)) sendQuoteRandom();
  else if (MESSAGE_CONTENT.startsWith(getTrigger(CONFIG_COMMAND.add) + ' ')) addQuote();
  else if (MESSAGE_CONTENT == getTrigger(CONFIG_COMMAND.delete)) deleteQuoteLast();
  // else if (MESSAGE_CONTENT.startsWith(getTrigger(CONFIG_COMMAND.get)  + ' ' + '#'')) deleteQuote();
  else if (MESSAGE_CONTENT === getTrigger(CONFIG_COMMAND.help) || message.mentions.members.has(THIS_AUTHOR_ID)) sendHelp();
  else if (MESSAGE_CONTENT === getTrigger('ping')) sendPong();

  function sendQuoteRandom() {
    dbQueryItemRandom().then(function(result) {
      message.channel.send(result || CONFIG_FEEDBACK_ERROR.get);
    });
  }

  function addQuote() {
    let quote = MESSAGE_CONTENT.replace(`${getTrigger(CONFIG_COMMAND.add)} `, '');
    dbInsertItem(quote);
    message.channel.send(`${CONFIG_FEEDBACK_SUCCESS.add}\n${quote}`);
  }

  function deleteQuoteLast() {
    if (checkRights(MESSAGE_AUTHOR_ID) == true) {
      dbDeleteItemLast().then(function(result) {
        if (result != null) message.channel.send(`${CONFIG_FEEDBACK_SUCCESS.delete}\n${result}`);
        else message.channel.send(CONFIG_FEEDBACK_ERROR.delete);
      });
    }
  }

  // function deleteQuote() {
  //   if (checkRights(MESSAGE_AUTHOR_ID) == true) {
  //
  //   }
  // }

  function sendHelp() {
    const CONFIG_HELP = CONFIG_FEEDBACK.help;
    const CONFIG_HELP_TITLE = CONFIG_HELP.title;
    const CONFIG_HELP_COMMANDS = CONFIG_HELP.commands;
    const CONFIG_HELP_SHOW = CONFIG_HELP.show;

    message.channel.send(`${CONFIG_HELP.about}\n\n${CONFIG_HELP_TITLE.user}\n• ${CONFIG_HELP_COMMANDS.get} → \`${getTrigger(CONFIG_COMMAND.get)}\`\n• ${CONFIG_HELP_COMMANDS.add} → \`${getTrigger(CONFIG_COMMAND.add)}\` \`${CONFIG_HELP_COMMANDS.add_format}\`\n\n${CONFIG_HELP_TITLE.admin}\n• ${CONFIG_HELP_COMMANDS.delete} → \`${getTrigger(CONFIG_COMMAND.delete)}\`\n\n${CONFIG_HELP_TITLE.self}\n• ${CONFIG_HELP_SHOW.with_command} \`${getTrigger(CONFIG_COMMAND.help)}\` ${CONFIG_HELP_SHOW.with_mention} <@!${THIS_AUTHOR_ID}>`);

    console.log('Help displayed');
  }

  function sendPong() {
    console.log(`Sent \"pong\" to ${message.author.username}`);
    message.reply('pong');
  }

  function checkRights(currentAuthorId) {
    const BOT_ADMIN_IDS = require('./config_private.json').botAdminIds;
    console.log(`Requesting rights...`);
    if (BOT_ADMIN_IDS.includes(currentAuthorId)) {
      console.log(`Success: author id ${currentAuthorId} is a bot admin`);
      return true;
    } else {
      console.log(`Error: ${currentAuthorId} is not a bot admin. Aborting...`);
      message.channel.send(CONFIG_FEEDBACK_ERROR.rights);
      return false;
    }
  }

  function getTrigger(command) {
    return CONFIG_PREFIX + command;
  }

});
