import Tesseract from "tesseract.js";

const scanReceipt = async (image) => {
	try {
		// const exampleImage = "http://www.printablesample.com/wp-content/uploads/2017/03/Short-Grocery-Receipt-Format-3.jpg";

		Tesseract.recognize(
			"https://tesseract.projectnaptha.com/img/eng_bw.png",
			"eng",
			{ logger: (m) => console.log(m) }
		).then(({ data: { text } }) => {
			console.log(text);
		});

	} catch (err) {
		return err;
	}
};

export default scanReceipt;
