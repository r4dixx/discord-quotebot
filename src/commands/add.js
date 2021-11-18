const {	SlashCommandBuilder } = require('@discordjs/builders')
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
		const chalk = require('chalk');
		const quote = interaction.options.getString(add.option.name)
		const { reply } = add 
		
		if (quote.includes("<@!")) {
			console.log(chalk.yellow(`Message contains mention. Abort!`))
			interaction.reply({content: reply.error.mention,ephemeral: true})
		} else {
			const querySet = require('../queries/set.js')
			querySet.execute(quote).then(function (result) {
				console.log(`Quote added successfully: ${result}`)
				interaction.reply(`${reply.success}\n${result}`)
			}).catch(function (error) {
				console.log(chalk.red(`Error adding quote: ${error}`))
				if (error == 'duplicate') interaction.reply({content: reply.error.duplicate, ephemeral: true})
				else interaction.reply({ content: config.error_generic, ephemeral: true })
			})	
		}
	}
}