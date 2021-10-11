const {	SlashCommandBuilder } = require('@discordjs/builders');
const commands = require('../config/commands.json');
const { update } = commands
const { name, description, subcommands } = update;

const option_last = subcommands.last.option;
const options_item = subcommands.item.options;

module.exports = {
	data: new SlashCommandBuilder()
		.setName(name)
		.setDescription(description)

		.addSubcommand(sub =>
			sub.setName(subcommands.last.name)
			.setDescription(subcommands.last.description)
			.addStringOption(opt => 
				opt.setName(option_last.name)
					.setDescription(option_last.description)
					.setRequired(true)))

		.addSubcommand(sub =>
			sub.setName(subcommands.item.name)
			.setDescription(subcommands.item.description)
			.addStringOption(opt =>
				opt.setName(options_item.old.name)
				.setDescription(options_item.old.description)
				.setRequired(true))
			.addStringOption(opt =>
				opt.setName(options_item.new.name)
				.setDescription(options_item.new.description)
				.setRequired(true))),

	async execute(interaction) {

		const { captains } = require('../config/private.json');
		const { reply } = update;
		
		// Only if user is captain
		if (captains.includes(interaction.user.id)) {

			console.log(`Author id ${interaction.user.username} is a captain, arrr`);

			const { item } = reply.error

			// Update last item	
			if (interaction.options.getSubcommand() === subcommands.last.name) {
				const quoteNew = interaction.options.getString(option_last.name);
				dbUpdateLast(quoteNew).then(function (result) {
					if (result == "error") interaction.reply({ content: commands.error_generic, ephemeral: true });
					else if (result == "error-no-changes") interaction.reply({ content: item.similar, ephemeral: true });
					else if (result == "error-duplicate") interaction.reply({ content: item.duplicate, ephemeral: true });
					else if (result == "error-not-found") interaction.reply({ content: item.notfound, ephemeral: true });
					else interaction.reply(`${reply.success.title}\n${reply.success.old_prefix}\n${result}\n${reply.success.new_prefix}\n${quoteNew}`);
				});
			}
			
			// Update selected item
			else if (interaction.options.getSubcommand() === subcommands.item.name) {	
				
			}

		} else {
			console.log(`Author id ${interaction.user.username} is not a captain. Abort!`);
			interaction.reply({content: reply.error.rights, ephemeral: true});
		}
	}

};