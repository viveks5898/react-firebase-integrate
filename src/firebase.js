import { initializeApp } from "firebase/app";
import {getStorage} from "firebase/storage";
import {getFirestore} from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyCJELCVVTosIiNmlzbL3F7iPN36frMsCJ0",
  authDomain: "dummy-16411.firebaseapp.com",
  projectId: "dummy-16411",
  storageBucket: "dummy-16411.appspot.com",
  databaseURL: "https://dummy-16411-default-rtdb.firebaseio.com/",
  messagingSenderId: "117899261374",
  appId: "1:117899261374:web:4c54ee01f6b2f5528135ef",
};

const app = initializeApp(firebaseConfig);
const imgDB = getStorage(app)
  const textDB =  getFirestore(app)
  export {imgDB, textDB};