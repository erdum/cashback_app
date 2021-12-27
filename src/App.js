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
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";
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
const db = getFirestore();
const provider = new GoogleAuthProvider();

const restUserData = {
	name: "User",
	email: "",
	phone: "",
	dpURL: avatar,
	uid: null,
};

const uploadImage = async (blob, name, error = false) => {
	let ISODate = new Date();
	ISODate = ISODate.toISOString();
	let fileRefPath = name + "/" + ISODate + ".png";
	fileRefPath = error ? "error/" + name + "_" + ISODate + ".png" : fileRefPath;
	const fileRef = ref(storage, fileRefPath);
	await uploadBytes(fileRef, blob, { contentType: "image/png" });
	alert("image successfuly uploaded");
};

const base64Toblob = async (base64) => {
	let blob = await fetch(base64);
	blob = await blob.blob();
	return blob;
};

const updatePoints = async (name, amount) => {
	await setDoc(doc(db, "users", name), {
		points: Number(amount),
	});
	alert("points updated successfuly");
};

const handleScanSuccess = async (name, amount) => {
	await updatePoints(name, amount);
};

const getUserSavedPoints = async (name) => {
	const userSnap = await getDoc(doc(db, "users", name));
	if (!userSnap.exists()) return null;
	return Number(userSnap.data().points);
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
		onAuthStateChanged(auth, async (result) => {
			if (userData.current.uid === null && result) {
				userData.current = {
					name: result.displayName,
					email: result.email,
					phone: result.phoneNumber,
					dpURL: result.photoURL,
					uid: result.uid,
				};
				const userSavedPoints = await getUserSavedPoints(userData.current.uid);
				if (userSavedPoints) {
					setPoints(userSavedPoints)
				};
				dispatchFunction({ type: "hideSplash" });
			} else {
				setLoader(false);
			}
		});
	}, []);

	useEffect(() => {
		if (scanProgress) {
			setDisplay(
				<>
					<h2>Proccessing Image...</h2>
					<CircularProgress
						variant={
							scanProgress.status === "recognizing text"
								? "determinate"
								: "indeterminate"
						}
						value={scanProgress.value}
					/>
				</>
			);

			if (
				scanProgress.status === "recognizing text" &&
				scanProgress.value === 100
			)
				setHistory(true);
		}
	}, [scanProgress]);

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

	const scanProcess = async ({ status, progress }) => {
		const value = Math.trunc(progress * 100);
		// console.log(status + ": " + value + "%");
		setScanProgress({ ...scanProgress, status, value });
	};

	const capture = async (image) => {
		try {
			dispatchFunction({ type: "hideCamera" });
			const blobImg = await base64Toblob(image);
			setHistory(false);
			const amount = await scanReceipt(blobImg, scanProcess, /^(Total).*/);
			if (typeof amount === "string") {
				let userSavedPoints = await getUserSavedPoints(userData.current.uid);
				if (!userSavedPoints) userSavedPoints = 0;
				await handleScanSuccess(userData.current.uid, amount + userSavedPoints);
				await uploadImage(blobImg, userData.current.uid);
				setPoints(Number(amount) + userSavedPoints);
			} else {
				alert("Please try again, \ntry to capture a clear photo!");
				await uploadImage(blobImg, userData.current.uid, true);
			}
		} catch (err) {
			alert(err);
		}
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
