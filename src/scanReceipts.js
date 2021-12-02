import Tesseract from "tesseract.js";

const scanReceipt = async (image) => {
	try {
		const { data: { text } } = await Tesseract.recognize(image, "eng");
		alert(text);
	} catch(err) {
		alert(err);
	}
};

export default scanReceipt;
