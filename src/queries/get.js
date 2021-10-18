const db = require('firebase-admin/firestore').getFirestore();

module.exports = {
    async execute() {
        const snapshot = await db.collection(process.env.DATABASE_NAME).get();
        snapshot.forEach((doc) => { console.log(doc.id, '=>', doc.data()); });
    }
}