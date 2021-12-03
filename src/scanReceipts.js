// import Tesseract from "tesseract.js";

const scanReceipt = async (image) => {
	try {
		// const {
		// 	data: { text },
		// } = await Tesseract.recognize(image, "eng");
		// alert(text);

		// var data = new FormData();
		// data.append("file", image); // This is file object

		// http://www.printablesample.com/wp-content/uploads/2017/03/Short-Grocery-Receipt-Format-3.jpg
		// var xhr = new XMLHttpRequest();

		// xhr.addEventListener("readystatechange", function () {
		// 	if (this.readyState === this.DONE) {
		// 		console.log(this.responseText);
		// 	}
		// });

		// xhr.open(
		// 	"POST",
		// 	"https://app.nanonets.com/api/v2/OCR/Model/4616eef1-9ee9-4a4b-beba-88eba6135f89/LabelUrls/"
		// );
		// xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		// xhr.setRequestHeader(
		// 	"authorization",
		// 	"Basic " + btoa("B3PwpQahecZhnnzG6ciTD-MxZJyiIlyd:")
		// );

		// xhr.send(data);

		// const options = {
		// 	url: "https://app.nanonets.com/api/v2/OCR/Model/{{model_id}}/LabelUrls/",
		// 	body: querystring.stringify(form_data),
		// 	headers: {
		// 		Authorization:
		// 			"Basic " +
		// 			Buffer.from("B3PwpQahecZhnnzG6ciTD-MxZJyiIlyd" + ":").toString(
		// 				"base64"
		// 			),
		// 	},
		// };

		const form_data = {
			urls: [
				"https://nanonets.s3-us-west-2.amazonaws.com/test-images/test1.jpg",
			],
		};

		const url = "https://app.nanonets.com/api/v2/OCR/Model/{{b44f74de-9587-434b-b706-8d6c1f2b68bd}}/LabelUrls/";

		const res = await fetch(url, {
			"method": "post",
			headers: {
				"Content-Type": "application/x-www-form-urlencoded",
				"Authorization": "Basic " + btoa("B3PwpQahecZhnnzG6ciTD-MxZJyiIlyd:"),
			},
			body: JSON.stringify(form_data)
		});

		console.log(res);

	} catch (err) {
		alert(err);
	}
};

export default scanReceipt;
