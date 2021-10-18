const chalk = require('chalk');

const {	SlashCommandBuilder } = require('@discordjs/builders')
const config = require('../config/config.json')
const { set } = config

module.exports = {

	data: new SlashCommandBuilder()
		.setName(set.name)
		.setDescription(set.description)
		.addStringOption(opt => 
			opt.setName(set.option.name)
				.setDescription(set.option.description)
				.setRequired(true)),

	async execute(interaction) {

		const quote = interaction.options.getString(set.option.name)
		const { reply } = set 
		
		if (quote.includes("<@!")) {
			console.log(`Message contains mention, skipping`)
			interaction.reply({content: reply.error.mention,ephemeral: true})
		} else {
			try {
				const collection = require('firebase-admin/firestore').getFirestore().collection(process.env.COLLECTION_NAME)

				let quotes = new Array()
				const snapshot = await collection.get()
				snapshot.forEach(doc => { quotes.push(doc.data().quote) });
				
				if (quotes.includes(quote)) {
					console.warn(chalk.yellow('Skipping quote insertion, already found in database'))
					interaction.reply({content: reply.error.duplicate, ephemeral: true})
				} else  {
					const docRef = await collection.doc();
					const data = { 'id': docRef.id, 'quote': quote, 'timestamp': new Date().getTime() }
					await docRef.set(data);
					console.log(`Added quote: ${quote} with associated document data: ${Object.values(data)}`)
					interaction.reply(`${reply.success}\n${quote}`)
				}
			
			} catch (error) {
				console.log(chalk.red(error))
				interaction.reply({ content: config.error_generic, ephemeral: true })
			}
		}
	}
}