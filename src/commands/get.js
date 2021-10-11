const { SlashCommandBuilder } = require('@discordjs/builders');
const {	get } = require('../config/commands.json');

module.exports = {
	data: new SlashCommandBuilder()
		.setName(get.name)
		.setDescription(get.description),
	async execute(interaction) {
		const { reply } = get;
		dbQueryItemRandom().then(function (result) {
			if (result == "error-not-found") interaction.reply({content: reply.error, ephemeral: true});
			else return interaction.reply(`${reply.success} ${result}`);
		});
	}
};