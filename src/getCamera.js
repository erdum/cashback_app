const getCamera = async (camIndex=1, videoRef) => {
	try {
		const devices = await window.navigator.mediaDevices.enumerateDevices();
		let myCam = devices.filter((dev) => {
			return dev.kind === "videoinput";
		});
		const stream = await window.navigator.mediaDevices.getUserMedia({
			video: { deviceId: myCam[camIndex].deviceId },
		});
		videoRef.current.srcObject = stream;
		videoRef.current.play();
	} catch (err) {
		alert(err);
	}
};

export default getCamera;
