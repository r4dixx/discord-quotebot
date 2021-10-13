const { SlashCommandBuilder } = require('@discordjs/builders');
const config = require('../config.json');

const help = config.help;

module.exports = {
	data: new SlashCommandBuilder()
		.setName(help.name)
		.setDescription(help.description),
		
	async execute(interaction) {

		console.log(`Displaying help to ${interaction.user.username}`);

		const { reply } = help;
		
		return interaction.reply({content: `
		
${reply.about}

${reply.user.title}

• ${reply.user.get} → \`/${config.get.name}\`
• ${reply.user.insert} → \`/${config.insert.name}\` \`${reply.formats.current}\`

${reply.admin.title}

• ${reply.admin.update.title}
	‣ ${reply.admin.update.last} → \`/${config.update.name}\` \`${reply.formats.new}\`
	‣ ${reply.admin.update.item} → \`/${config.update.name}\` \`${reply.formats.old}\` \`${reply.formats.new}\`

• ${reply.admin.drop.title}
	‣ ${reply.admin.drop.last} → \`/${config.drop.name}\`
	‣ ${reply.admin.drop.item} → \`/${config.drop.name}\` \`${reply.formats.current}\`

${reply.self.title}

• ${reply.self.prefix} \`/${help.name}\`

		`, ephemeral: true});

	}
};