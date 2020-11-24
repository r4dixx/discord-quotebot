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
        if (result != null) message.channel.send(`${CONFIG_FEEDBACK_SUCCESS.update.title}\n${CONFIG_FEEDBACK_SUCCESS.update.before}\n${result}\n${CONFIG_FEEDBACK_SUCCESS.update.after}\n${updatedQuote}`);
        else {
          let errorMessage;
          if (quote != null) errorMessage = CONFIG_FEEDBACK_ERROR.update.item;
          else errorMessage = CONFIG_FEEDBACK_ERROR.update.last;
          message.channel.send(errorMessage);
        }
      });
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

      message.channel.send(`${CONFIG_HELP.about}\n\n${CONFIG_HELP_TITLE.user}\n• ${CONFIG_HELP_COMMANDS.get} → \`${buildTrigger(CONFIG_COMMAND.get)}\`\n• ${CONFIG_HELP_COMMANDS.insert} → \`${buildTrigger(CONFIG_COMMAND.insert)}\` \`${CONFIG_HELP_COMMANDS.format}\`\n\n${CONFIG_HELP_TITLE.admin}\n• ${CONFIG_HELP_COMMANDS.update.last} → \`${buildTrigger(CONFIG_COMMAND.update)}\` \`${CONFIG_HELP_COMMANDS.update.after}\`\n• ${CONFIG_HELP_COMMANDS.delete.last} → \`${buildTrigger(CONFIG_COMMAND.delete)}\`\n• ${CONFIG_HELP_COMMANDS.delete.item} → \`${buildTrigger(CONFIG_COMMAND.delete)}\` \`${CONFIG_HELP_COMMANDS.format}\`\n\n${CONFIG_HELP_TITLE.self}\n• ${CONFIG_HELP_SHOW.with_command} \`${buildTrigger(CONFIG_COMMAND.help)}\` ${CONFIG_HELP_SHOW.with_mention} <@!${getClient().user.id}>`);

      console.log('Help displayed');
    };

    sendPong = function() {
      console.log(`Sent \"pong\" to ${message.author.username}`);
      message.reply('pong');
    };

  });

};
