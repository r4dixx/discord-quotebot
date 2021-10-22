const {	SlashCommandBuilder } = require('@discordjs/builders')
const config = require('../config/config.json')
const { update } = config
const { name, description, subcommands } = update

const optionLast = subcommands.last.option
const optionItem = subcommands.item.options

module.exports = {
	data: new SlashCommandBuilder()
		.setName(name)
		.setDescription(description)

		.addSubcommand(sub =>
			sub.setName(subcommands.last.name)
			.setDescription(subcommands.last.description)
			.addStringOption(opt => 
				opt.setName(optionLast.name)
					.setDescription(optionLast.description)
					.setRequired(true)))

		.addSubcommand(sub =>
			sub.setName(subcommands.item.name)
			.setDescription(subcommands.item.description)
			.addStringOption(opt =>
				opt.setName(optionItem.old.name)
				.setDescription(optionItem.old.description)
				.setRequired(true))
			.addStringOption(opt =>
				opt.setName(optionItem.new.name)
				.setDescription(optionItem.new.description)
				.setRequired(true))),

	async execute(interaction) {

		const chalk = require('chalk');
		const { reply } = update 

		if (!process.env.CAPTAIN_IDS.includes(interaction.user.id)) {
			console.log(chalk.yellow(`User ${interaction.user.username} is not a captain. Abort!`))
			interaction.reply({content: reply.error.rights, ephemeral: true})
		}
		
		else {
			const itemMode = interaction.options.getSubcommand() === subcommands.item.name
			const lastMode = interaction.options.getSubcommand() === subcommands.last.name
			let replyMsg
			let quoteOld
			let quoteNew
			if (itemMode) {
				quoteOld = interaction.options.getString(optionItem.old.name)
				quoteNew = interaction.options.getString(optionItem.new.name)
			} else quoteNew = interaction.options.getString(optionLast.name)

			console.log(`old: ${quoteOld}, new: ${quoteNew}`)

			if (quoteNew.includes("<@!")) {
				console.log(chalk.yellow(`Message contains mention. Abort!`))
				if (lastMode) replyMsg = reply.error.last.mention 
				else replyMsg = reply.error.item.mention
				interaction.reply({ content: replyMsg, ephemeral: true })
			} 

			else if (itemMode && quoteOld === quoteNew) {
				console.log(chalk.yellow(`Old quote similar to new quote. Abort!`))
				interaction.reply({ content: reply.error.item.similar, ephemeral: true })
			}
			
			else {
				const queryUpdate = require('../queries/update.js')
				queryUpdate.execute(quoteOld, quoteNew).then(function (result) {
					if (result === 'missing field') {
						console.log(chalk.yellow(`No text field was found in document data. Adding it: ${result}`))
						interaction.reply(`${reply.success.title}\n${result}`)
					} else {
						console.log(`Quote updated successfully to ${quoteNew}`)
						interaction.reply(`${reply.success.title}\n${reply.success.prefix_old}\n${result}\n${reply.success.prefix_new}\n${quoteNew}`)
					}
				}).catch(function (error) {
					console.log(chalk.red(`Error updating quote: ${error}`))
					if (error == 'duplicate') {
						if (lastMode) replyMsg = reply.error.last.duplicate 
						else replyMsg = reply.error.item.duplicate
						interaction.reply({content: replyMsg, ephemeral: true})
					}
					else if (error === 'empty snapshot') {
						if (lastMode) replyMsg = reply.error.last.notfound
						else replyMsg = reply.error.item.notfound
						interaction.reply({content: replyMsg , ephemeral: true})
					}
					else interaction.reply({ content: config.error_generic, ephemeral: true })
				})
			}
		}	
	}
}
