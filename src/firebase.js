import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyA_elJHhuznvCb6tSpTDhoVmn3EW9BKJ-c",
  authDomain: "mycupones-d9184.firebaseapp.com",
  projectId: "mycupones-d9184",
  storageBucket: "mycupones-d9184.appspot.com",
  messagingSenderId: "907916378090",
  appId: "1:907916378090:web:15fc7fd99ee38f90127c93",
  measurementId: "G-HG9XPEDCSS"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth();
export const storage = getStorage(app);
