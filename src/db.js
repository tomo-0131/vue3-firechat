import firebase from "firebase/compat/app"
import 'firebase/compat/database';

const config = {
  apiKey: "AIzaSyC2h5Xi1PH6a5x-wzpYQJ1W2HdW5ymG1ic",
  authDomain: "realtime-firechat.firebaseapp.com",
  databaseURL: "https://realtime-firechat-default-rtdb.firebaseio.com/",
  projectId: "realtime-firechat",
  storageBucket: "realtime-firechat.appspot.com",
  messagingSenderId: "1083862253950",
  appId: "1:1083862253950:web:d6e1b84512f19dc075332f"
};

firebase.initializeApp(config);

// firebase.database();

export default firebase;
