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
				style={{ width: "300px", height: "550px" }}
				audio={false}
				ref={webcamRef}
				screenshotFormat="image/jpeg"
				videoConstraints={videoConstraints}
				onClick={capture}
			>
				{/*<button>Change Camera</button>*/}
				<button>Capture Reciept</button>
			</Webcam>
		</>
	);
};

export default Camera;
