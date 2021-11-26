import { useState, useCallback, useEffect, useRef } from "react";
import Webcam from "react-webcam";
import "./camera.css";

const Camera = () => {
	const [image, setImage] = useState(null);
	const webcamRef = useRef(null);
	const cam = useRef({ index: 0, id: null });

	const capture = useCallback(() => {
		if (image === null) {
			const imageSrc = webcamRef.current.getScreenshot();
			setImage(imageSrc);
		} else {
			setImage(null);
		}
	}, [webcamRef]);

	const changeCam = useCallback(() => {
		const getCams = async (camIndex=0) => {
			const devices = await window.navigator.mediaDevices.enumerateDevices();
			const camList = devices.filter((dev) => {
				return dev.kind === "videoinput";
			});
			if (cam.current.index === 0) {
				cam.current = { index: 1, id: camList[1].deviceId }
				setImage(null);
			} else {
				cam.current = { index: 0, id: camList[0].deviceId }
				setImage(null);
			}
		};
	}, [cam]);

	return (
		<div className="camera-wrapper">
			{image === null ? (
				<Webcam
					className="camera"
					style={{ width: "75vw", height: "75vh" }}
					audio={false}
					ref={webcamRef}
					screenshotFormat="image/jpeg"
					videoConstraints={{ deviceId: cam.current.id }}
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
			{image === null ? <button onClick={changeCam}>Change Camera</button> : null}
		</div>
	);
};

export default Camera;
