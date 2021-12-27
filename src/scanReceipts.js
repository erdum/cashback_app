import { createWorker } from "tesseract.js";

const scanReceipt = async (image, progress, regExp) => {
	try {
		const worker = createWorker({ logger: progress });
		await worker.load();
		await worker.loadLanguage();
		await worker.initialize();
		const {
			data: { text },
		} = await worker.recognize(image);
		await worker.terminate();
		const lines = text.split("\n");
		let resultLine = lines.filter((line) => {
			return regExp.test(line);
		})[0];
		return resultLine.replace(/[^.\d]/gi, '');
	} catch (err) {
		return err;
	}
};

export default scanReceipt;
