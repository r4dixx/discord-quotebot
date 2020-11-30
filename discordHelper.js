/*jshint esversion: 6 */

module.exports = function() {

  const CLIENT = new(require('discord.js')).Client();
  const CONFIG = require('./config.json');
  const CONFIG_PRIVATE = require('./config_private.json');

  login = function() {
    CLIENT.login(CONFIG_PRIVATE.token);
    CLIENT.on('ready', () => {
      console.log('Discord client logged in');
    });
  };

  String.prototype.startsWithCommand = function(command) {
    return this.startsWith(CONFIG.trigger.prefix + command + ' ');
  };

  String.prototype.isCommand = function(command) {
    return this == CONFIG.trigger.prefix + command;
  };

  String.prototype.toMessageCleanWith = function(command) {
    let msgClean = this.replace(`${CONFIG.trigger.prefix + command} `, '');
    // People mentioned with a nickname have ! before their user id. We don't need that.
    msgClean = msgClean.replace(/<@!/g, '<@');
    return msgClean;
  };

  getUserRights = function(currentAuthorId) {
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
