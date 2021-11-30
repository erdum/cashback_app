import { useEffect, useState, useRef, useReducer } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Layout from "./Layout";
import SplashScreen from "./SplashScreen";
import Camera from "./Camera";
// import getCamera from "./getCamera";
import avatar from "./avatar.webp";

import { initializeApp } from "firebase/app";
import {
	getAuth,
	signInWithPopup,
	GoogleAuthProvider,
	onAuthStateChanged,
	signOut,
} from "firebase/auth";
const firebaseConfig = {
	apiKey: "AIzaSyARe9LNP6X9mb0z1LFzYktjzE65GkR2zks",
	authDomain: "loyality-program-e7185.firebaseapp.com",
	projectId: "loyality-program-e7185",
	storageBucket: "loyality-program-e7185.appspot.com",
	messagingSenderId: "32610232361",
	appId: "1:32610232361:web:ea6276c703a870a10bd438",
};
initializeApp(firebaseConfig);
const auth = getAuth();
const provider = new GoogleAuthProvider();

const restUserData = {
	name: "User",
	email: "",
	phone: "",
	dpURL: avatar,
	uid: "",
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
	cameraScreen: false
};

export default function App({ children }) {
	const [functionState, dispatchFunction] = useReducer(
		reducer,
		initialFunctionState
	);
	const [points, setPoints] = useState("0");
	const [loader, setLoader] = useState(true);
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
		dispatchFunction({ type: "showCamera" });
	};

	const capture = async (image) => {
		dispatchFunction({ type: "hideCamera" });
		scanReceipt(image);
	};

	const scanReceipt = async (image) => {
		// const apiBase = "https://api.ocr.space/parse/image";
		const apiBase = "https://api.cloudmersive.com/ocr/receipts/photo/to/csv";

		const formdata = new FormData();
		formdata.append("imageFile", image, "file");

		const requestOptions = {
			method: "POST",
			headers: {
				// "Apikey": "5b8c7cfbc188957",
				"Apikey": "628139e5-482e-46c9-8734-7293d6e2a500",
			},
			body: formdata,
			redirect: "follow",
		};

		const res = await fetch(apiBase, requestOptions);
		const data = await res.text();
		setPoints(String(Number(points) + 100));
		alert(data);
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
				/>
			)}
			{functionState.cameraScreen && <Camera handleCapture={capture} />}
		</ThemeProvider>
	);
}
