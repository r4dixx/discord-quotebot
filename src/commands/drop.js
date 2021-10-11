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


	}

};