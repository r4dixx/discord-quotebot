module.exports = {
	name: 'interactionCreate',
	execute(interaction) {
        const { client } = interaction
        
		console.log(`${interaction.user.username} triggered an interaction`)

        const { Collection } = require('discord.js')
        client.commands = new Collection()

        const fs = require('fs')
        const commandFiles = fs.readdirSync(require('path').resolve(__dirname, '../commands')).filter(file => file.endsWith('.js'))
        for (const file of commandFiles) {
            const command = require(`../commands/${file}`)
            client.commands.set(command.data.name, command)
        }

        (async () => {
            if (!interaction.isCommand()) return
            const command = client.commands.get(interaction.commandName)
            if (!command) return
            try {
               await command.execute(interaction)
            } catch (error) {
                console.error(error)
                await interaction.reply({ content: error_generic, ephemeral: true })
            }
        })()
	}
}