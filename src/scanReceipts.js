import Tesseract from "tesseract.js";
import test from "./rec.jpg";

const scanReceipt = async (image, progress) => {
	try {
		let newImg = await fetch(image, { mode: "cors" });
		newImg = await newImg.blob();
		newImg = URL.createObjectURL(newImg);
		console.log(newImg);
		console.log(test);
		const {
			data: { text },
		} = await Tesseract.recognize(newImg, "eng", { logger: progress });
		return text;
	} catch (err) {
		return err;
	}
};

export default scanReceipt;
