const { SlashCommandBuilder } = require('@discordjs/builders');
const commands = require('../config/commands.json');
const { get } = commands

module.exports = {
	data: new SlashCommandBuilder()
		.setName(get.name)
		.setDescription(get.description),
	async execute(interaction) {
		const { reply } = get;
		dbQueryItemRandom().then(function (result) {
			if (result == "error") interaction.reply({ content: commands.error_generic, ephemeral: true });
			else if (result == "error-not-found") interaction.reply({content: reply.error, ephemeral: true});
			else return interaction.reply(`${reply.success} ${result}`);
		});
	}
};