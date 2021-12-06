import Tesseract from 'tesseract.js';
import img from "./rec.jpg";

const scanReceipt = async (image) => {
	try {
		console.log(img);
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
