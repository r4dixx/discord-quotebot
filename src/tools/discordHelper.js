/*jshint esversion: 6 */

module.exports = function() {

  const { Client, Intents } = require('discord.js');

  const CLIENT = new Client({ intents: [Intents.FLAGS.GUILDS] });
  const CONFIG_PRIVATE = require('../config/private.json');

  login = function() {
    CLIENT.once('ready', () => {
      CLIENT.login(CONFIG_PRIVATE.token);
      console.log('Discord client logged in');
    });
  };

  getRightsAdmin = function(currentAuthorId) {
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
