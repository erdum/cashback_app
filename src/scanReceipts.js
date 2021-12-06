import Tesseract from 'tesseract.js';

const scanReceipt = async (image) => {
	try {
		Tesseract.recognize(
			"./eng_bw.png",
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
