#!/usr/bin/env node

require('./database/dbQueries.js')();

const fs = require('fs');
const { Client, Collection, Intents } = require('discord.js');
const { error_generic } = require('./config/config.json');

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

client.commands = new Collection();
const commandFiles = fs.readdirSync(require('path').resolve(__dirname, './commands')).filter(file => file.endsWith('.js'));

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

client.login(process.env.TOKEN);