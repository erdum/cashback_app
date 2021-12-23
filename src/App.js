import { useEffect, useState, useRef, useReducer } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CircularProgress from "@mui/material/CircularProgress";
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

const getImage = async () => {
	const fileRef = ref(storage, "rec.jpg");
	const url = await getDownloadURL(fileRef);
	let blob = await fetch(url, { mode: "cors" });
	blob = await blob.blob();
	return blob;
};

const uploadImage = async (blob, name) => {
	const fileRef = ref(storage, name + "/" + Date.now() + ".png");
	await uploadBytes(fileRef, blob, { contentType: "image/png" });
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
	const [history, setHistory] = useState(true);
	const [scanProgress, setScanProgress] = useState(null);
	const [display, setDisplay] = useState(null);
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

	useEffect(() => {
		if (!history) {
			if (scanProgress.status === "recognizing text") {
				setDisplay(
					<>
						<h2>Recognizing text...</h2>
						<CircularProgress
							variant="determinate"
							value={scanProgress.value}
						/>
					</>
				);
			} else {
				setDisplay(
					<>
						<h2>Processing image...</h2>
						<CircularProgress variant="indeterminate" />
					</>
				);
			}
		}
	}, [history, scanProgress]);

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
		const img = await getImage(
			"https://cdn3.vectorstock.com/i/1000x1000/65/32/paper-cash-sell-receipt-vector-23876532.jpg"
		);
		setHistory(false);
		const amount = await scanReceipt(img, scanProcess, /^(Total).*/);
		console.log(amount);
	};

	const scanProcess = async ({ status, progress }) => {
		const value = Math.trunc(progress * 100);
		// console.log(status + ": " + value + "%");
		setScanProgress({ ...scanProgress, status, value });
	};

	const capture = async (image) => {
		dispatchFunction({ type: "hideCamera" });
		const blobImg = await base64Toblob(image);
		await uploadImage(blobImg, userData.current.uid);
		const amount = await scanReceipt(blobImg, scanProcess, /^(Total).*/);
		setPoints(Number(amount));
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
					// Layout props
					handleLogout={signout}
					handleEarn={earn}
					points={points}
					dpURL={userData.current.dpURL}
					userName={userData.current.name}
					// MFC-display props
					history={history}
					display={display}
				/>
			)}
			{functionState.cameraScreen && <Camera handleCapture={capture} />}
		</ThemeProvider>
	);
}
