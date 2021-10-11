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

			// Update last item	
			if (interaction.options.getSubcommand() === subcommands.last.name) {
				const { last } = reply.error
				const quote_new = interaction.options.getString(option_last.name);
				dbUpdateLast(quote_new).then(function (result) {
					if (result == "error") interaction.reply({ content: commands.error_generic, ephemeral: true });
					else if (result == "error-no-changes") interaction.reply({ content: last.similar, ephemeral: true });
					else if (result == "error-duplicate") interaction.reply({ content: last.duplicate, ephemeral: true });
					else if (result == "error-not-found") interaction.reply({ content: last.notfound, ephemeral: true });
					else interaction.reply(`${reply.success.title}\n${reply.success.old_prefix}\n${result}\n${reply.success.new_prefix}\n${quote_new}`);
				});
			}
			
			// Update selected item
			else if (interaction.options.getSubcommand() === subcommands.item.name) {
				const { item } = reply.error
				const quote_old = interaction.options.getString(options_item.old.name);
				const quote_new = interaction.options.getString(options_item.new.name);
				dbUpdateItem(quote_old, quote_new).then(function (result) {
					if (result == "success") interaction.reply(`${reply.success.title}\n${reply.success.old_prefix}\n${quote_old}\n${reply.success.new_prefix}\n${quote_new}`);
					else if (result == "error-no-changes") interaction.reply({ content: item.similar, ephemeral: true });
					else if (result == "error-duplicate") interaction.reply({ content: last.duplicate, ephemeral: true });
					else if (result == "error-not-found") interaction.reply({ content: last.notfound, ephemeral: true });
					else if (result == "error") interaction.reply({ content: commands.error_generic, ephemeral: true });
				});
			}

		} else {
			console.log(`Author id ${interaction.user.username} is not a captain. Abort!`);
			interaction.reply({content: reply.error.rights, ephemeral: true});
		}
	}

};