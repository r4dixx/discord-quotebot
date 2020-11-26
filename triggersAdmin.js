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
      console.log(content)
//       dbUpdateItem(quoteCurrent, quoteNew).then(function(result) {
//         if (result != null) {
//           message.channel.send(`
// ${CONFIG_FEEDBACK_SUCCESS_UPDATE.title}
// ${CONFIG_FEEDBACK_SUCCESS_UPDATE.old}
// ${result}
// ${CONFIG_FEEDBACK_SUCCESS_UPDATE.new}
// ${quoteNew}
//               `);
//         } else message.channel.send(CONFIG_FEEDBACK_ERROR_UPDATE.item);
//       });
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

    deleteQuoteItem = function(quote) {
      dbDeleteItem(quote).then(function(result) {
        if (result != null) message.channel.send(`${CONFIG_FEEDBACK_SUCCESS.delete}\n${result}`);
        else message.channel.send(CONFIG_FEEDBACK_ERROR_DELETE.item);
      });
    };

    deleteQuoteLast = function() {
      dbDeleteLast().then(function(result) {
        if (result != null) message.channel.send(`${CONFIG_FEEDBACK_SUCCESS.delete}\n${result}`);
        else message.channel.send(CONFIG_FEEDBACK_ERROR_DELETE.last);
      });
    };

  });

};
