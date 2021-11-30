import { createWorker } from "tesseract.js";

const scanReceipt = async (image) => {
	// const apiBase = "https://api.ocr.space/parse/image";
	// const apiBase = "https://api.cloudmersive.com/ocr/receipts/photo/to/csv";

	// const formdata = new FormData();
	// formdata.append("base64Image", image);
	// formdata.append("imageFile", "https://www.inogic.com/blog/wp-content/uploads/2020/09/Receipt-Processor-AI-Builder-in-Canvas-App-9.png");

	// const requestOptions = {
	// 	method: "POST",
	// 	headers: {
	// 		"Apikey": "5b8c7cfbc188957",
	// 		// "Apikey": "628139e5-482e-46c9-8734-7293d6e2a500"
	// 	},
	// 	body: formdata,
	// 	redirect: "follow",
	// };

	// const res = await fetch(apiBase, requestOptions);
	// const data = await res.text();
	// setPoints(String(Number(points) + 100));
	// alert(data);

	const worker = createWorker();
		// logger: (m) => console.log(m),

	await worker.load();
	await worker.loadLanguage("eng");
	await worker.initialize("eng");
	const {
		data: { text },
	} = await worker.recognize(
		"https://tesseract.projectnaptha.com/img/eng_bw.png"
	);
	console.log(data);
	await worker.terminate();
};

export default scanReceipt;
