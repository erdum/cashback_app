import React from "react";
import Webcam from "react-webcam";

const videoConstraints = {
	facingMode: "back",
};

const Camera = () => {
	// const [image, setImage] = React.useState(null);
	const webcamRef = React.useRef(null);
	const imgRef = React.useRef(null);

	const capture = React.useCallback(() => {
		const imageSrc = webcamRef.current.getScreenshot();
		alert(imageSrc);
		// setImage(imageSrc);
	}, [webcamRef]);

	return (
		<>
			<Webcam
				className="camera"
				style={{ width: "100vw", height: "100vh" }}
				audio={false}
				ref={webcamRef}
				screenshotFormat="image/jpeg"
				videoConstraints={videoConstraints}
				onClick={capture}
			/>
		</>
	);
};

export default Camera;
