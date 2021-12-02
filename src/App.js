import { useEffect, useState, useRef, useReducer } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Layout from "./Layout";
import SplashScreen from "./SplashScreen";
import Camera from "./Camera";
// import getCamera from "./getCamera";
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
	cameraScreen: false,
};

export default function App({ children }) {
	const [functionState, dispatchFunction] = useReducer(
		reducer,
		initialFunctionState
	);
	const [points, setPoints] = useState("0");
	const [loader, setLoader] = useState(true);
	const [selectedImage, setSelectedImage] = useState(null);
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
		scanReceipt(selectedImage);
	};

	const capture = async (image) => {
		// dispatchFunction({ type: "hideCamera" });
		setPoints(String(Number(points) + 100));
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
			<input
				type="file"
				name="ocr-image"
				onChange={(event) => {
					setSelectedImage(event.target.files[0]);
				}}
			/>
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
					data=""
				/>
			)}
			{functionState.cameraScreen && <Camera handleCapture={capture} />}
		</ThemeProvider>
	);
}
