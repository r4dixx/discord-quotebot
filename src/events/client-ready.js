module.exports = {
	name: 'ready',
	once: true,
	async execute(client) {
		const { user } = client
		console.log(require('chalk').green(`Discord client ready! Logged in as ${user.username} - ID: ${user.id}`))
		// Initialize Firebase Cloud Firestore
		try {
			const admin = require("firebase-admin");
			const serviceAccount = require('path').resolve(__dirname, '../config/firebase.json');
			admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });
			console.log(require('chalk').green(`Instance of Firebase Cloud Firestore initalized properly`))
		} catch (error) {
			console.log(require('chalk').red(`Error initializing Firebase Cloud Firestore: ${error}`))
		}
	}
}