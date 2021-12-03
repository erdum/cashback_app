// import Tesseract from "tesseract.js";

const scanReceipt = async (image, setOcrLoader) => {
	try {
		// const {
		// 	data: { text },
		// } = await Tesseract.recognize(image, "eng");
		// alert(text);
		// setOcrLoader(false);
		let jsonData = {
			file_url: "https://media.istockphoto.com/vectors/realistic-paper-shop-receipt-vector-cashier-bill-on-white-background-vector-id889405434?k=20&m=889405434&s=612x612&w=0&h=rjD4g1QamuHPz9wxmw6tfiA88L-qbSwI_-8bMl748uw=",
			file_name: "test.jpg",
			categories: "Auto"
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
		alert(JSON.stringify(res));
	} catch (err) {
		alert(err);
	}
};

export default scanReceipt;
