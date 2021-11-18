const chalk = require('chalk');

module.exports = {
    async execute(quote) {
        
        const db = require('firebase-admin/firestore').getFirestore()
        const collection = db.collection(process.env.COLLECTION_ID)

        const snapshot = await collection.get()
        let currentQuotes = new Array()
        snapshot.forEach(doc => { currentQuotes.push(doc.data().text) });

        return new Promise(async function (resolve, reject) {
            if (!currentQuotes.includes(quote)) {
                const docRef = collection.doc();
                const now = new Date()
                const data = { 'id': docRef.id, 'text': quote, 'createdAt': now.getTime(), 'createdAtHr': now.toTimeString() }
                await docRef.set(data);
                console.log(`Setting new document data: ${JSON.stringify(data)}`)
                resolve(data.text)
            } else reject('duplicate')
        })
    }
}