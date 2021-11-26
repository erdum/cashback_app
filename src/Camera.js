import { forwardRef } from "react";

const Camera = forwardRef((props, ref) => {
	return <video className="camera" width="100%" height="100%" ref={ref}></video>;
});

export default Camera;
