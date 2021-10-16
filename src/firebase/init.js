// Init
var admin = require("firebase-admin");
admin.initializeApp({
    credential: admin.credential.cert(require('path').resolve(__dirname, './serviceAccountKey.json')),
    databaseURL: process.env.DATABASE_URL
  });

// DB
const { getFirestore } = require('firebase-admin/firestore');
const db = getFirestore();
const collectionName = 'quotes';

// Create
(async() => {
    const docRef = db.collection(collectionName).doc("1");
    await docRef.set({ text: 'Hello world!' }); 
})();

// Read
(async() => {
    const snapshot = await db.collection(collectionName).get();
    snapshot.forEach((doc) => {
        console.log(doc.id, '=>', doc.data());
    });
})();