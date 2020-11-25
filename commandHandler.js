/*jshint esversion: 6 */

require('./dbQueries.js')();

module.exports = function() {

  const CONFIG = require('./config.json');

  const CONFIG_COMMAND = CONFIG.trigger.command;

  const CONFIG_FEEDBACK = CONFIG.feedback;
  const CONFIG_FEEDBACK_SUCCESS = CONFIG_FEEDBACK.success;
  const CONFIG_FEEDBACK_ERROR = CONFIG_FEEDBACK.error;
  const CONFIG_FEEDBACK_SUCCESS_UPDATE = CONFIG_FEEDBACK_SUCCESS.update;
  const CONFIG_FEEDBACK_ERROR_UPDATE = CONFIG_FEEDBACK_ERROR.update;
  const CONFIG_FEEDBACK_ERROR_DELETE = CONFIG_FEEDBACK_ERROR.delete;

  getClient().on('message', (message) => {

    sendQuoteRandom = function() {
      dbQueryItemRandom().then(function(result) {
        if (result != null) message.channel.send(`:speaking_head: ${result}`);
        else message.channel.send(CONFIG_FEEDBACK_ERROR.get);
      });
    };

    insertQuote = function(quote) {
      dbInsertItem(quote);
      message.channel.send(`${CONFIG_FEEDBACK_SUCCESS.insert}\n${quote}`);
    };

    updateQuoteLast = function(quoteNew) {
      dbUpdateLast(quoteNew).then(function(result) {
        if (result != null) {

          message.channel.send(`
${CONFIG_FEEDBACK_SUCCESS_UPDATE.title}
${CONFIG_FEEDBACK_SUCCESS_UPDATE.before}
${result}
${CONFIG_FEEDBACK_SUCCESS_UPDATE.after}
${quoteNew}
              `);

        } else message.channel.send(CONFIG_FEEDBACK_ERROR_UPDATE.last);
      });
    };

    deleteQuoteLast = function() {
      dbDeleteLast().then(function(result) {
        if (result != null) message.channel.send(`${CONFIG_FEEDBACK_SUCCESS.delete}\n${result}`);
        else message.channel.send(CONFIG_FEEDBACK_ERROR_DELETE.last);
      });
    };

    deleteQuote = function(quote) {
      dbDeleteItem(quote).then(function(result) {
        if (result != null) message.channel.send(`${CONFIG_FEEDBACK_SUCCESS.delete}\n${result}`);
        else message.channel.send(CONFIG_FEEDBACK_ERROR_DELETE.item);
      });
    };

    sendHelp = function() {
      const CONFIG_HELP = CONFIG_FEEDBACK.help;

      const CONFIG_HELP_USER = CONFIG_HELP.user;
      const CONFIG_HELP_USER_INSERT = CONFIG_HELP_USER.insert;

      const CONFIG_HELP_ADMIN = CONFIG_HELP.admin;
      const CONFIG_HELP_ADMIN_UPDATE = CONFIG_HELP_ADMIN.update;
      const CONFIG_HELP_ADMIN_UPDATE_FORMAT = CONFIG_HELP_ADMIN_UPDATE.format;
      const CONFIG_HELP_ADMIN_DELETE = CONFIG_HELP_ADMIN.delete;
      const CONFIG_HELP_ADMIN_DELETE_FORMAT = CONFIG_HELP_ADMIN_DELETE.format;

      const CONFIG_HELP_SELF = CONFIG_HELP.self;
      const CONFIG_HELP_SELF_PREFIX = CONFIG_HELP_SELF.prefix;

      const CONFIG_COMMAND = CONFIG.trigger.command;

      message.channel.send(`
${CONFIG_HELP.about}

${CONFIG_HELP_USER.title}
• ${CONFIG_HELP_USER.get} → \`${buildTrigger(CONFIG_COMMAND.get)}\`
• ${CONFIG_HELP_USER_INSERT.item} → \`${buildTrigger(CONFIG_COMMAND.insert)}\` \`${CONFIG_HELP_USER_INSERT.format}\`

${CONFIG_HELP_ADMIN.title}
• ${CONFIG_HELP_ADMIN_UPDATE.title}
    ‣ ${CONFIG_HELP_ADMIN_UPDATE.last} → \`${buildTrigger(CONFIG_COMMAND.update)}\` \`${CONFIG_HELP_ADMIN_UPDATE_FORMAT.after}\`
    ‣ ${CONFIG_HELP_ADMIN_UPDATE.item} → \`${buildTrigger(CONFIG_COMMAND.update)}\` \`${CONFIG_HELP_ADMIN_UPDATE_FORMAT.before}\` \`${CONFIG_HELP_ADMIN_UPDATE_FORMAT.after}\`
• ${CONFIG_HELP_ADMIN_DELETE.title}
    ‣ ${CONFIG_HELP_ADMIN_DELETE.last} → \`${buildTrigger(CONFIG_COMMAND.delete)}\`
    ‣ ${CONFIG_HELP_ADMIN_DELETE.item} → \`${buildTrigger(CONFIG_COMMAND.delete)}\` \`${CONFIG_HELP_ADMIN_DELETE.format}\`

${CONFIG_HELP_SELF.title}
• ${CONFIG_HELP_SELF_PREFIX.command} \`${buildTrigger(CONFIG_COMMAND.help)}\` ${CONFIG_HELP_SELF_PREFIX.mention} <@!${getClient().user.id}>
      `);

      console.log('Help displayed');
    };

    sendPong = function() {
      console.log(`Sent \"pong\" to ${message.author.username}`);
      message.reply('pong');
    };

  });

};
