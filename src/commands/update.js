const {	SlashCommandBuilder } = require('@discordjs/builders');
const commands = require('../config/commands.json');
const { update } = commands
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
			.addStringOption(opt =>
				opt.setName(options.old.name)
				.setDescription(options.old.description)
				.setRequired(true))
			.addStringOption(opt =>
				opt.setName(options.new.name)
				.setDescription(options.new.description)
				.setRequired(true))),

	async execute(interaction) {

		const { captains } = require('../config/private.json');
		const { reply } = update;
		
		// Only if user is captain
		if (captains.includes(interaction.user.id)) {

			console.log(`Author id ${interaction.user.username} is a captain, arrr`);

			// Update last item	
			if (interaction.options.getSubcommand() === subcommands.last.name) {
			
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