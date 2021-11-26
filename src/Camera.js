import { forwardRef } from "react";

const Camera = forwardRef((props, ref) => {
	return <video width="300px" height="200px" ref={ref}></video>;
});

export default Camera;
