/*jshint esversion: 6 */

require('../database/dbQueries.js')();

module.exports = function() {

  getClient().on('message', (message) => {

    const CONFIG = require('../config/config.json');

    const FEEDBACK = CONFIG.feedback;

    const FEEDBACK_SUCCESS = FEEDBACK.success;
    const FEEDBACK_SUCCESS_UPDATE = FEEDBACK_SUCCESS.update;

    const FEEDBACK_ERROR = FEEDBACK.error;
    const FEEDBACK_ERROR_UPDATE = FEEDBACK_ERROR.update;
    const FEEDBACK_ERROR_DELETE = FEEDBACK_ERROR.delete;

    updateQuoteItem = function(array) {
      let quoteOld = array.shift();
      let quoteNew = array.pop();
      dbUpdateItem(quoteOld, quoteNew).then(function(result) {
        if (result == "success") message.channel.send(`${FEEDBACK_SUCCESS_UPDATE.title}\n${FEEDBACK_SUCCESS_UPDATE.old}\n${quoteOld}\n${FEEDBACK_SUCCESS_UPDATE.new}\n${quoteNew}`);
        else if (result == "error-no-changes") message.channel.send(FEEDBACK_ERROR.similar);
        else if (result == "error-duplicate") message.channel.send(FEEDBACK_ERROR.duplicate);
        else if (result == "error-not-found") message.channel.send(FEEDBACK_ERROR_UPDATE.item);
        else if (result == "error") message.channel.send(FEEDBACK_ERROR.generic);
      });
    };

    updateQuoteLast = function(quoteNew) {
      dbUpdateLast(quoteNew).then(function(result) {
        if (result == "error") message.channel.send(FEEDBACK_ERROR.generic);
        else if (result == "error-no-changes") message.channel.send(FEEDBACK_ERROR.similar);
        else if (result == "error-duplicate") message.channel.send(FEEDBACK_ERROR.duplicate);
        else if (result == "error-not-found") message.channel.send(FEEDBACK_ERROR_UPDATE.last);
        else message.channel.send(`${FEEDBACK_SUCCESS_UPDATE.title}\n${FEEDBACK_SUCCESS_UPDATE.old}\n${result}\n${FEEDBACK_SUCCESS_UPDATE.new}\n${quoteNew}`);
      });
    };

    deleteQuoteItem = function(quote) {
      dbDeleteItem(quote).then(function(result) {
        if (result == "success") message.channel.send(`${FEEDBACK_SUCCESS.delete}\n${quote}`);
        else if (result == "error-not-found") message.channel.send(FEEDBACK_ERROR_DELETE.item);
        if (result == "error") message.channel.send(FEEDBACK_ERROR.generic);
      });
    };

    deleteQuoteLast = function() {
      dbDeleteLast().then(function(result) {
        if (result == "error") message.channel.send(FEEDBACK_ERROR.generic);
        else if (result == "error-not-found") message.channel.send(FEEDBACK_ERROR_DELETE.last);
        else message.channel.send(`${FEEDBACK_SUCCESS.delete}\n${result}`);
      });
    };

  });

};
