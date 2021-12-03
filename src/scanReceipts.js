// import Tesseract from "tesseract.js";

const scanReceipt = async (image) => {
	try {
		// http://www.printablesample.com/wp-content/uploads/2017/03/Short-Grocery-Receipt-Format-3.jpg

		let fileBLob = await fetch(image);
		fileBLob = await fileBLob.blob();

		let payload = new FormData();
		payload.append('file', fileBLob);

		const url = "https://app.nanonets.com/api/v2/OCR/Model/4616eef1-9ee9-4a4b-beba-88eba6135f89/LabelUrls/";

		const res = await fetch(url, {
			"method": "post",
			"mode": "cors",
			headers: {
				"Content-Type": "application/x-www-form-urlencoded",
				"Authorization": "Basic " + btoa("B3PwpQahecZhnnzG6ciTD-MxZJyiIlyd:"),
			},
			// body: "urls=http://www.printablesample.com/wp-content/uploads/2017/03/Short-Grocery-Receipt-Format-3.jpg"
			body: payload
		});

		let data = await res.json();
		data = data.result[0].prediction;

		let total = data.filter((row) => {
			return row.label === "Total_Amount";
		});

		total = total[0].ocr_text;

		alert(total);

	} catch (err) {
		alert(err);
	}
};

export default scanReceipt;
