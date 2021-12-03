// import Tesseract from "tesseract.js";

const scanReceipt = async (image) => {
	try {
		// const {
		// 	data: { text },
		// } = await Tesseract.recognize(image, "eng");
		// alert(text);

		// var data = new FormData();
		// data.append("file", image); // This is file object

		var xhr = new XMLHttpRequest();

		xhr.addEventListener("readystatechange", function () {
			if (this.readyState === this.DONE) {
				alert(this.responseText);
			}
		});

		xhr.open(
			"POST",
			"https://app.nanonets.com/api/v2/OCR/Model/4616eef1-9ee9-4a4b-beba-88eba6135f89/LabelFile/"
		);
		xhr.setRequestHeader(
			"authorization",
			"Basic " + btoa("B3PwpQahecZhnnzG6ciTD-MxZJyiIlyd:")
		);

		xhr.send("urls=http://www.printablesample.com/wp-content/uploads/2017/03/Short-Grocery-Receipt-Format-3.jpg");
	} catch (err) {
		alert(err);
	}
};

export default scanReceipt;
