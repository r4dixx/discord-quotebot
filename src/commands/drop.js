require('../helpers/discordHelper.js');

const {	SlashCommandBuilder } = require('@discordjs/builders');
const { drop } = require('../config/commands.json');
const { name, description, subcommands } = drop;
const { option } = subcommands.item;

module.exports = {
	data: new SlashCommandBuilder()
		.setName(name)
		.setDescription(description)

		.addSubcommand(sub =>
			sub.setName(subcommands.last.name)
			.setDescription(subcommands.last.description))

		.addSubcommand(sub =>
			sub.setName(subcommands.item.name)
			.setDescription(subcommands.item.description)
			.addUserOption(opt =>
				opt.setName(option.name)
				.setDescription(option.description)
				.setRequired(true))),
				
	async execute(interaction) {
		const { captains } = require('../config/private.json');
		const { reply } = drop;
		
		if (captains.includes(interaction.user.id)) {
			console.log(`Author id ${interaction.user.username} is a captain, arrr`);
		} else {
			console.log(`Author id ${interaction.user.username} is not a captain. Abort!`);
			interaction.reply({content: reply.error.rights, ephemeral: true});
		}
	}
};