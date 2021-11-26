import { forwardRef } from "react";

const Camera = forwardRef((props, ref) => {
	return(
		<div className="video-wrapper">
			<video className="camera" width="100%" ref={ref}></video>
		</div>
	);
});

export default Camera;
