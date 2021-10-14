module.exports = {
	name: 'interactionCreate',
	execute(interaction) {
		console.log(`${user.username} triggered an interaction in #${interaction.channel}`);
	}
};