const {	SlashCommandBuilder } = require('@discordjs/builders')
const config = require('../config.json')
const { drop } = config
const { name, description, subcommands } = drop
const { option } = subcommands.item

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

		const { reply } = drop
		
		// Only if user is captain
		if (process.env.CAPTAIN_IDS.includes(interaction.user.id)) {

			console.log(`User is a captain, arrr`)

			// Delete last item	
			if (interaction.options.getSubcommand() === subcommands.last.name) {
				dbDeleteLast().then(function (result) {
					switch (result) {
						case 'error':
							return interaction.reply({ content: config.error_generic, ephemeral: true })
						case 'error-not-found':
							return interaction.reply({content: reply.error.last, ephemeral: true})
						default:
							return interaction.reply(`${reply.success}\n${result}`)	
							
						}
				})
			}
			
			// Delete selected item
			else if (interaction.options.getSubcommand() === subcommands.item.name) {	
				const quote = interaction.options.getString(option.name)
				dbDeleteItem(quote).then(function (result) {
					switch (result) {
						case 'success':
							return interaction.reply(`${reply.success}\n${quote}`)
						case 'error-not-found':
							return interaction.reply({content: reply.error.item, ephemeral: true})
						default:
							return interaction.reply({ content: config.error_generic, ephemeral: true })
					}
				})
			}

		} else {
			console.log(require('chalk').red(`User is not a captain. Abort!`))
			interaction.reply({content: reply.error.rights, ephemeral: true})
		}
	}
}