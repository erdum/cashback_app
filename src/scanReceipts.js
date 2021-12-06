import Tesseract from 'tesseract.js';
// import img from "./rec.jpg";

const scanReceipt = async (image) => {
	try {

		let newImg = await fetch(image, {"mode": "cors"});
		newImg = await newImg.blob();
		newImg = URL.createObjectURL(newImg);
		console.log(newImg);

		Tesseract.recognize(
			newImg,
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
