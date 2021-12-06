import { createWorker } from "tesseract.js";
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
		const worker = createWorker({ logger: progress });
		let newImg = await fetch(image, { mode: "cors" });
		newImg = await newImg.blob();
		const img64 = await blobToBase64(newImg);
		console.log(test);
		console.log(newImg);
		console.log(img64);
		await worker.load();
		await worker.loadLanguage();
		await worker.initialize();
		const {
			data: { text },
		} = await worker.recognize(test);
		await worker.terminate();
		return text;
	} catch (err) {
		return err;
	}
};

export default scanReceipt;
