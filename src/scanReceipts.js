// import { createWorker } from "tesseract.js";


const scanReceipt = async (image) => {
	try {
		// http://www.printablesample.com/wp-content/uploads/2017/03/Short-Grocery-Receipt-Format-3.jpg

		const url = "https://app.nanonets.com/api/v2/OCR/Model/4616eef1-9ee9-4a4b-beba-88eba6135f89/LabelUrls/";

		const res = await fetch(url, {
			"method": "post",
			"mode": "cors",
			headers: {
				"Content-Type": "application/x-www-form-urlencoded",
				"Authorization": "Basic " + btoa("B3PwpQahecZhnnzG6ciTD-MxZJyiIlyd:"),
			},
			// body: "urls=http://www.printablesample.com/wp-content/uploads/2017/03/Short-Grocery-Receipt-Format-3.jpg"
			body: "urls=https://cdn3.vectorstock.com/i/1000x1000/65/32/paper-cash-sell-receipt-vector-23876532.jpg"
			// body: "urls=https://firebasestorage.googleapis.com/v0/b/loyality-program-e7185.appspot.com/o/rqqrf6qS3CVZEsyL7iScIpiYq7Q2.png?alt=media&token=d25e7216-8f65-448f-ab0a-bb7a1b39550f"
			// body: payload
			// body: "urls=" + image,
		});

		let data = await res.json();
		data = data.result[0].prediction;

		let total = data.filter((row) => {
			return row.label === "Total_Amount";
		});

		total = total[0].ocr_text;

		return(total);

	} catch (err) {
		return(err);
	}
};

export default scanReceipt;
