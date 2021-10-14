const {	SlashCommandBuilder } = require('@discordjs/builders');
const config = require('../config/config.json');
const { insert } = config

module.exports = {

	data: new SlashCommandBuilder()
		.setName(insert.name)
		.setDescription(insert.description)
		.addStringOption(opt => 
			opt.setName(insert.option.name)
				.setDescription(insert.option.description)
				.setRequired(true)),

	async execute(interaction) {
		const quote = interaction.options.getString(insert.option.name).replace(`/${insert.name} `, '')
		const { reply } = insert; 
		
		if (quote.includes("<@!")) {
			console.log(`Message contains mention, skipping`);
			interaction.reply({content: reply.error.mention,ephemeral: true});
		} else {
			dbInsertItem(quote).then(function (result) {
				switch (result) {
					case 'success':
						return interaction.reply(`${reply.success}\n${quote}`);
					case 'error-duplicate':
						return interaction.reply({content: reply.error.duplicate, ephemeral: true});
					default:
						return interaction.reply({ content: config.error_generic, ephemeral: true });
				}
			});
		}
	}
};