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
	const fileRef = ref(storage, name + ".png");
	const url = await getDownloadURL(fileRef);
	return url;
};

const uploadImage = async (blob, name) => {
	const fileRef = ref(storage, name + ".png");
	uploadBytes(fileRef, blob).then((snapshot) => {
		alert("File successfuly uploaded to google cloud storage");
	});
};

const dataURLtoFile = (dataurl, filename) => {
	let arr = dataurl.split(","),
		mime = arr[0].match(/:(.*?);/)[1],
		bstr = atob(arr[1]),
		n = bstr.length,
		u8arr = new Uint8Array(n);

	while (n--) {
		u8arr[n] = bstr.charCodeAt(n);
	}

	return new File([u8arr], filename, {
		type: mime,
	});
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
	};

	const capture = async (image) => {
		dispatchFunction({ type: "hideCamera" });
		setPoints(String(Number(points) + 100));
		uploadImage(dataURLtoFile(image, "test.png"), "test");
		const imgUrl = await getImage("test");
		const amount = await scanReceipt(imgUrl);
		setPoints(amount);
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
