const { SlashCommandBuilder } = require('@discordjs/builders')
const config = require('../config/config.json')
const help = config.help

module.exports = {
	data: new SlashCommandBuilder()
		.setName(help.name)
		.setDescription(help.description),
	async execute(interaction) {

		const { reply } = help
		
		const helpMessage =
`${reply.about}

${reply.user.title}

• ${reply.user.get} → \`/${config.get.name}\`
• ${reply.user.add} → \`/${config.add.name}\` \`${reply.formats.current}\`

${reply.admin.title}

• ${reply.admin.update.title}
	‣ ${reply.admin.update.last} → \`/${config.update.name}\` \`${reply.formats.new}\`
	‣ ${reply.admin.update.item} → \`/${config.update.name}\` \`${reply.formats.old}\` \`${reply.formats.new}\`

• ${reply.admin.remove.title}
	‣ ${reply.admin.remove.last} → \`/${config.remove.name}\`
	‣ ${reply.admin.remove.item} → \`/${config.remove.name}\` \`${reply.formats.current}\`

${reply.self.title}

• ${reply.self.prefix} \`/${help.name}\``

		console.log(`Displaying help`)
		interaction.reply({content: helpMessage, ephemeral: true})
	}
}