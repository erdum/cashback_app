// import Tesseract from "tesseract.js";

const scanReceipt = async (image, setOcrLoader) => {
	try {
		// const {
		// 	data: { text },
		// } = await Tesseract.recognize(image, "eng");
		// alert(text);
		// setOcrLoader(false);
		let jsonData = {
			file_url: "https://marketingresources.com/wp-content/uploads/2019/03/OCR_MASTER_Receipt-01.png",
			file_name: "OCR_MASTER_Receipt-01.png",
			categories: "Auto"
		};

		let USER_NAME = "erdumadnan";
		let API_KEY = "1dce7281a3649b4d9bc742926ab3d3a4";
		let CLIENT_ID = "vrfOeWTZOsxe66HHw6iVtD2NMeroxmI8mWOoL59";
		let ENVIRONMENT_URL = "https://api.veryfi.com/";
		let	url = "https://" + ENVIRONMENT_URL + "/api/v7/partner/documents/",

		let options = {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
				"CLIENT-ID": CLIENT_ID,
				AUTHORIZATION: `apikey ${USER_NAME}:${API_KEY}`,
			},
			body: JSON.stringify(jsonData),
		};

		const res = await fetch(url=url, options);
		const data = await res.json();
		console.log(data);
	} catch (err) {
		alert(err);
	}
};

export default scanReceipt;
