module.exports = {
    async execute() {
        try {
            const admin = require("firebase-admin");
             admin.initializeApp({
                credential: admin.credential.cert(require('path').resolve(__dirname, './serviceAccountKey.json')),
                databaseURL: process.env.DATABASE_URL
            });
            console.log(require('chalk').green(`Instance of Firebase Cloud Firestore initalized properly`))
        } catch (error) {
            console.log(require('chalk').red(`Error initializing Firebase Cloud Firestore: ${error}`))
        } finally {
            require(`./data/get.js`).execute()
            require(`./data/set.js`).execute()
        }
    }
}