/*jshint esversion: 6 */

require('../database/dbQueries.js')();
require('../tools/formatter.js')();

module.exports = function() {

  getClient().on('message', (message) => {

    const CONFIG = require('../config/config.json');
    const COMMAND = CONFIG.trigger.commands;

    const FEEDBACK = CONFIG.feedback;
    const FEEDBACK_SUCCESS = FEEDBACK.success;
    const FEEDBACK_ERROR = FEEDBACK.error;

    sendQuoteRandom = function() {
      dbQueryItemRandom().then(function(result) {
        if (result == "error") message.channel.send(FEEDBACK_ERROR.generic);
        else if (result == "error-not-found") message.channel.send(FEEDBACK_ERROR.get);
        else message.channel.send(`${FEEDBACK_SUCCESS.get} ${result}`);
      });
    };

    insertQuote = function(quote) {
      dbInsertItem(quote).then(function(result) {
        if (result == "success") message.channel.send(`${FEEDBACK_SUCCESS.insert}\n${quote}`);
        else if (result == "error-duplicate") message.channel.send(FEEDBACK_ERROR.duplicate);
        else if (result == "error") message.channel.send(FEEDBACK_ERROR.generic);
      });
    };

    sendHelp = function() {
      const HELP = FEEDBACK.help;

      const HELP_USER = HELP.user;
      const HELP_FORMATS = HELP.formats;

      const HELP_ADMIN = HELP.admin;
      const HELP_UPDATE = HELP_ADMIN.update;
      const HELP_DELETE = HELP_ADMIN.delete;
      const COMMAND_UPDATE = COMMAND.update;
      const COMMAND_DELETE = COMMAND.delete;

      const HELP_SELF = HELP.self;
      const HELP_SELF_PREFIXES = HELP_SELF.prefixes;

      message.channel.send(`
${HELP.about}

${HELP_USER.title}
• ${HELP_USER.get} → \`${COMMAND.get.toTrigger()}\`
• ${HELP_USER.insert} → \`${COMMAND.insert.toTrigger()}\` \`${HELP_FORMATS.current}\`

${HELP_ADMIN.title}
• ${HELP_UPDATE.title}
    ‣ ${HELP_UPDATE.last} → \`${COMMAND_UPDATE.command.toTrigger()}\` \`${HELP_FORMATS.new}\`
    ‣ ${HELP_UPDATE.item} → \`${COMMAND_UPDATE.command.toTrigger()}\` \`${HELP_FORMATS.current}\` \`${COMMAND_UPDATE.separator}\` \`${HELP_FORMATS.new}\`
• ${HELP_DELETE.title}
    ‣ ${HELP_DELETE.last} → \`${COMMAND_DELETE.toTrigger()}\`
    ‣ ${HELP_DELETE.item} → \`${COMMAND_DELETE.toTrigger()}\` \`${HELP_FORMATS.delete}\`

${HELP_SELF.title}
• ${HELP_SELF_PREFIXES.command} \`${COMMAND.help.toTrigger()}\` ${HELP_SELF_PREFIXES.mention} <@${getClient().user.id}>
      `);

      console.log('Help displayed');
    };

    sendNoMentionWarning = function() {
      console.log(`Message contains mention, skipping`);
      message.channel.send(FEEDBACK_ERROR.mention);
    };

    sendPong = function() {
      console.log(`Sent \"pong\" to ${message.author.username}`);
      message.reply('pong');
    };

  });

};