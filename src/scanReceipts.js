import Tesseract from "tesseract.js";

const scanReceipt = async (image, progress) => {
	try {
		let newImg = await fetch(image, { mode: "cors" });
		newImg = await newImg.blob();
		newImg = URL.createObjectURL(newImg);
		const {
			data: { text },
		} = await Tesseract.recognize(newImg, "eng", { logger: progress });
	} catch (err) {
		return err;
	}
};

export default scanReceipt;
