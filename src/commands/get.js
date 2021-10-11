const { SlashCommandBuilder } = require('@discordjs/builders');
const { get } = require('../config/commands.json');

module.exports = {
	data: new SlashCommandBuilder()
		.setName(get.name)
		.setDescription(get.description),
	async execute(interaction) {
		console.log(`Ping ${interaction.user.username}`);

		const { reply } = get;

		try {
			return interaction.reply(reply.success);
		} catch {
			return interaction.reply(reply.error);
		}

	}
};