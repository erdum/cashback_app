import { createWorker } from "tesseract.js";

const scanReceipt = async (image) => {
	try {
		// const exampleImage = "http://www.printablesample.com/wp-content/uploads/2017/03/Short-Grocery-Receipt-Format-3.jpg";

		let img = await fetch(image);
		img = img.blob();
		img = URL.createObjectURL(img);

		let worker = createWorker({
			logger: m => console.log(m)
		});
		await worker.load();
		await worker.loadlanguage("eng");
		await worker.initialize("eng");
		const { data: { text } } = await worker.recognize(img);
		await worker.terminate();
		console.log(text);

	} catch (err) {
		return err;
	}
};

export default scanReceipt;
