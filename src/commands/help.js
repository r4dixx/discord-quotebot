const { SlashCommandBuilder } = require('@discordjs/builders');
const commands = require('../config/commands.json');

const help = commands.help;

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
	• ${reply.user.get} → \`/${commands.get.name}\`
	• ${reply.user.insert} → \`/${commands.insert.name}\` \`${reply.formats.current}\`

${reply.admin.title}
	• ${reply.admin.update.title}
		‣ ${reply.admin.update.last} → \`/${commands.update.name}\` \`${reply.formats.new}\`

	• ${reply.admin.delete.title}
		‣ ${reply.admin.delete.last} → \`/${commands.delete.name}\`

${reply.self.title}
	• ${reply.self.prefixes.command} \`/${help.name}\``,
	
	ephemeral: true});

	// ‣ ${reply.admin.update.item} → \`/${commands.update.name}\` \`${reply.formats.current}\` \`${commands.separator}\` \`${reply.formats.new}\`
	// ‣ ${reply.admin.delete.item} → \`/${commands.delete}\` \`${reply.formats.delete}\`
	}
};