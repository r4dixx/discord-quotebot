const chalk = require('chalk');

const {	SlashCommandBuilder } = require('@discordjs/builders')
const querySet = require('../queries/set.js')
const config = require('../config/config.json')
const { add } = config

module.exports = {

	data: new SlashCommandBuilder()
		.setName(add.name)
		.setDescription(add.description)
		.addStringOption(opt => 
			opt.setName(add.option.name)
				.setDescription(add.option.description)
				.setRequired(true)),

	async execute(interaction) {

		const quote = interaction.options.getString(add.option.name)
		const { reply } = add 
		
		if (quote.includes("<@!")) {
			console.log(chalk.yellow(`Message contains mention, skipping`))
			interaction.reply({content: reply.error.mention,ephemeral: true})
		} else {
			try {
				querySet.execute(quote).then(function (result) {
					console.log(`Quote added successfully: ${result}`)
					interaction.reply(`${reply.success}\n${quote}`)
				}).catch(function (error) {
					console.log(chalk.red(error))
					interaction.reply({content: reply.error.duplicate, ephemeral: true})
				})	
			} catch (error) {
				console.log(chalk.red(error))
				interaction.reply({ content: config.error_generic, ephemeral: true })
			}
		}
	}
}