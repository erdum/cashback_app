// import Tesseract from "tesseract.js";

const scanReceipt = async (image, setOcrLoader) => {
	try {
		// const {
		// 	data: { text },
		// } = await Tesseract.recognize(image, "eng");
		// alert(text);
		// setOcrLoader(false);
		let fileName = "rec.jpg";
		let base64str = image;
		let jsonData = {
			file_data: base64str,
			file_name: fileName,
			boost_mode: 1,
		};

		let USER_NAME = "erdumadnan";
		let API_KEY = "1dce7281a3649b4d9bc742926ab3d3a4";
		let CLIENT_ID = "vrfOeWTZOsxe66HHw6iVtD2NMeroxmI8mWOoL59";
		let ENVIRONMENT_URL = "https://api.veryfi.com/";

		let options = {
			method: "POST",
			uri: "https://" + ENVIRONMENT_URL + "/api/v7/partner/documents/",
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
				"CLIENT-ID": CLIENT_ID,
				AUTHORIZATION: `apikey ${USER_NAME}:${API_KEY}`,
			},
			json: jsonData,
		};

		const res = await fetch(options);
		const text = await res.text();

		alert(text);

	} catch (err) {
		alert(err);
	}
};

export default scanReceipt;
