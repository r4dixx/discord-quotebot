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
			const db = require('firebase-admin/firestore').getFirestore();

			// Figuring out the total number in collection.
			var totalNoInCollection;
			await db.collection(process.env.COLLECTION_NAME).get().then((docs) => { totalNoInCollection = docs.size; });

			// Generating a random number between 1 and total no.   
			var randomId = Math.floor(Math.random() * totalNoInCollection);

			// Picking a random document.
			const doc = await db.collection(process.env.COLLECTION_NAME).doc(`${randomId}`).get();

			// And setting up the result
			if (!doc.exists || doc.data() === 'undefined') {
				console.warn(chalk.yellow('Cannot get random quote. No quote found in database'))
				interaction.reply({content: reply.error, ephemeral: true})
			} else {
				const docValues = Object.values(doc.data());
				console.log(`Got document values: ${docValues}`)
				interaction.reply(`${reply.success} ${docValues}`)
			}

		} catch (error) {
			console.log(chalk.red(error))
			interaction.reply({ content: config.error_generic, ephemeral: true })
		}
	}
}