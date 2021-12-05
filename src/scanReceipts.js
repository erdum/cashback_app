import { createWorker } from "tesseract.js";

const scanReceipt = async (image) => {
	try {
		const worker = createWorker({
			logger: (m) => console.log(m),
		});

		(async () => {
			await worker.load();
			await worker.loadLanguage("eng");
			await worker.initialize("eng");
			const {
				data: { text },
			} = await worker.recognize(
				"https://tesseract.projectnaptha.com/img/eng_bw.png"
			);
			console.log(text);
			await worker.terminate();
		})();
	} catch (err) {
		return err;
	}
};

export default scanReceipt;
