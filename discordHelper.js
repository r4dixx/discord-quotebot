/*jshint esversion: 6 */

module.exports = function() {

  const CLIENT = new(require('discord.js')).Client();

  login = function() {
    const CONFIG_PRIVATE = './config_private.json';
    const FS = require('fs');
    if (FS.existsSync(CONFIG_PRIVATE)) {
      CLIENT.login(require(CONFIG_PRIVATE).token);
      CLIENT.on('ready', () => {
        console.log('Discord client logged in');
      });
    } else console.log('Error: No token file');
  };

  getRightsAdmin = function(currentAuthorId) {
    console.log(`Requesting rights...`);
    if (require('./config_private.json').botAdminIds.includes(currentAuthorId)) {
      console.log(`Success: author id ${currentAuthorId} is a bot admin`);
      return true;
    } else {
      console.log(`Error: ${currentAuthorId} is not a bot admin. Operation aborted.`);
      return false;
    }
  };

  buildTrigger = function(command) {
    return require('./config.json').trigger.prefix + command;
  };

  getClient = function() {
    return CLIENT;
  };

};
