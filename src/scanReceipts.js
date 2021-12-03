import Tesseract from "tesseract.js";

const scanReceipt = async (image, setOcrLoader) => {
	try {
		const {
			data: { text },
		} = await Tesseract.recognize(image, "eng");
		alert(text);
		setOcrLoader(false);
		alert(text);
	} catch (err) {
		alert(err);
	}
};

export default scanReceipt;
