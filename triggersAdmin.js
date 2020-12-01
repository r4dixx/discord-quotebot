/*jshint esversion: 6 */

require('./dbQueries.js')();

module.exports = function() {

  getClient().on('message', (message) => {

    const CONFIG = require('./config.json');

    const CONFIG_FEEDBACK = CONFIG.feedback;

    const CONFIG_FEEDBACK_SUCCESS = CONFIG_FEEDBACK.success;
    const CONFIG_FEEDBACK_SUCCESS_UPDATE = CONFIG_FEEDBACK_SUCCESS.update;

    const CONFIG_FEEDBACK_ERROR = CONFIG_FEEDBACK.error;
    const CONFIG_FEEDBACK_ERROR_UPDATE = CONFIG_FEEDBACK_ERROR.update;
    const CONFIG_FEEDBACK_ERROR_DELETE = CONFIG_FEEDBACK_ERROR.delete;

    updateQuoteItem = function(array) {
      let quoteOld = array.shift();
      let quoteNew = array.pop();
      dbUpdateItem(quoteOld, quoteNew).then(function(result) {
        if (result == "success") message.channel.send(`${CONFIG_FEEDBACK_SUCCESS_UPDATE.title}\n${CONFIG_FEEDBACK_SUCCESS_UPDATE.old}\n${quoteOld}\n${CONFIG_FEEDBACK_SUCCESS_UPDATE.new}\n${quoteNew}`);
        else if (result == "error-no-changes") message.channel.send(CONFIG_FEEDBACK_ERROR.similar);
        else if (result == "error-duplicate") message.channel.send(CONFIG_FEEDBACK_ERROR.duplicate);
        else if (result == "error-not-found") message.channel.send(CONFIG_FEEDBACK_ERROR_UPDATE.item);
        else if (result == "error") message.channel.send(CONFIG_FEEDBACK_ERROR.generic);
      });
    };

    updateQuoteLast = function(quoteNew) {
      dbUpdateLast(quoteNew).then(function(result) {
        if (result == "error") message.channel.send(CONFIG_FEEDBACK_ERROR.generic);
        else if (result == "error-no-changes") message.channel.send(CONFIG_FEEDBACK_ERROR.similar);
        else if (result == "error-duplicate") message.channel.send(CONFIG_FEEDBACK_ERROR.duplicate);
        else if (result == "error-not-found") message.channel.send(CONFIG_FEEDBACK_ERROR_UPDATE.last);
        else message.channel.send(`${CONFIG_FEEDBACK_SUCCESS_UPDATE.title}\n${CONFIG_FEEDBACK_SUCCESS_UPDATE.old}\n${result}\n${CONFIG_FEEDBACK_SUCCESS_UPDATE.new}\n${quoteNew}`);
      });
    };

    deleteQuoteItem = function(quote) {
      dbDeleteItem(quote).then(function(result) {
        if (result == "success") message.channel.send(`${CONFIG_FEEDBACK_SUCCESS.delete}\n${quote}`);
        else if (result == "error-not-found") message.channel.send(CONFIG_FEEDBACK_ERROR_DELETE.item);
        if (result == "error") message.channel.send(CONFIG_FEEDBACK_ERROR.generic);
      });
    };

    deleteQuoteLast = function() {
      dbDeleteLast().then(function(result) {
        if (result == "error") message.channel.send(CONFIG_FEEDBACK_ERROR.generic);
        else if (result == "error-not-found") message.channel.send(CONFIG_FEEDBACK_ERROR_DELETE.last);
        else message.channel.send(`${CONFIG_FEEDBACK_SUCCESS.delete}\n${result}`);
      });
    };

  });

};
