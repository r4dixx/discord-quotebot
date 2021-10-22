const chalk = require('chalk');

module.exports = {
    async execute(quoteOld, quoteNew) {
        
        const db = require('firebase-admin/firestore').getFirestore()
        const collection = db.collection(process.env.COLLECTION_NAME)

        if (quoteOld === undefined) {
            console.log(`Querying last item`)
            snapshot = await collection.orderBy("createdAt", "desc").limit(1).get()
        } else {
            console.log(`Querying specific item: ${quoteOld}`) 
            snapshot = await collection.where("text", "==", quoteOld).limit(1).get()
        }

        return new Promise(async function (resolve, reject) {
            if (!snapshot.empty) {
                let quote
                snapshot.forEach(doc => { quote = doc.data() });
                // todo reject if quoteNew exists anywhere
                await collection.doc(quote.id).update({ text: quoteNew }).then(() => {
                    if (quote.text === undefined) resolve('missing field')
                    else if (quote.text === quoteNew) reject('duplicate')
                    else {
                        console.log(`Got document data: ${JSON.stringify(quote)}`)
                        resolve(quote.text)
                    }
                }).catch(error => { reject(error) })
            } else reject('empty snapshot')
        })
    }
}