const {	SlashCommandBuilder } = require('@discordjs/builders');
const commands = require('../config/commands.json');
const { drop } = commands
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
			.addStringOption(opt =>
				opt.setName(option.name)
				.setDescription(option.description)
				.setRequired(true))),
				
	async execute(interaction) {

		const { captains } = require('../config/private.json');
		const { reply } = drop;
		
		// Only if user is captain
		if (captains.includes(interaction.user.id)) {

			console.log(`Author id ${interaction.user.username} is a captain, arrr`);

			// Delete last item	
			if (interaction.options.getSubcommand() === subcommands.last.name) {
				dbDeleteLast().then(function (result) {
					if (result == "error") interaction.reply({ content: commands.error_generic, ephemeral: true });
					else if (result == "error-not-found") interaction.reply({content: reply.error.last, ephemeral: true});
					else interaction.reply(`${reply.success}\n${result}`);
				});
			}
			
			// Delete selected item
			else if (interaction.options.getSubcommand() === subcommands.item.name) {	
				const quote = interaction.options.getString(option.name);
				dbDeleteItem(quote).then(function (result) {
					if (result == "success") interaction.reply(`${reply.success}\n${quote}`);
					else if (result == "error-not-found") interaction.reply({content: reply.error.item, ephemeral: true});
					else if (result == "error") interaction.reply({ content: commands.error_generic, ephemeral: true });
				});
			}

		} else {
			console.log(`Author id ${interaction.user.username} is not a captain. Abort!`);
			interaction.reply({content: reply.error.rights, ephemeral: true});
		}
	}
};