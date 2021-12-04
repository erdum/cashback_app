import Tesseract from "tesseract.js";

const scanReceipt = async (image) => {
	try {
		// const exampleImage = "http://www.printablesample.com/wp-content/uploads/2017/03/Short-Grocery-Receipt-Format-3.jpg";

		const exampleImage = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR47YStHW7Um-OkFnq29ZpOW3cwrNpc90U5rg&usqp=CAU";

		let img = await fetch(exampleImage);
		img = img.blob();

		const { data: { text } } = await Tesseract.recognize(img, "eng");

		console.log(text);

	} catch (err) {
		return err;
	}
};

export default scanReceipt;
