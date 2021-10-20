const chalk = require('chalk');

module.exports = {
    async execute(quote) {
        
        const db = require('firebase-admin/firestore').getFirestore()
        const collection = db.collection(process.env.COLLECTION_NAME)

        let currentQuotes = new Array()
        const snapshot = await collection.get()
        snapshot.forEach(doc => { currentQuotes.push(doc.data().text) });

        return new Promise(async function (resolve, reject) {
            if (!currentQuotes.includes(quote)) {
                const docRef = collection.doc();
                const now = new Date()
                const data = { 'id': docRef.id, 'text': quote, 'createdAt': now.getTime(), 'createdAtHumanReadable': now.toTimeString() }
                await docRef.set(data);
                console.log(`Setting new document data: ${JSON.stringify(data)}`)
                resolve(data.text)
            } else reject('duplicate')
        })
    }
}