import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyAcsFiE19X4dM3suy2lXv0iLsncgO5YqMs",
    authDomain: "crwn-db-79ddd.firebaseapp.com",
    databaseURL: "https://crwn-db-79ddd.firebaseio.com",
    projectId: "crwn-db-79ddd",
    storageBucket: "crwn-db-79ddd.appspot.com",
    messagingSenderId: "858188779460",
    appId: "1:858188779460:web:fd20586f7e19c8f0de5e91",
    measurementId: "G-VK16PSBTDX"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if(!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`)

    const snapShot = await userRef.get();

    if(!snapShot.exists){
        const {displayName, email} = userAuth;
        const createdAt = new Date();

        try{
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        }catch (error) {
            console.log('error creatirn user', error.message);
        }
    }

    return userRef;
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;