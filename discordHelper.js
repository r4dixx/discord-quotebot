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
