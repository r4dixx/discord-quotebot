/*jshint esversion: 6 */

require('./dbQueries.js')();
require('./formatter.js')();

module.exports = function() {

  const CONFIG = require('./config.json');
  const CONFIG_COMMANDS = CONFIG.trigger.commands;
  const CONFIG_FEEDBACK = CONFIG.feedback;

  getClient().on('message', (message) => {

    sendQuoteRandom = function() {
      dbQueryItemRandom().then(function(result) {
        if (result != null) message.channel.send(`${CONFIG_FEEDBACK.success.get} ${result}`);
        else message.channel.send(CONFIG_FEEDBACK.error.get);
      });
    };

    insertQuote = function(quote) {
      dbInsertItem(quote);
      message.channel.send(`${CONFIG_FEEDBACK.success.insert}\n${quote}`);
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
