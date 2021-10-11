#!/usr/bin/env node

require('./database/dbQueries.js')();

const fs = require('fs');
const { Client, Collection, Intents } = require('discord.js');
const { token } = require('./config/private.json');
const { error_generic } = require('./config/commands.json');

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.data.name, command);
}

client.once('ready', () => {
	console.log('Discord client ready');
	dbCreateTableIfNecessary();
});

client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;
	const command = client.commands.get(interaction.commandName);
	if (!command) return;
	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: error_generic, ephemeral: true });
	}
});

client.login(token);

// require('./tools/formatter.js')();

// require('./handlers/userHandler.js')();
// require('./handlers/adminHandler.js')();

// 

// getClient().on('message', (message) => {

//   const CONFIG = require('./config/config.json');
//   const TRIGGER = CONFIG.trigger;

//   const CONTENT = message.content;

//   if (message.author.id == getClient().user.id) return;

//   const COMMAND = TRIGGER.commands;
//   const COMMAND_INSERT = COMMAND.insert;
//   const COMMAND_UPDATE = COMMAND.update.command;
//   const COMMAND_DELETE = COMMAND.delete;

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

//   function userIsAdmin() {
//     if (getRightsAdmin(message.author.id)) {
//       return true;
//     } else {
//       message.channel.send(CONFIG.feedback.error.rights);
//       return false;
//     }
//   }

// });