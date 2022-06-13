import {initializeApp} from "firebase/app";
import {getFirestore} from 'firebase/firestore';
import {getAuth} from 'firebase/auth'
import {getStorage} from 'firebase/storage'



const firebaseConfig = {
    apiKey: "AIzaSyCpd8FL0oWKFjETDi-hJ3yjGxUc4ah6k5k",
    authDomain: "olx-clone-20df1.firebaseapp.com",
    projectId: "olx-clone-20df1",
    storageBucket: "olx-clone-20df1.appspot.com",
    messagingSenderId: "648343142008",
    appId: "1:648343142008:web:c3caae2102a3fc0c9b378d"
};

const Firebase = initializeApp(firebaseConfig);
export const db = getFirestore(Firebase)
export const auth = getAuth(Firebase)
export const storage=getStorage(Firebase)



