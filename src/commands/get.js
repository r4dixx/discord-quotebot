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

			const admin = require("firebase-admin");
			const randomId = admin.firestore().collection("tmp").doc().id
			const snapshot = await require('firebase-admin/firestore').getFirestore().collection(process.env.COLLECTION_NAME).where("id", ">=", randomId).orderBy("id", "asc").limit(1).get()
			let data
			snapshot.forEach(doc => { data = doc.data() });	

			if (snapshot.empty || data.quote === undefined) {
				console.warn(chalk.yellow('Cannot get random quote. No quote found in database'))
				interaction.reply({content: reply.error, ephemeral: true})
			} else {
				console.log(`Got quote: ${data.quote}`)
				console.log(`Associated document data: ${JSON.stringify(data)}`)
				interaction.reply(`${reply.success} ${data.quote}`)
			}

		} catch (error) {
			console.log(chalk.red(error))
			interaction.reply({ content: config.error_generic, ephemeral: true })
		}
	}
}