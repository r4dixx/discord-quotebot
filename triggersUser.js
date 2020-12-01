/*jshint esversion: 6 */

require('./dbQueries.js')();
require('./formatter.js')();

module.exports = function() {

  getClient().on('message', (message) => {

    const CONFIG = require('./config.json');
    const CONFIG_COMMANDS = CONFIG.trigger.commands;

    const CONFIG_FEEDBACK = CONFIG.feedback;
    const CONFIG_FEEDBACK_SUCCESS = CONFIG_FEEDBACK.success;
    const CONFIG_FEEDBACK_ERROR = CONFIG_FEEDBACK.error;

    sendQuoteRandom = function() {
      dbQueryItemRandom().then(function(result) {
        if (result == "error") message.channel.send(CONFIG_FEEDBACK_ERROR.generic);
        else if (result == "error-not-found") message.channel.send(CONFIG_FEEDBACK_ERROR.get);
        else message.channel.send(`${CONFIG_FEEDBACK_SUCCESS.get} ${result}`);
      });
    };

    insertQuote = function(quote) {
      dbInsertItem(quote).then(function(result) {
        if (result == "success") message.channel.send(`${CONFIG_FEEDBACK_SUCCESS.insert}\n${quote}`);
        else if (result == "error-duplicate") message.channel.send(CONFIG_FEEDBACK_ERROR.duplicate);
        else if (result == "error") message.channel.send(CONFIG_FEEDBACK_ERROR.generic);
      });
    };

    sendHelp = function() {
      const CONFIG_HELP = CONFIG_FEEDBACK.help;

      const CONFIG_HELP_USER = CONFIG_HELP.user;

      const CONFIG_HELP_ADMIN = CONFIG_HELP.admin;
      const CONFIG_HELP_ADMIN_UPDATE = CONFIG_HELP_ADMIN.update;
      const CONFIG_HELP_ADMIN_DELETE = CONFIG_HELP_ADMIN.delete;

      const CONFIG_HELP_SELF = CONFIG_HELP.self;
      const CONFIG_HELP_SELF_PREFIXES = CONFIG_HELP_SELF.prefixes;

      const CONFIG_HELP_FORMATS = CONFIG_HELP.formats;

      const CONFIG_COMMANDS = CONFIG.trigger.commands;
      const CONFIG_COMMANDS_UPDATE = CONFIG_COMMANDS.update;

      message.channel.send(`
${CONFIG_HELP.about}

${CONFIG_HELP_USER.title}
• ${CONFIG_HELP_USER.get} → \`${CONFIG_COMMANDS.get.toTrigger()}\`
• ${CONFIG_HELP_USER.insert} → \`${CONFIG_COMMANDS.insert.toTrigger()}\` \`${CONFIG_HELP_FORMATS.current}\`

${CONFIG_HELP_ADMIN.title}
• ${CONFIG_HELP_ADMIN_UPDATE.title}
    ‣ ${CONFIG_HELP_ADMIN_UPDATE.last} → \`${CONFIG_COMMANDS_UPDATE.command.toTrigger()}\` \`${CONFIG_HELP_FORMATS.new}\`
    ‣ ${CONFIG_HELP_ADMIN_UPDATE.item} → \`${CONFIG_COMMANDS_UPDATE.command.toTrigger()}\` \`${CONFIG_HELP_FORMATS.current}\` \`${CONFIG_COMMANDS_UPDATE.separator}\` \`${CONFIG_HELP_FORMATS.new}\`
• ${CONFIG_HELP_ADMIN_DELETE.title}
    ‣ ${CONFIG_HELP_ADMIN_DELETE.last} → \`${CONFIG_COMMANDS.delete.toTrigger()}\`
    ‣ ${CONFIG_HELP_ADMIN_DELETE.item} → \`${CONFIG_COMMANDS.delete.toTrigger()}\` \`${CONFIG_HELP_FORMATS.delete}\`

${CONFIG_HELP_SELF.title}
• ${CONFIG_HELP_SELF_PREFIXES.command} \`${CONFIG_COMMANDS.help.toTrigger()}\` ${CONFIG_HELP_SELF_PREFIXES.mention} <@${getClient().user.id}>
      `);

      console.log('Help displayed');
    };

    sendPong = function() {
      console.log(`Sent \"pong\" to ${message.author.username}`);
      message.reply('pong');
    };

  });

};
