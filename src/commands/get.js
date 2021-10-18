const chalk = require('chalk');

const { SlashCommandBuilder } = require('@discordjs/builders')
const config = require('../config/config.json')
const { get } = config

module.exports = {
	data: new SlashCommandBuilder()
		.setName(get.name)
		.setDescription(get.description),
	async execute(interaction) {
		const { reply } = get
		try {

			const db = require('firebase-admin/firestore').getFirestore()
			const collection = db.collection(process.env.COLLECTION_NAME)
			const randomId = collection.doc().id
			const snapshot = await collection.where("id", ">=", randomId).orderBy("id", "asc").limit(1).get()
			let data
			await snapshot.forEach(doc => { data = doc.data() });	

			console.log(randomId)
			console.log(data)

			if (snapshot.empty || data.text === undefined) {
				console.warn(chalk.yellow('Cannot get random quote. No quote found in database'))
				interaction.reply({content: reply.error, ephemeral: true})
			} else {
				console.log(`Got quote: ${data.text}`)
				console.log(`Associated document data: ${JSON.stringify(data)}`)
				interaction.reply(`${reply.success} ${data.text}`)
			}

		} catch (error) {
			console.log(chalk.red(error))
			interaction.reply({ content: config.error_generic, ephemeral: true })
		}
	}
}