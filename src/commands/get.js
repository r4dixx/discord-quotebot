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
			switch (result) {
				case 'error':
					return interaction.reply({ content: commands.error_generic, ephemeral: true });
				case 'error-not-found':
					return interaction.reply({content: reply.error, ephemeral: true});
				default:
					return interaction.reply(`${reply.success} ${result}`);
			}
		});
	}
};