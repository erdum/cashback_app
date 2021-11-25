import { useEffect, useState, useRef } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Layout from "./Layout";
import SplashScreen from "./SplashScreen";
import avatar from "./avatar.webp";

// import { initializeApp } from "firebase/app";
// import {
// 	getAuth,
// 	signInWithPopup,
// 	GoogleAuthProvider,
// 	onAuthStateChanged,
// 	signOut,
// } from "firebase/auth";
// const firebaseConfig = {
// 	apiKey: "AIzaSyARe9LNP6X9mb0z1LFzYktjzE65GkR2zks",
// 	authDomain: "loyality-program-e7185.firebaseapp.com",
// 	projectId: "loyality-program-e7185",
// 	storageBucket: "loyality-program-e7185.appspot.com",
// 	messagingSenderId: "32610232361",
// 	appId: "1:32610232361:web:ea6276c703a870a10bd438",
// };
// initializeApp(firebaseConfig);
// const auth = getAuth();
// const provider = new GoogleAuthProvider();

const restUserData = {
	name: "User",
	email: "",
	phone: "",
	dpURL: avatar,
	uid: "",
};

export default function App({ children }) {
	const [points, setPoints] = useState('0');
	const userData = useRef(restUserData);

	useEffect(() => null);

	// useEffect(() => {
	// 	const getCameras = async () => {
	// 		if (!splash && renderState) {
	// 			try {
	// 				const devices =
	// 					await window.navigator.mediaDevices.enumerateDevices();
	// 				let myCam = devices.filter((dev) => {
	// 					return dev.kind === "videoinput";
	// 				});
	// 				const stream = await window.navigator.mediaDevices.getUserMedia({
	// 					video: { deviceId: myCam[1].deviceId },
	// 				});
	// 				videoRef.current.srcObject = stream;
	// 				videoRef.current.play();
	// 			} catch (err) {
	// 				alert(err);
	// 			}
	// 		}
	// 	};
	// 	getCameras();
	// }, [renderState, splash]);

	// useEffect(() => {
	// 	onAuthStateChanged(auth, (result) => {
	// 		if (userData.current.uid === "") {
	// 			userData.current = {
	// 				name: result.displayName,
	// 				email: result.email,
	// 				phone: result.phoneNumber,
	// 				dpURL: result.photoURL,
	// 				uid: result.uid,
	// 			};
	// 		}
	// 	});
	// }, []);

	const signin = async () => {
		// const result = await signInWithPopup(auth, provider);
		// userData.current = {
		// 	name: result.user.displayName,
		// 	email: result.user.email,
		// 	phone: result.user.phoneNumber,
		// 	dpURL: result.user.photoURL,
		// 	uid: result.user.uid,
		// };
	};

	// const signout = async () => {
	// 	userData.current.uid = "";
	// 	signOut(auth).then(() => {
	// 	});
	// };

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
			<SplashScreen handleSignin={signin} />
		</ThemeProvider>
	);
}
