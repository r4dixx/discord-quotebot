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

    addQuote = function() {
      let quote = message.content.replace(`${buildTrigger(CONFIG_COMMAND.add)} `, '');
      dbInsertItem(quote);
      message.channel.send(`${CONFIG_FEEDBACK_SUCCESS.add}\n${quote}`);
    };

    deleteQuote = function(quote) {
      dbDeleteItemOrLast(quote).then(function(result) {
        if (result != null) message.channel.send(`${CONFIG_FEEDBACK_SUCCESS.delete}\n${result}`);
        else {
          let errorMessage;
          if (quote != null) errorMessage = CONFIG_FEEDBACK_ERROR.delete.item;
          else errorMessage = CONFIG_FEEDBACK_ERROR.delete.last;
          message.channel.send(errorMessage);
        }
      });
    };

    sendHelp = function() {
      const CONFIG_HELP = CONFIG_FEEDBACK.help;
      const CONFIG_HELP_TITLE = CONFIG_HELP.title;
      const CONFIG_HELP_COMMANDS = CONFIG_HELP.commands;
      const CONFIG_HELP_SHOW = CONFIG_HELP.show;

      message.channel.send(`${CONFIG_HELP.about}\n\n${CONFIG_HELP_TITLE.user}\n• ${CONFIG_HELP_COMMANDS.get} → \`${buildTrigger(CONFIG_COMMAND.get)}\`\n• ${CONFIG_HELP_COMMANDS.add} → \`${buildTrigger(CONFIG_COMMAND.add)}\` \`${CONFIG_HELP_COMMANDS.add_format}\`\n\n${CONFIG_HELP_TITLE.admin}\n• ${CONFIG_HELP_COMMANDS.delete} → \`${buildTrigger(CONFIG_COMMAND.delete)}\`\n\n${CONFIG_HELP_TITLE.self}\n• ${CONFIG_HELP_SHOW.with_command} \`${buildTrigger(CONFIG_COMMAND.help)}\` ${CONFIG_HELP_SHOW.with_mention} <@!${getClient().user.id}>`);

      console.log('Help displayed');
    };

    sendPong = function() {
      console.log(`Sent \"pong\" to ${message.author.username}`);
      message.reply('pong');
    };

  });

};
