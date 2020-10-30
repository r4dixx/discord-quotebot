/*jshint esversion: 6 */

module.exports = function() {

  const CLIENT = new(require('discord.js')).Client();

  login = function() {
    const TOKEN_PATH = './token.json';
    const FS = require('fs');
    if (FS.existsSync(TOKEN_PATH)) {
      CLIENT.login(require(TOKEN_PATH).token);
      CLIENT.on('ready', () => {
        console.log('Discord client logged in');
      });
    } else console.log('Error: No token file');
  };

  getClient = function() {
    return CLIENT;
  };

};
