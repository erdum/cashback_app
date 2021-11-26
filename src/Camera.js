import { forwardRef } from "react";

const Camera = forwardRef((props, ref) => {
	return(
		<div className="video-wrapper">
		<video ref={ref}>
		</video>
		</div>
	);
});

export default Camera;