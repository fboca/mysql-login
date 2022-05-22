import firebase from "firebase";

const firebaseConfig = {

    apiKey: "AIzaSyB58Eqg1xyftlIBm1TFe54OsKlK6i0WjR4",

    authDomain: "filipboca-portfolioproject001.firebaseapp.com",

    projectId: "filipboca-portfolioproject001",

    storageBucket: "filipboca-portfolioproject001.appspot.com",

    messagingSenderId: "823976721352",

    appId: "1:823976721352:web:35d0e718380a7fe3ef5efd",

    measurementId: "G-HTYH2TV1WX"

};

const app = firebase.initializeApp(firebaseConfig);
//const analytics = firebase.getAnalytics(app);

export default app;