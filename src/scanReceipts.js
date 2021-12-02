import Tesseract from "tesseract.js";

const scanReceipt = async (image) => {
	try {
		const { data: { text } } = await Tesseract.recognize(image, "eng");
		return(text);
	} catch(err) {
		return(err);
	}
};

export default scanReceipt;
