import { createWorker } from "tesseract.js";
// import test from "./rec.jpg";

const scanReceipt = async (image, progress) => {
	try {
		const worker = createWorker({ logger: progress });
		let newImg = await fetch(image, { mode: "cors" });
		newImg = await newImg.blob();
		console.log(newImg);
		await worker.load();
		await worker.loadLanguage();
		await worker.initialize();
		const {
			data: { text },
		} = await worker.recognize(newImg);
		await worker.terminate();
		return text;
	} catch (err) {
		return err;
	}
};

export default scanReceipt;
