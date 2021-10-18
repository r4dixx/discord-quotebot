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
		const db = require('firebase-admin/firestore').getFirestore();
		try {
			const snapshot = await db.collection(process.env.DATABASE_NAME).get();
			let result
			snapshot.forEach((doc) => { 
				result = Object.values(doc.data()); 
				console.log(result
			});
			switch (result) {
				case undefined: 
					console.warn(chalk.yellow('Cannot get random quote. No quote found in database'))
					interaction.reply({content: reply.error, ephemeral: true})
					break;
				default: 
					console.log(`Got item: ${result}`)
					interaction.reply(`${reply.success} ${result}`)
					break;
			}
		} catch (error) {
			console.log(require('chalk').red(error))
			interaction.reply({ content: config.error_generic, ephemeral: true })
		}
	}
}