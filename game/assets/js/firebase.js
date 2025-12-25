// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAmrj0j-kzuo2T_jFIT2bkmOF-MW1OK7BA",
  authDomain: "ashve-b7f4f.firebaseapp.com",
  databaseURL: "https://ashve-b7f4f-default-rtdb.firebaseio.com/",
  projectId: "ashve-b7f4f",
  storageBucket: "ashve-b7f4f.firebasestorage.app",
  messagingSenderId: "126920786864",
  appId: "1:126920786864:web:637c681c94a5390fa40c75",
  measurementId: "G-XJ016SN58P"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);