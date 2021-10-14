require('../database/dbQueries.js')();

module.exports = {
	name: 'ready',
	once: true,
	execute(client) {
		const { user } = client;
		console.log(`Discord client ready! Logged in as ${user.username} - ID: ${user.id}`);
		dbCreateTableIfNecessary();
	},
};