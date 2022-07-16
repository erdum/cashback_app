import firebaseApp from "./firebaseApp";

import {
	getAuth,
	signInWithPopup,
	GoogleAuthProvider,
	onAuthStateChanged,
	signOut,
} from "firebase/auth";

const auth = getAuth(firebaseApp);
const provider = new GoogleAuthProvider();

const savedLogin = (callBack) => {
	onAuthStateChanged(auth, (result) => {
		if (result) {
			callBack({
				name: result.displayName,
				email: result.email,
				phone: result.phoneNumber,
				dpURL: result.photoURL,
				uid: result.uid,
			});
		} else {
			callBack(null);
		}
	});
};

const login = () => {}

export { auth, provider, savedLogin };
