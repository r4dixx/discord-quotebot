const chalk = require('chalk');
const {	SlashCommandBuilder } = require('@discordjs/builders')
const queryDelete = require('../queries/delete.js')
const config = require('../config/config.json')
const { remove } = config
const { name, description, subcommands } = remove
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

		if (!process.env.CAPTAIN_IDS.includes(interaction.user.id)) {
			console.log(chalk.yellow(`User is not a captain. Abort!`))
			interaction.reply({content: remove.reply.error.rights, ephemeral: true})
		}

		else if (interaction.options.getSubcommand() === subcommands.last.name) {
				// Delete last item	
				queryDelete.execute().then(function (result) {
					if (result === 'missing field') {
						console.log(chalk.yellow(`Quote deleted successfully but no text field was found in document data`))
						interaction.reply(`${remove.reply.success}`)
					} else {
						console.log(`Quote deleted successfully: ${result}`)
						interaction.reply(`${remove.reply.success}\n${result}`)		
					}
				}).catch(function (error) {
					console.log(chalk.red(`Error deleting quote: ${error}`))
					if (error === 'empty snapshot') interaction.reply({content: remove.reply.error.last, ephemeral: true})
					else interaction.reply({ content: config.error_generic, ephemeral: true })
				})
			}

	// 		// Delete selected item
	// 		else if (interaction.options.getSubcommand() === subcommands.item.name) {	
	// 			const quote = interaction.options.getString(option.name)
	// 			dbDeleteItem(quote).then(function (result) {
	// 				switch (result) {
	// 					case 'success':
	// 						interaction.reply(`${remove.reply.success}\n${quote}`)
	// 					case 'error-not-found':
	// 						interaction.reply({content: remove.reply.error.item, ephemeral: true})
	// 					default:
	// 						interaction.reply({ content: config.error_generic, ephemeral: true })
	// 				}
	// 			})
	// 		}

		}
	}
	