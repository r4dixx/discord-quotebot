const chalk = require('chalk');

const { SlashCommandBuilder } = require('@discordjs/builders')
const queryGet = require('../queries/get.js')
const config = require('../config/config.json')
const { get } = config

module.exports = {
	data: new SlashCommandBuilder()
		.setName(get.name)
		.setDescription(get.description),
	async execute(interaction) {
		try {
			queryGet.execute().then(function (result) {
				console.log(`Sending quote: ${result}`)
				interaction.reply(`${get.reply.success} ${result}`)
			}).catch(function (error) {
				console.log(chalk.red(error))
				interaction.reply({content: get.reply.error, ephemeral: true})
			})			
		} catch (error) {
			console.log(chalk.red(error))
			interaction.reply({ content: config.error_generic, ephemeral: true })
		}
	}
}