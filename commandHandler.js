/*jshint esversion: 6 */

require('./dbQueries.js')();

module.exports = function() {

  const CONFIG = require('./config.json');
  const CONFIG_COMMAND = CONFIG.trigger.command;
  const CONFIG_FEEDBACK = CONFIG.feedback;
  const CONFIG_FEEDBACK_SUCCESS = CONFIG_FEEDBACK.success;
  const CONFIG_FEEDBACK_ERROR = CONFIG_FEEDBACK.error;

  getClient().on('message', (message) => {

    sendQuoteRandom = function() {
      dbQueryItemRandom().then(function(result) {
        if (result != null) message.channel.send(`:speaking_head: ${result}`);
        else message.channel.send(CONFIG_FEEDBACK_ERROR.get);
      });
    };

    insertQuote = function() {
      let quote = message.content.replace(`${buildTrigger(CONFIG_COMMAND.insert)} `, '');
      dbInsertItem(quote);
      message.channel.send(`${CONFIG_FEEDBACK_SUCCESS.insert}\n${quote}`);
    };

    updateQuoteLast = function(updatedQuote) {
      dbUpdateLast(updatedQuote).then(function(result) {
        const CONFIG_FEEDBACK_SUCCESS_UPDATE = CONFIG_FEEDBACK_SUCCESS.update;
        const CONFIG_FEEDBACK_ERROR_UPDATE = CONFIG_FEEDBACK_ERROR.update;
        if (result != null) message.channel.send(`${CONFIG_FEEDBACK_SUCCESS_UPDATE.title}\n${CONFIG_FEEDBACK_SUCCESS_UPDATE.before}\n${result}\n${CONFIG_FEEDBACK_SUCCESS_UPDATE.after}\n${updatedQuote}`);
        else {
          let errorMessage;
          if (quote != null) errorMessage = CONFIG_FEEDBACK_ERROR_UPDATE.item;
          else errorMessage = CONFIG_FEEDBACK_ERROR_UPDATE.last;
          message.channel.send(errorMessage);
        }
      });
    };

    deleteQuote = function(quote) {
      dbDeleteItemOrLast(quote).then(function(result) {
        if (result != null) message.channel.send(`${CONFIG_FEEDBACK_SUCCESS.delete}\n${result}`);
        else {
          const CONFIG_FEEDBACK_ERROR_DELETE = CONFIG_FEEDBACK_ERROR.delete;
          let errorMessage;
          if (quote != null) errorMessage = CONFIG_FEEDBACK_ERROR_DELETE.item;
          else errorMessage = CONFIG_FEEDBACK_ERROR_DELETE.last;
          message.channel.send(errorMessage);
        }
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

      message.channel.send(`${CONFIG_HELP.about}\n\n${CONFIG_HELP_USER.title}\n• ${CONFIG_HELP_USER.get} → \`${buildTrigger(CONFIG_COMMAND.get)}\`\n• ${CONFIG_HELP_USER_INSERT.item} → \`${buildTrigger(CONFIG_COMMAND.insert)}\` \`${CONFIG_HELP_USER_INSERT.format}\`\n\n${CONFIG_HELP_ADMIN.title}\n• ${CONFIG_HELP_ADMIN_UPDATE.last} → \`${buildTrigger(CONFIG_COMMAND.update)}\` \`${CONFIG_HELP_ADMIN_UPDATE_FORMAT.after}\`\n• ${CONFIG_HELP_ADMIN_UPDATE.item} → \`${buildTrigger(CONFIG_COMMAND.update)}\` \`${CONFIG_HELP_ADMIN_UPDATE_FORMAT.before}\` \`${CONFIG_HELP_ADMIN_UPDATE_FORMAT.after}\`\n• ${CONFIG_HELP_ADMIN_DELETE.last} → \`${buildTrigger(CONFIG_COMMAND.delete)}\`\n• ${CONFIG_HELP_ADMIN_DELETE.item} → \`${buildTrigger(CONFIG_COMMAND.delete)}\` \`${CONFIG_HELP_ADMIN_DELETE.format}\`\n\n${CONFIG_HELP_SELF.title}\n• ${CONFIG_HELP_SELF_PREFIX.command} \`${buildTrigger(CONFIG_COMMAND.help)}\` ${CONFIG_HELP_SELF_PREFIX.mention} <@!${getClient().user.id}>`);

      console.log('Help displayed');
    };

    sendPong = function() {
      console.log(`Sent \"pong\" to ${message.author.username}`);
      message.reply('pong');
    };

  });

};
