const db = require('firebase-admin/firestore').getFirestore();

(async () => {
    try {
        const docRef = db.collection(process.env.DATABASE_NAME).doc("1"); // TODO increment number
        await docRef.set({ text: "test" });
    } catch (error) {
		console.log(require('chalk').red(error))
    }
})();

