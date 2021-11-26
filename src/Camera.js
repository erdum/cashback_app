import { forwardRef } from "react";

const Camera = forwardRef((props, ref) => {
	return(
		<div className="video-wrapper">
			<video className="camera" style={{ height: "100vh", width: "100vw" }} ref={ref}></video>
		</div>
	);
});

export default Camera;
