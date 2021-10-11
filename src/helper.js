module.exports = function() {
  
  const { Client, Intents } = require('discord.js');
  const client = new Client({ intents: [Intents.FLAGS.GUILDS] });
  const { token } = require('./private.json');

  login = function() {
    client.once('ready', () => { console.log('Discord client ready, logging in...'); });
    client.login(token);
  };
};

// getRightsAdmin = function(currentAuthorId) {
//   console.log('Requesting rights...');
//   if (CONFIG_PRIVATE.botAdminIds.includes(currentAuthorId)) {
//     console.log(`Success: author id ${currentAuthorId} is a bot admin`);
//     return true;
//   } else {
//     console.log(`Error: ${currentAuthorId} is not a bot admin. Operation aborted.`);
//     return false;
//   }
// };

// getClient = function() {
//   return CLIENT;
// };