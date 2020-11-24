/*jshint esversion: 6 */

require('./discordHelper.js')();
require('./dbQueries.js')();

login();

dbCreateTableIfNecessary();

getClient().on('message', (message) => {

  const CONFIG = require('./config.json');
  const CONFIG_PREFIX = CONFIG.prefix;
  const CONFIG_COMMAND = CONFIG.command;

  const THIS_AUTHOR_ID = getClient().user.id;
  const MESSAGE_AUTHOR_ID = message.author.id;
  const MESSAGE_CONTENT = message.content;

  if (MESSAGE_AUTHOR_ID == THIS_AUTHOR_ID) return;

  const CONFIG_FEEDBACK_SUCCESS = CONFIG.feedback.success;
  const CONFIG_FEEDBACK_ERROR = CONFIG.feedback.error;

  if (MESSAGE_CONTENT === getTrigger(CONFIG_COMMAND.get)) sendQuoteRandom();
  else if (MESSAGE_CONTENT.startsWith(getTrigger(CONFIG_COMMAND.add) + ' ')) addQuote();
  else if (MESSAGE_CONTENT == getTrigger(CONFIG_COMMAND.delete)) deleteQuoteLast();
  // else if (MESSAGE_CONTENT.startsWith(getTrigger(CONFIG_COMMAND.get)  + ' ' + '#'')) deleteQuote();
  else if (MESSAGE_CONTENT === getTrigger(CONFIG_COMMAND.help) || message.mentions.members.has(THIS_AUTHOR_ID)) sendHelp();
  else if (MESSAGE_CONTENT === getTrigger('ping')) { console.log('Pong'); message.reply('Pong'); }

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
    const HELP = CONFIG.help;
    const HELP_USER_TYPE = HELP.user_type;

    message.channel.send(`${HELP.about}\n\n${HELP_USER_TYPE.user}\n• ${HELP.get} → \`${getTrigger(CONFIG_COMMAND.get)}\`\n• ${HELP.add} → \`${getTrigger(CONFIG_COMMAND.add)}\` \`${HELP.add_format}\`\n\n${HELP_USER_TYPE.admin}\n• ${HELP.delete} → \`${getTrigger(CONFIG_COMMAND.delete)}\`\n\n${HELP_USER_TYPE.self}\n• \`${getTrigger(CONFIG_COMMAND.help)}\` or mention me <@!${THIS_AUTHOR_ID}>`);

    console.log('Help displayed');
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
