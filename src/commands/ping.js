const { SlashCommandBuilder } = require('@discordjs/builders')
const { ping } = require('../config.json')

module.exports = {
	data: new SlashCommandBuilder()
		.setName(ping.name)
		.setDescription(ping.description),
	async execute(interaction) {
        console.log(`Pong! Websocket heartbeat: ${interaction.client.ws.ping}ms.`)
		return interaction.reply(ping.reply)
	}
}