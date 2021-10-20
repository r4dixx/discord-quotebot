// As weird as it seems this is how you get a random document from a collection
// https://stackoverflow.com/a/46801925/8053848

const chalk = require('chalk');

module.exports = {
    async execute() {
        
        const db = require('firebase-admin/firestore').getFirestore()
        const collection = db.collection(process.env.COLLECTION_NAME)

        const randomId = collection.doc().id
        console.log(`Generated random id ${randomId}`)

        async function getRandomSnapshot(comparator, sorter) {
            console.log(`Getting random snapshot with ${comparator} comparison and ${sorter} sorting`)
            var randomSnapshot = await collection.where("id", comparator, randomId).orderBy("id", sorter).limit(1).get()
            return randomSnapshot
        }

        var snapshot = await getRandomSnapshot("<=", "desc")
        if (snapshot.empty) {
            console.log('Snapshot empty, trying the other direction')
            snapshot = await getRandomSnapshot(">=", "asc")
        }

        return new Promise(function (resolve, reject) {
            if (!snapshot.empty) {
                snapshot.forEach(doc => {
                    console.log(`Got document data: ${JSON.stringify(doc.data())}`)
                    const quote = doc.data().text
                    if (quote !== undefined) resolve(quote)
                    else reject('empty field')
                });
            } else reject('empty snapshot')
        })
    }
}