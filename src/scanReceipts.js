import Tesseract from "tesseract.js";
import test from "./rec.jpg";

const blobToBase64 = (blob) => {
	const reader = new FileReader();
	reader.readAsDataURL(blob);
	return new Promise((resolve) => {
		reader.onloadend = () => {
			resolve(reader.result);
		};
	});
};

const scanReceipt = async (image, progress) => {
	try {
		let newImg = await fetch(image, { mode: "cors" });
		newImg = await newImg.blob();
		const img64 = await blobToBase64(newImg);
		console.log(newImg);
		console.log(test);
		console.log(img64);
		const {
			data: { text },
		} = await Tesseract.recognize(test, "eng", { logger: progress });
		return text;
	} catch (err) {
		return err;
	}
};

export default scanReceipt;
