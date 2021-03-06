import { useState, useCallback, useRef, useLayoutEffect } from "react";
import Webcam from "react-webcam";
import "./assets/camera.css";

const Camera = (props) => {
	const [cam, setCam] = useState(false);
	const [image, setImage] = useState(null);
	const webcamRef = useRef(null);
	const [camId, setCamId] = useState(null);
	const [camKey, setCamKey] = useState(1);

	const capture = useCallback(() => {
		if (image === null) {
			const imageSrc = webcamRef.current.getScreenshot();
			setImage(imageSrc);
			props.handleCapture(imageSrc);
		} else {
			setImage(null);
		}
	}, [webcamRef, image, props]);

	useLayoutEffect(() => {
		setCam(false);
		const getCams = async () => {
			const devices = await window.navigator.mediaDevices.enumerateDevices();
			const camList = devices.filter((dev) => {
				return dev.kind === "videoinput";
			});
			setCamId(camList[Number(camKey)].deviceId);
			setCam(true);
		};
		getCams();
	}, [camKey]);

	return (
		<div className="camera-wrapper">
			{cam && (
				<Webcam
					className="camera"
					style={{ width: "75vw", height: "75vh" }}
					audio={false}
					ref={webcamRef}
					screenshotQuality={1}
					screenshotFormat="image/png"
					videoConstraints={{ deviceId: camId }}
				/>
			)}
			<button onClick={capture}>Capture Reciept</button>
			<button
				onClick={() => {
					setCamKey(!camKey);
				}}
			>
				Change Camera
			</button>
		</div>
	);
};

export default Camera;
