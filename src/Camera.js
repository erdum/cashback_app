import { useState, useCallback, useRef, useEffect } from "react";
import Webcam from "react-webcam";
import "./camera.css";

const Camera = () => {
	const [image, setImage] = useState(null);
	const webcamRef = useRef(null);
	const [cam, setCam] = useState({ index: 0, id: null });

	const capture = useCallback(() => {
		if (image === null) {
			const imageSrc = webcamRef.current.getScreenshot();
			setImage(imageSrc);
		} else {
			setImage(null);
		}
	}, [webcamRef, image]);

	const getCams = async () => {
		const devices = await window.navigator.mediaDevices.enumerateDevices();
		const camList = devices.filter((dev) => {
			return dev.kind === "videoinput";
		});
		if (cam.current.index === 0) {
			setCam({ index: 1, id: camList[1].deviceId });
		} else {
			setCam({ index: 0, id: camList[0].deviceId });
		}
	};

	useEffect(() => {
		// const getCams = async () => {
		// 	const devices = await window.navigator.mediaDevices.enumerateDevices();
		// 	const camList = devices.filter((dev) => {
		// 		return dev.kind === "videoinput";
		// 	});
		// 	if (cam.current.index === 0) {
		// 		setCam({ index: 1, id: camList[1].deviceId });
		// 	} else {
		// 		setCam({ index: 0, id: camList[0].deviceId });
		// 	}
		// };
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
					videoConstraints={{ deviceId: cam.id }}
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
			{image === null ? <button onClick={getCams}>Change Camera</button> : null}
		</div>
	);
};

export default Camera;
