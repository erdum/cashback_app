import { forwardRef } from "react";

const Camera = forwardRef((props, ref) => {
	return(
		<div className="video-wrapper">
			<video className="camera" width="100%" style={{ height: "100vh" }} ref={ref}></video>
		</div>
	);
});

export default Camera;
