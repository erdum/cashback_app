import Tesseract from 'tesseract.js';
import img from "./eng_bw.png";

const scanReceipt = async (image) => {
	try {
		Tesseract.recognize(
			img,
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
