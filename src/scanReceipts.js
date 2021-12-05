import Tesseract from "tesseract.js";

const scanReceipt = async (image) => {
	try {
		const worker = new Tesseract.TesseractWorker();
		worker
			.recognize(file, "eng")
			.progress(function (packet) {
				console.info(packet);
				progressUpdate(packet);
			})
			.then(function (data) {
				console.log(data);
				progressUpdate({ status: "done", data: data });
			});
	} catch (err) {
		return err;
	}
};

export default scanReceipt;
