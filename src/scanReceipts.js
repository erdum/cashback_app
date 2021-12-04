import Tesseract from "tesseract.js";

const scanReceipt = async (image) => {
	try {
		// const exampleImage = "http://www.printablesample.com/wp-content/uploads/2017/03/Short-Grocery-Receipt-Format-3.jpg";
		
		const exampleImage = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR47YStHW7Um-OkFnq29ZpOW3cwrNpc90U5rg&usqp=CAU";

		const worker = Tesseract.createWorker();
		await worker.load();
		await worker.loadLanguage("eng");
		await worker.initialize("eng");

		let result = await worker.detect(exampleImage);
		console.log(result.data);

		result = await worker.recognize(exampleImage);
		console.log(result.data);

		await worker.terminate();
	} catch (err) {
		return err;
	}
};

export default scanReceipt;
