import { forwardRef } from "react";

const Camera = forwardRef((props, ref) => {
	return <video width="100vw" height="100vh" ref={ref}></video>;
});

export default Camera;
