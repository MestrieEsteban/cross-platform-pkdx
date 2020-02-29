import * as firebase from 'firebase';
// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyCJGUtC-5BlBP8eX14FuoIjGIuHwOpeeg4",
  authDomain: "react-native-pkdx.firebaseapp.com",
  databaseURL: "https://react-native-pkdx.firebaseio.com", 
  projectId: "react-native-pkdx",
  storageBucket: "react-native-pkdx.appspot.com",
  messagingSenderId: "299448272539",
  appId: "1:299448272539:web:34bd523618092ba1dd283e",
  measurementId: "G-NHBH3CT7MJ"
};
// Initialize Firebase
module.exports=(firebase.initializeApp(firebaseConfig))