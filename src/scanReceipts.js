import Tesseract from "tesseract.js";

const scanReceipt = async (image) => {
	try {
		// const exampleImage = "http://www.printablesample.com/wp-content/uploads/2017/03/Short-Grocery-Receipt-Format-3.jpg";

		Tesseract.recognize(image, function (result) {
			console.log(result);
		});
	} catch (err) {
		return err;
	}
};

export default scanReceipt;
