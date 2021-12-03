// import Tesseract from "tesseract.js";

const scanReceipt = async (image) => {
	try {
		// http://www.printablesample.com/wp-content/uploads/2017/03/Short-Grocery-Receipt-Format-3.jpg

		const url = "https://app.nanonets.com/api/v2/OCR/Model/4616eef1-9ee9-4a4b-beba-88eba6135f89/LabelUrls/";

		const res = await fetch(url, {
			"method": "post",
			headers: {
				"Content-Type": "application/x-www-form-urlencoded",
				"Authorization": "Basic " + btoa("B3PwpQahecZhnnzG6ciTD-MxZJyiIlyd:"),
			},
			body: "urls=http://www.printablesample.com/wp-content/uploads/2017/03/Short-Grocery-Receipt-Format-3.jpg"
		});

		const data = await res.json();

		console.log(data.result[0].prediction);

	} catch (err) {
		alert(err);
	}
};

export default scanReceipt;
