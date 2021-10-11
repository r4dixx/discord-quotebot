const {	SlashCommandBuilder } = require('@discordjs/builders');
const { insert } = require('../config/commands.json');

module.exports = {
	data: new SlashCommandBuilder()
		.setName(insert.name)
		.setDescription(insert.description)
		.addStringOption(opt => 
			opt.setName(insert.option.name)
				.setDescription(insert.option.description)
				.setRequired(true)),
	async execute(interaction) {

		const quote = interaction.options.getString('input').replace(`/${insert.name} `, '')
		const { reply } = insert; 
		
		if (quote.includes("<@!")) {
			console.log(`Message contains mention, skipping`);
			interaction.reply({content: reply.error.mention,ephemeral: true});
		} else {
			dbInsertItem(quote).then(function (result) {
				if (result == "success") return interaction.reply(`${reply.success}\n${quote}`);
				else if (result == "error-duplicate") interaction.reply({content: reply.error.duplicate, ephemeral: true});
			});
		}
	}
};