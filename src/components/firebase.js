import firebase from "firebase";
var config = {
  apiKey: "AIzaSyDE9XKjaPpF6QNIXshuS_BCU8zrKj-YGnI",
  authDomain: "runningvscity.firebaseapp.com",
  databaseURL: "https://runningvscity.firebaseio.com",
  projectId: "runningvscity",
  storageBucket: "runningvscity.appspot.com",
  messagingSenderId: "597964700199"
};
firebase.initializeApp(config);
export default firebase;