import Tesseract from "tesseract.js";

const scanReceipt = async (image, progress) => {
	try {
		console.log(image);
		let newImg = await fetch(image, { mode: "cors" });
		newImg = await newImg.blob();
		newImg = URL.createObjectURL(newImg);
		console.log(newImg);
		const {
			data: { text },
		} = await Tesseract.recognize(newImg, "eng", { logger: progress });
		return text;
	} catch (err) {
		return err;
	}
};

export default scanReceipt;
