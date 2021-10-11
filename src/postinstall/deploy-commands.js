const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { client, token } = require('../config/private.json');

const commands = [
	new SlashCommandBuilder().setName('ping').setDescription('Replies with pong!')
]
	.map(command => command.toJSON());

const rest = new REST({ version: '9' }).setToken(token);

rest.put(Routes.applicationCommands(client), { body: commands })
	.then(() => console.log('Successfully registered application commands.'))
	.catch(console.error);