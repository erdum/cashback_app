import { createWorker } from "tesseract.js";

const scanReceipt = async (image, progress) => {
	try {
		console.log(image);
		await worker.load();
		await worker.loadLanguage();
		await worker.initialize();
		const {
			data: { text },
		} = await worker.recognize(image);
		await worker.terminate();
		return text.split("\n");
	} catch (err) {
		return err;
	}
};

export default scanReceipt;
