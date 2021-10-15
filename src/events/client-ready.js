module.exports = {
	name: 'ready',
	once: true,
	execute(client) {
		const { user } = client
		console.log(require('chalk').green(`Discord client ready! Logged in as ${user.username} - ID: ${user.id}`))
		require('../database/dbQueries.js')()
		dbCreateTableIfNecessary()
	},
}