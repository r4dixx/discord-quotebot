const {	SlashCommandBuilder } = require('@discordjs/builders')
const config = require('../config/config.json')
const { insert } = config

module.exports = {

	data: new SlashCommandBuilder()
		.setName(insert.name)
		.setDescription(insert.description)
		.addStringOption(opt => 
			opt.setName(insert.option.name)
				.setDescription(insert.option.description)
				.setRequired(true)),

	async execute(interaction) {
		const quote = interaction.options.getString(insert.option.name)
		const { reply } = insert 
		
		if (quote.includes("<@!")) {
			console.log(`Message contains mention, skipping`)
			interaction.reply({content: reply.error.mention,ephemeral: true})
		} else {
			const db = require('firebase-admin/firestore').getFirestore();
			try {

				// TODO Check for duplicate
				// interaction.reply({content: reply.error.duplicate, ephemeral: true})


				// Figuring out the total number in collection.
				var totalNoInCollection;
				await db.collection(process.env.DATABASE_NAME).get().then((docs) => { totalNoInCollection = docs.size; });
	
				// Incrementing the total number .  
				var id = totalNoInCollection++;
	
				// And setting up the data.
				const docRef = db.collection(process.env.DATABASE_NAME).doc(`${id}`);
				await docRef.set({ text: quote });
				console.log(`Set document values: ${quote}`)
				interaction.reply(`${reply.success}\n${quote}`)
			
	
			} catch (error) {
				console.log(require('chalk').red(error))
				interaction.reply({ content: config.error_generic, ephemeral: true })
			}
		}
	}
}