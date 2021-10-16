const { getFirestore } = require('firebase-admin/firestore');
const db = getFirestore();

module.exports = {
    async execute() {
        const snapshot = await data.db.collection(process.env.DATABASE_NAME).get();
        snapshot.forEach((doc) => { console.log(doc.id, '=>', doc.data()); });
    }
}