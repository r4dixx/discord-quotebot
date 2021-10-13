const { SlashCommandBuilder } = require('@discordjs/builders');
const { ping } = require('../config.json');

module.exports = {
	data: new SlashCommandBuilder()
		.setName(ping.name)
		.setDescription(ping.description),
	async execute(interaction) {
        console.log(`Ping ${interaction.user.username}`);
		return interaction.reply(ping.reply);
	}
};