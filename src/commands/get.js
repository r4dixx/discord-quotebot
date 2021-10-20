const { SlashCommandBuilder } = require('@discordjs/builders')
const chalk = require('chalk');
const queryGet = require('../queries/get.js')
const config = require('../config/config.json')
const { get } = config

module.exports = {
	data: new SlashCommandBuilder()
		.setName(get.name)
		.setDescription(get.description),
	async execute(interaction) {
		queryGet.execute().then(function (result) {
			console.log(`Quote queried successfully: ${result}`)
			interaction.reply(`${get.reply.success} ${result}`)
		}).catch(function (error) {
			console.log(chalk.red(`Error getting quote: ${error}`))
			if (error === 'empty snapshot' || error === 'missing field') interaction.reply({content: get.reply.error, ephemeral: true})
			else interaction.reply({ content: config.error_generic, ephemeral: true })
		})			
	}
}