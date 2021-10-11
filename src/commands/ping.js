const { SlashCommandBuilder } = require('@discordjs/builders');
const { success } = require('../config/replies.json');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with Pong!'),
	async execute(interaction) {
        console.log(`Sending \"pong\" to ${interaction.user.username}`);
		return interaction.reply(success.ping);
	},
};