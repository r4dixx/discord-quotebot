/*jshint esversion: 6 */

module.exports = function() {

  const CLIENT = new(require('discord.js')).Client();
  const CONFIG = require('./config.json');
  const CONFIG_PRIVATE = require('./config_private.json');

  login = function() {

    const FS = require('fs');
    if (FS.existsSync('./config_private.json')) {
      CLIENT.login(require(CONFIG_PRIVATE).token);
      CLIENT.on('ready', () => {
        console.log('Discord client logged in');
      });
    } else console.log('Error: No token provided');
  };

  buildTrigger = function(command) {
    return CONFIG.trigger.prefix + command;
  };

  startsWithCommand = function(content, command) {
    return content.startsWith(buildTrigger(command) + ' ');
  };

  isCommand = function(content, command) {
    return content === buildTrigger(command);
  };

  getMessageClean = function(message, command) {
    let msgClean = message.content.replace(`${buildTrigger(command)} `, '');
    // People mentioned with a nickname have ! before their user id. We don't need that.
    if (message.mentions.members.size > 0) msgClean = msgClean.replace(/[!]/g, '');
    return msgClean;
  };

  userIsAdmin = function(currentAuthorId) {
    console.log('Requesting rights...');
    if (CONFIG_PRIVATE.botAdminIds.includes(currentAuthorId)) {
      console.log(`Success: author id ${currentAuthorId} is a bot admin`);
      return true;
    } else {
      console.log(`Error: ${currentAuthorId} is not a bot admin. Operation aborted.`);
      return false;
    }
  };

  getClient = function() {
    return CLIENT;
  };

};
