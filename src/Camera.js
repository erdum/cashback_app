import React from "react";
import Webcam from "react-webcam";

const videoConstraints = {
	facingMode: "back",
};

const Camera = () => {
	const webcamRef = React.useRef(null);
	const imgRef = React.useRef(null);

	const capture = React.useCallback(() => {
		const imageSrc = webcamRef.current.getScreenshot();
		alert(imageSrc);
		imgRef.current.srcObject = imageSrc;
	}, [webcamRef]);

	return (
		<>
			<Webcam
				audio={false}
				height={720}
				ref={webcamRef}
				screenshotFormat="image/jpeg"
				width={1280}
				videoConstraints={videoConstraints}
			/>
			<button onClick={capture}>Capture photo</button>
			<img ref={imgRef} alt="" />
		</>
	);
};

export default Camera;
