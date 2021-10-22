const {	SlashCommandBuilder } = require('@discordjs/builders')
const config = require('../config/config.json')
const { remove } = config
const { name, description, subcommands } = remove

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
				opt.setName(subcommands.item.option.name)
				.setDescription(subcommands.item.option.description)
				.setRequired(true))),
				
	async execute(interaction) {
		const chalk = require('chalk');
		if (!process.env.CAPTAIN_IDS.includes(interaction.user.id)) {
			console.log(chalk.yellow(`User is not a captain. Abort!`))
			interaction.reply({content: remove.reply.error.rights, ephemeral: true})
		} else {
			const queryDelete = require('../queries/delete.js')
			const quoteForDeletion = interaction.options.getString(option.name)
			queryDelete.execute(quoteForDeletion).then(function (result) {
				if (result === 'missing field') {
					console.log(chalk.yellow(`Quote deleted successfully but no text field was found in document data`))
					interaction.reply(`${remove.reply.success}`)
				} else {
					console.log(`Quote deleted successfully: ${result}`)
					interaction.reply(`${remove.reply.success}\n${result}`)		
				}
			}).catch(function (error) {
				console.log(chalk.red(`Error deleting quote: ${error}`))
				if (error === 'empty snapshot') {
					let reply 
					if (quoteForDeletion === null) reply = remove.reply.error.last
					else reply = remove.reply.error.item
					interaction.reply({content: reply , ephemeral: true})
				}
				else interaction.reply({ content: config.error_generic, ephemeral: true })
			})
		}

	}
}
