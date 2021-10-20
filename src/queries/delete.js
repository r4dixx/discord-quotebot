const chalk = require('chalk');

module.exports = {
    async execute() {
        
        const db = require('firebase-admin/firestore').getFirestore()
        const collection = db.collection(process.env.COLLECTION_NAME)
        
        const snapshot = await collection.orderBy('createdAt', 'desc').limit(1).get()      

        return new Promise(async function (resolve, reject) {
            if (!snapshot.empty) {
                let quote
                snapshot.forEach(doc => { quote = doc.data() });
                await collection.doc(quote.id).delete().then(() => {
                    if (quote.text !== undefined) {
                        console.log(`Deleted document data: ${JSON.stringify(quote)}`)
                        resolve(quote.text)
                    } else resolve('missing field')
                }).catch(error => { reject(error) })
            } else reject('empty snapshot')
        })
    }
}