import Tesseract from "tesseract.js";

const scanReceipt = async (image) => {
	try {
		// const exampleImage = "http://www.printablesample.com/wp-content/uploads/2017/03/Short-Grocery-Receipt-Format-3.jpg";

		let img = await fetch(image);
		img = await img.blob();

		Tesseract.recognize(img, function (result) {
			console.log(result);
			process.exit();
		});
	} catch (err) {
		return err;
	}
};

export default scanReceipt;
