import { forwardRef } from "react";

const Camera = forwardRef((props, ref) => {
	return(
		<div className="video-wrapper">
		<video ref={ref} className="camera-window">
		</video>
		</div>
	);
});

export default Camera;