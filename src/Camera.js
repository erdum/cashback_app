import { forwardRef } from "react";

const Camera = forwardRef((props, ref) => {
	return(
		<video ref={ref} className="camera-window">
		</video>
	);
});

export default Camera;