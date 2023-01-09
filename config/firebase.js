const { initializeApp } = require("firebase/app");
const { getFirestore } = require("firebase/firestore");

const firebaseConfig = {
    apiKey: "AIzaSyCFe7wRCIhuQwEjF_kvdGOE7xBiKMig304",
    authDomain: "wedding-manager-firebase.firebaseapp.com",
    databaseURL: "https://wedding-manager-firebase-default-rtdb.firebaseio.com",
    projectId: "wedding-manager-firebase",
    storageBucket: "wedding-manager-firebase.appspot.com",
    messagingSenderId: "618064438256",
    appId: "1:618064438256:web:ec25a026ebe67a7fe2f335"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

module.exports = db;