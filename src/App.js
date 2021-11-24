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
// 	signOut
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

let myCam;

export default function App({ children }) {
	const [splash, setSplash] = useState(true);
	const userData = useRef(restUserData);
	const userPoints = useRef("0");
	const videoRef = useRef(null);

	useEffect(() => {
		if (!splash) {
			alert("testing...\n" + window.navigator.userAgent);
			try {
				window.navigator.mediaDevices.enumerateDevices().then((devices) => {
					devices.forEach((dev) => {
						if (dev.kind === "videoinput") {
							alert(JSON.stringify(dev));
						}
					});
				});
				// window.navigator.mediaDevices
				// 	.getUserMedia({ video: { deviceId: myCam } })
				// 	.then((stream) => {
				// 		videoRef.current.srcObject = stream;
				// 		videoRef.current.play();
				// 	})
				// 	.catch((err) => {
				// 		alert(err);
				// 	});
			} catch (err) {
				alert(err);
			}
		}
	}, [splash]);

	// useEffect(() => {
	// onAuthStateChanged(auth, (result) => {
	// 	if (userData.current.uid == "" && result != null) {
	// 		userData.current = {
	// 			name: result.displayName,
	// 			email: result.email,
	// 			phone: result.phoneNumber,
	// 			dpURL: result.photoURL,
	// 			uid: result.uid,
	// 		};
	// 		setSplash(false);
	// 	}
	// });
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
		setSplash(false);
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
			{splash && <SplashScreen signinHandler={signin} />}
			{!splash && (
				<Layout
					userName={userData.current.name}
					points={userPoints.current}
					dpURL={userData.current.dpURL}
					ref={videoRef}
				>
					{children}
				</Layout>
			)}
		</ThemeProvider>
	);
}
