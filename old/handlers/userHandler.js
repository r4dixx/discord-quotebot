// require('../database/dbQueries.js')();
// require('../tools/formatter.js')();

// module.exports = function() {

//   getClient().on('message', (message) => {

//     const CONFIG = require('../config/config.json');
//     const COMMAND = CONFIG.trigger.commands;

//     const FEEDBACK = CONFIG.feedback;
//     const FEEDBACK_SUCCESS = FEEDBACK.success;
//     const FEEDBACK_ERROR = FEEDBACK.error;

//     sendQuoteRandom = function() {
//       dbQueryItemRandom().then(function(result) {
//         if (result == "error") message.channel.send(FEEDBACK_ERROR.generic);
//         else if (result == "error-not-found") message.channel.send(FEEDBACK_ERROR.get);
//         else message.channel.send(`${FEEDBACK_SUCCESS.get} ${result}`);
//       });
//     };

//     insertQuote = function(quote) {
//       dbInsertItem(quote).then(function(result) {
//         if (result == "success") message.channel.send(`${FEEDBACK_SUCCESS.insert}\n${quote}`);
//         else if (result == "error-duplicate") message.channel.send(FEEDBACK_ERROR.duplicate);
//         else if (result == "error") message.channel.send(FEEDBACK_ERROR.generic);
//       });
//     };

//     sendHelp = function() {
//       
//     };

//     sendNoMentionWarning = function() {
//       console.log(`Message contains mention, skipping`);
//       message.channel.send(FEEDBACK_ERROR.mention);
//     };

//     sendPong = function() {
//       console.log(`Sent \"pong\" to ${message.author.username}`);
//       message.reply('pong');
//     };

//   });

// };