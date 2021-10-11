#!/usr/bin/env node

const fs = require('fs');
const { Client, Collection, Intents } = require('discord.js');
const { token } = require('./config/private.json');

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.data.name, command);
}

client.once('ready', () => {
	console.log('Discord client ready, logging in...');
});

client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;
	const command = client.commands.get(interaction.commandName);
	if (!command) return;
	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		// TODO custom error messages
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
});

client.login(token);

// require('./tools/formatter.js')();

// require('./database/dbQueries.js')();

// require('./handlers/userHandler.js')();
// require('./handlers/adminHandler.js')();

// 



// dbCreateTableIfNecessary();

// getClient().on('message', (message) => {

//   const CONFIG = require('./config/config.json');
//   const TRIGGER = CONFIG.trigger;

//   const CONTENT = message.content;

//   if (message.author.id == getClient().user.id) return;

//   const COMMAND = TRIGGER.commands;
//   const COMMAND_INSERT = COMMAND.insert;
//   const COMMAND_UPDATE = COMMAND.update.command;
//   const COMMAND_DELETE = COMMAND.delete;

//   if (CONTENT.isCommand(COMMAND.get))
//     sendQuoteRandom();

//   if (CONTENT.startsWithCommand(COMMAND_INSERT)) {
//     if (message.mentions.members.size == 0)
//       insertQuote(CONTENT.toMessageCleanWith(COMMAND_INSERT));
//     else
//       sendNoMentionWarning();
//   }

//   if (CONTENT.startsWithCommand(COMMAND_UPDATE) && userIsAdmin()) {
//     const TRIGGER_COMMANDS_UPDATE_SEPARATOR = CONFIG.trigger.commands.update.separator;
//     let msgClean = CONTENT.toMessageCleanWith(COMMAND_UPDATE);
//     if (!CONTENT.includes(TRIGGER_COMMANDS_UPDATE_SEPARATOR))
//       updateQuoteLast(msgClean);
//     else
//       updateQuoteItem(msgClean.split(TRIGGER_COMMANDS_UPDATE_SEPARATOR).map(item => item.trim()));
//   }

//   if (CONTENT.isCommand(COMMAND_DELETE) && userIsAdmin())
//     deleteQuoteLast();

//   if (CONTENT.startsWithCommand(COMMAND_DELETE) && userIsAdmin())
//     deleteQuoteItem(CONTENT.toMessageCleanWith(COMMAND_DELETE));

//   if (CONTENT.isCommand(COMMAND.help) || message.mentions.users.map(user => user).includes(getClient().user))
//     sendHelp();

//   if (CONTENT.isCommand('ping'))
//     sendPong();

//   function userIsAdmin() {
//     if (getRightsAdmin(message.author.id)) {
//       return true;
//     } else {
//       message.channel.send(CONFIG.feedback.error.rights);
//       return false;
//     }
//   }

// });