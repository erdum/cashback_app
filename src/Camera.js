import React from "react";
import Webcam from "react-webcam";
import "./camera.css";

const videoConstraints = {
	facingMode: "back",
};

const Camera = () => {
	const [image, setImage] = React.useState(null);
	const webcamRef = React.useRef(null);

	const capture = React.useCallback(() => {
		const imageSrc = webcamRef.current.getScreenshot();
		setImage(imageSrc);
	}, [webcamRef]);

	return (
		<div className="camera-wrapper">
			{image === null ? (
				<Webcam
					className="camera"
					style={{ width: "75vw", height: "75vh" }}
					audio={false}
					ref={webcamRef}
					screenshotFormat="image/jpeg"
					videoConstraints={videoConstraints}
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
			{image === null ? <button>Change Camera</button> : null}
		</div>
	);
};

export default Camera;
