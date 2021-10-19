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

			// As weird as it seems this is how you get a random document from a collection
			// https://stackoverflow.com/a/46801925/8053848

			const db = require('firebase-admin/firestore').getFirestore()
			const collection = db.collection(process.env.COLLECTION_NAME)
			
			const randomId = collection.doc().id
			console.log(`Generated random id ${randomId}`)

			async function getRandomSnapshot(comparator, sorter) {
				console.log(`Getting random snapshot with ${comparator} comparison and ${sorter} sorting`)
				var randomSnapshot = await collection.where("id", comparator, randomId).orderBy("id", sorter).limit(1).get()
				return randomSnapshot
			}

			var snapshot = await getRandomSnapshot("<=", "desc")
			if (snapshot.empty) {
				console.log(chalk.yellow('Snapshot empty, trying the other direction'))
				snapshot = await getRandomSnapshot(">=", "asc")
			}
			
			let data
			snapshot.forEach(doc => { data = doc.data() });

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