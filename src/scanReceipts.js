import Tesseract from "tesseract.js";

const scanReceipt = async (image) => {
	try {
		const { data: { text } } = await Tesseract.recognize(image, "eng");
		console.log(text);
	} catch(err) {
		alert(err);
	}
};

export default scanReceipt;
