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
		‣ ${reply.admin.update.item} → \`/${commands.update.name}\` \`${reply.formats.current}\` \`${reply.formats.new}\`

	• ${reply.admin.drop.title}
		‣ ${reply.admin.drop.last} → \`/${commands.drop.name}\`
		‣ ${reply.admin.drop.item} → \`/${commands.drop.name}\` \`${reply.formats.drop}\`

${reply.self.title}
	• ${reply.self.prefixes.command} \`/${help.name}\``,
	
	ephemeral: true});

	}
};