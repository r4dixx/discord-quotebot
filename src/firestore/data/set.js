const db = require('firebase-admin/firestore').getFirestore();

module.exports = {
    async execute(quote) {
        const docRef = db.collection(process.env.DATABASE_NAME).doc("1"); // TODO increment number
        await docRef.set({ text: quote });
    }
}
