// As weird as it seems this is how you get a random document from a collection
// https://stackoverflow.com/a/46801925/8053848

module.exports = {
    async execute() {
        const chalk = require('chalk');

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
            console.log(chalk.yellow('Snapshot empty, trying the other direction'))
            snapshot = await getRandomSnapshot(">=", "asc")
        }

        return new Promise(function (resolve, reject) {
            if (!snapshot.empty) {
                snapshot.forEach(doc => {
                    console.log(`Got document data: ${JSON.stringify(doc.data())}`)
                    const quote = doc.data().text
                    if (quote !== undefined) resolve(quote)
                    else reject(new Error(`Cannot get random quote. Text field is missing from doc ${doc.id}`))
                });
            } else reject(new Error('Cannot get random quote. Snapshot is empty'))
        })
    }
}