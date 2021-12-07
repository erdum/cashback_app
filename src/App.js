import { useEffect, useState, useRef, useReducer } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Layout from "./Layout";
import SplashScreen from "./SplashScreen";
import Camera from "./Camera";
import scanReceipt from "./scanReceipts";
import avatar from "./avatar.webp";

import { initializeApp } from "firebase/app";
import {
	getAuth,
	signInWithPopup,
	GoogleAuthProvider,
	onAuthStateChanged,
	signOut,
} from "firebase/auth";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
const firebaseConfig = {
	apiKey: "AIzaSyARe9LNP6X9mb0z1LFzYktjzE65GkR2zks",
	authDomain: "loyality-program-e7185.firebaseapp.com",
	projectId: "loyality-program-e7185",
	storageBucket: "loyality-program-e7185.appspot.com",
	messagingSenderId: "32610232361",
	appId: "1:32610232361:web:ea6276c703a870a10bd438",
};
const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth();
const storage = getStorage(firebaseApp);
const provider = new GoogleAuthProvider();

const restUserData = {
	name: "User",
	email: "",
	phone: "",
	dpURL: avatar,
	uid: "",
};

const getImage = async (name) => {
	const fileRef = ref(storage, name + "/1638810753966.png");
	const url = await getDownloadURL(fileRef);
	let blob = await fetch(url, { "mode": "cors" });
	blob = await blob.blob();
	return blob;
};

const uploadImage = async (blob, name) => {
	alert(blob);
	const fileRef = ref(storage, name + "/" + Date.now() + ".png");
	uploadBytes(fileRef, blob, { contentType: "image/png" }).then((snapshot) => {
		alert("File successfuly uploaded to google cloud storage");
	});
};

const base64Toblob = async (base64) => {
	let blob = await fetch(base64);
	blob = await blob.blob();
	return blob;
};

const reducer = (state, action) => {
	switch (action.type) {
		case "hideSplash":
			return { ...state, splashScreen: false, layoutScreen: true };
		case "showSplash":
			return { ...state, splashScreen: true, layoutScreen: false };
		case "hideCamera":
			return { ...state, cameraScreen: false, layoutScreen: true };
		case "showCamera":
			return { ...state, cameraScreen: true, layoutScreen: false };
		default:
			throw new Error();
	}
};

const initialFunctionState = {
	splashScreen: true,
	layoutScreen: false,
	cameraScreen: false,
};

export default function App({ children }) {
	const [functionState, dispatchFunction] = useReducer(
		reducer,
		initialFunctionState
	);
	const [points, setPoints] = useState("0");
	const [loader, setLoader] = useState(true);
	const data = useRef("");
	const userData = useRef(restUserData);

	useEffect(() => {
		onAuthStateChanged(auth, (result) => {
			if (userData.current.uid === "" && result) {
				userData.current = {
					name: result.displayName,
					email: result.email,
					phone: result.phoneNumber,
					dpURL: result.photoURL,
					uid: result.uid,
				};
				dispatchFunction({ type: "hideSplash" });
			} else {
				setLoader(false);
			}
		});
	}, []);

	const signin = async () => {
		setLoader(true);
		try {
			const result = await signInWithPopup(auth, provider);
			setLoader(false);
			userData.current = {
				name: result.user.displayName,
				email: result.user.email,
				phone: result.user.phoneNumber,
				dpURL: result.user.photoURL,
				uid: result.user.uid,
			};
			dispatchFunction({ type: "hideSplash" });
		} catch (err) {
			setLoader(false);
			alert(err);
		}
	};

	const signout = async () => {
		signOut(auth).then(() => {
			userData.current.uid = "";
			dispatchFunction({ type: "showSplash" });
		});
	};

	const earn = async () => {
		// dispatchFunction({ type: "showCamera" });
		const img = await getImage(userData.current.uid);
		const amount = await scanReceipt(img, scanProcess);
		console.log(amount);
	};

	const scanProcess = async (log) => {
		// console.log(Math.trunc(progress)*100 + "%");
		console.log(log);
	};

	const capture = async (image) => {
		dispatchFunction({ type: "hideCamera" });
		const blobImg = await base64Toblob(image);
		await uploadImage(blobImg, userData.current.uid);
		const amount = await scanReceipt(blobImg, scanProcess);
		setPoints("80");
		console.log(amount);
	};

	const theme = createTheme({
		palette: {
			primary: {
				main: "#E63946",
				light: "A8DADC",
				dark: "#1D3557",
				contrastText: "#FEFAE0",
			},
		},
	});

	return (
		<ThemeProvider theme={theme}>
			{functionState.splashScreen && (
				<SplashScreen loader={loader} handleSignin={signin} />
			)}
			{functionState.layoutScreen && (
				<Layout
					handleLogout={signout}
					handleEarn={earn}
					points={points}
					dpURL={userData.current.dpURL}
					userName={userData.current.name}
					data={data.current}
				/>
			)}
			{functionState.cameraScreen && <Camera handleCapture={capture} />}
		</ThemeProvider>
	);
}
