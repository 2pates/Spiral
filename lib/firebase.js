import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc } from 'firebase/firestore';

const {
    FIREBASE_API_KEY,
    FIREBASE_AUTH_DOMAIN,
    FIREBASE_PROJECT_ID,
    FIREBASE_STORAGE_BUCKET,
    FIREBASE_MESSAGING_SENDER_ID,
    FIREBASE_APP_ID,
} = process.env;

const firebaseConfig = {
    apiKey: FIREBASE_API_KEY,
    authDomain: FIREBASE_AUTH_DOMAIN,
    projectId: FIREBASE_PROJECT_ID,
    storageBucket: FIREBASE_STORAGE_BUCKET,
    messagingSenderId: FIREBASE_MESSAGING_SENDER_ID,
    appId: FIREBASE_APP_ID,
};

let app;
let firestoreDb;

export const initializeFirebaseApp = () => {
    try {
        app = initializeApp(firebaseConfig);
        firestoreDb = getFirestore(app);
    } catch (error) {
        console.error('Error initializing Firebase app', error);
    }
};


const uploadProcessedData = async (data) => {
    const dataToUpload = {
        key1 : "test",
        key2 : 123,
        key3 : newDate(),
    };
    try {
        const document = doc(firestoreDb, "resources", " idResources"); //db, db name, db id
        let dataUpdated = await setDoc(document, dataToUpload);
        console.log('Data uploaded successfully', dataUpdated);
    } catch (error) {
        console.error('Error uploading data', error);
    }
};

const getFirebaseApp = () => app;

module.exports = {
    initializeFirebaseApp,
    getFirebaseApp,
    uploadProcessedData,
};