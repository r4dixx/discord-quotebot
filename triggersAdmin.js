/*jshint esversion: 6 */

require('./dbQueries.js')();

module.exports = function() {

  const CONFIG = require('./config.json');

  const CONFIG_FEEDBACK = CONFIG.feedback;

  const CONFIG_FEEDBACK_SUCCESS = CONFIG_FEEDBACK.success;
  const CONFIG_FEEDBACK_SUCCESS_UPDATE = CONFIG_FEEDBACK_SUCCESS.update;

  const CONFIG_FEEDBACK_ERROR = CONFIG_FEEDBACK.error;
  const CONFIG_FEEDBACK_ERROR_UPDATE = CONFIG_FEEDBACK_ERROR.update;
  const CONFIG_FEEDBACK_ERROR_DELETE = CONFIG_FEEDBACK_ERROR.delete;

  getClient().on('message', (message) => {

    updateQuoteItem = function(content) {
      const CONFIG_TRIGGER_COMMANDS_UPDATE = CONFIG.trigger.commands.update;

      // get everything between CONFIG_TRIGGER_COMMANDS_UPDATE.current and CONFIG_TRIGGER_COMMANDS_UPDATE.new;
      var quoteCurrent = content.split(CONFIG_TRIGGER_COMMANDS_UPDATE.current).pop().split(CONFIG_TRIGGER_COMMANDS_UPDATE.new)[0];
      console.log(`quoteCurrent: ${quoteCurrent}`);
      
      var quoteNew = ""; //everything after NEW=;
      console.log(`quoteNew ${quoteNew}`);
    };

    updateQuoteLast = function(quoteNew) {
      dbUpdateLast(quoteNew).then(function(result) {
        if (result != null) {

          message.channel.send(`
${CONFIG_FEEDBACK_SUCCESS_UPDATE.title}
${CONFIG_FEEDBACK_SUCCESS_UPDATE.old}
${result}
${CONFIG_FEEDBACK_SUCCESS_UPDATE.new}
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

    deleteQuoteItem = function(quote) {
      dbDeleteItem(quote).then(function(result) {
        if (result != null) message.channel.send(`${CONFIG_FEEDBACK_SUCCESS.delete}\n${result}`);
        else message.channel.send(CONFIG_FEEDBACK_ERROR_DELETE.item);
      });
    };

  });

};
