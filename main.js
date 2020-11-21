/*jshint esversion: 6 */

require('./discordHelper.js')();
require('./dbQueries.js')();

login();

createTableIfNecessary();

getClient().on('message', (message) => {

  const MESSAGE = message.content;
  const CONFIG = require('./config.json');

  const PREFIX = CONFIG.prefix;
  const CONFIG_COMMAND = CONFIG.command;
  const CONFIG_FEEDBACK = CONFIG.feedback;
  const CONFIG_FEEDBACK_SUCCESS = CONFIG_FEEDBACK.success;
  const CONFIG_FEEDBACK_ERROR = CONFIG_FEEDBACK.error;

  const COMMAND_GET = PREFIX + CONFIG_COMMAND.get;
  const COMMAND_ADD = PREFIX + CONFIG_COMMAND.add;
  const COMMAND_DELETE = PREFIX + CONFIG_COMMAND.delete;
  const COMMAND_HELP = PREFIX + CONFIG_COMMAND.help;

  if (MESSAGE === COMMAND_GET) sendRandomQuote();
  else if (MESSAGE.startsWith(`${COMMAND_ADD} `)) addQuote();
  else if (MESSAGE == COMMAND_DELETE) deleteQuote();
  else if (MESSAGE === COMMAND_HELP || message.mentions.members.has(getClient().user.id)) sendHelp();
  else ping();

  function sendRandomQuote() {
    queryQuoteRandom().then(function(result) {
      message.channel.send(result || CONFIG_FEEDBACK_ERROR.get);
    });
  }

  function addQuote() {
    let quote = MESSAGE.replace(`${COMMAND_ADD} `, '');
    insertQuote(quote);
    message.channel.send(`${CONFIG_FEEDBACK.success.add}\n→ ${quote}`);
  }

  function deleteQuote() {
    const BOT_ADMIN_IDS = require('./config_private.json').botAdminIds;
    const AUTHOR_ID = message.author.id;
    if (BOT_ADMIN_IDS.includes(AUTHOR_ID)) {
      console.log(`Success: author id ${AUTHOR_ID} is a bot admin`);
      message.channel.send(CONFIG_FEEDBACK_SUCCESS.delete);
    } else {
      console.log(`Error: author id ${AUTHOR_ID} is not a bot admin. Bot admins are ${BOT_ADMIN_IDS}. Aborting...`);
      message.channel.send(CONFIG_FEEDBACK_ERROR.delete);
    }
  }

  function sendHelp() {
    const HELP = CONFIG.help;
    const HELP_USER_TYPE = HELP.user_type;

    message.channel.send(`
${HELP.about}

${HELP_USER_TYPE.user}
• ${HELP.get}: \`${COMMAND_GET}\`
• ${HELP.add}: \`${COMMAND_ADD}\` \`${HELP.add_format}\`

${HELP_USER_TYPE.admin}
• ${HELP.delete}: \`${COMMAND_DELETE}\`

${HELP_USER_TYPE.self}
• \`${COMMAND_HELP}\` or \`@${getClient().user.username}\`
    `);

    console.log('Help displayed');
  }

  function ping() {
    if (MESSAGE === '/ping') {
      console.log('Pong');
      message.reply('Pong');
    }
  }
});
