const {	SlashCommandBuilder } = require('@discordjs/builders');
const { update } = require('../config/commands.json');
const { name, description, subcommands } = update;
const { options } = subcommands.item;

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
				opt.setName(options.old.name)
				.setDescription(options.old.description)
				.setRequired(true))
			.addUserOption(opt =>
				opt.setName(options.new.name)
				.setDescription(options.new.description)
				.setRequired(true))),

	async execute(interaction) {


	}

};