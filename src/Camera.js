import { useState, useCallback, useRef, useLayoutEffect } from "react";
import Webcam from "react-webcam";
import "./camera.css";

let testList;

const Camera = () => {
	const [image, setImage] = useState(null);
	const webcamRef = useRef(null);
	const cams0 = useRef(null);
	const cams1 = useRef(null);
	const camKey = useRef(0);

	const capture = useCallback(() => {
		if (image === null) {
			const imageSrc = webcamRef.current.getScreenshot();
			setImage(imageSrc);
		} else {
			setImage(null);
		}
	}, [webcamRef, image]);

	useLayoutEffect(() => {
		const getCams = async () => {
			const devices = await window.navigator.mediaDevices.enumerateDevices();
			const camList = devices.filter((dev) => {
				return dev.kind === "videoinput";
			});
			cams0.current = camList[0].deviceId;
			cams1.current = camList[1].deviceId;
			testList = [ cams0.current, cams1.current ];
			alert(JSON.stringify(testList));
		};
		getCams();
	}, []);

	return (
		<div className="camera-wrapper">
			{image === null ? (
				<Webcam
					className="camera"
					style={{ width: "75vw", height: "75vh" }}
					audio={false}
					ref={webcamRef}
					screenshotFormat="image/jpeg"
					videoConstraints={{ deviceId: testList[0] }}
				/>
			) : (
				<img
					className="camera"
					src={image}
					alt=""
					style={{ width: "75vw", height: "75vh" }}
				/>
			)}
			<button onClick={capture}>
				{image === null ? "Capture Reciept" : "Capture Agian"}
			</button>
			{image === null ? <button onClick={() => {alert(testList)}}>Change Camera</button> : null}
		</div>
	);
};

export default Camera;
