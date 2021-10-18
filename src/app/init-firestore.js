(async () => {
	try {
		var admin = require("firebase-admin");
		var serviceAccount = require('path').resolve(__dirname, '../config/firebase.json');
		admin.initializeApp({
			credential: admin.credential.cert(serviceAccount),
			databaseURL: process.env.DATABASE_URL
		});
		console.log(require('chalk').green(`Instance of Firebase Cloud Firestore initalized properly`))
	} catch (error) {
		console.log(require('chalk').red(`Error initializing Firebase Cloud Firestore: ${error}`))
	}
})()