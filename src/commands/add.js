const chalk = require('chalk');

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

		const quote = interaction.options.getString(add.option.name)
		const { reply } = add 
		
		if (quote.includes("<@!")) {
			console.log(`Message contains mention, skipping`)
			interaction.reply({content: reply.error.mention,ephemeral: true})
		} else {
			try {

				const db = require('firebase-admin/firestore').getFirestore()
				const collection = db.collection(process.env.COLLECTION_NAME)

				let quotes = new Array()
				const snapshot = await collection.get()
				snapshot.forEach(doc => { quotes.push(doc.data().text) });
				
				if (quotes.includes(quote)) {
					console.warn(chalk.yellow('Skipping quote insertion, already found in database'))
					interaction.reply({content: reply.error.duplicate, ephemeral: true})
				} else  {
					const docRef = await collection.doc();
					const now = new Date()
					const data = { 'id': docRef.id, 'text': quote, 'time_added': now.getTime(), 'time_added_hr': now.toTimeString() }
					await docRef.set(data);
					console.log(`Added quote: ${quote}`)
					console.log(`Associated document data: ${JSON.stringify(data)}`)
					interaction.reply(`${reply.success}\n${quote}`)
				}
			
			} catch (error) {
				console.log(chalk.red(error))
				interaction.reply({ content: config.error_generic, ephemeral: true })
			}
		}
	}
}