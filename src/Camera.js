import React from "react";
import Webcam from "react-webcam";
import "./camera.css";

const videoConstraints = {
	facingMode: "back",
};

const Camera = () => {
	// const [image, setImage] = React.useState(null);
	const webcamRef = React.useRef(null);

	const capture = React.useCallback(() => {
		const imageSrc = webcamRef.current.getScreenshot();
		alert(imageSrc);
		// setImage(imageSrc);
	}, [webcamRef]);

	return (
		<div className="camera-wrapper">
			<Webcam
				className="camera"
				style={{ width: "75vw", height: "75vh" }}
				audio={false}
				ref={webcamRef}
				screenshotFormat="image/jpeg"
				videoConstraints={videoConstraints}
			/>
				<button onClick={capture}>Capture Reciept</button>
				<button>Change Camera</button>
		</div>
	);
};

export default Camera;
