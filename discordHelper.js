/*jshint esversion: 6 */

module.exports = function() {

  const DISCORD = require('discord.js');
  const CLIENT = new DISCORD.Client();

  login = function() {
    const TOKEN_PATH = './token.json';
    const TOKEN_FILE = require(TOKEN_PATH);
    const FS = require('fs');
    if (FS.existsSync(TOKEN_PATH)) {
      CLIENT.login(TOKEN_FILE.token);
      CLIENT.on('ready', () => {
        console.log('Discord client logged in');
      });
    } else console.log('Error: No token file');
  };

  getClient = function() {
    return CLIENT;
  };

};
