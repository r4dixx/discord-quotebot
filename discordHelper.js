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

  getClient = function() {
    return CLIENT;
  };

};
