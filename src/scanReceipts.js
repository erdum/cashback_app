const scanReceipt = async (image) => {
	const apiBase = "https://api.ocr.space/parse/image";
	// const apiBase = "https://api.cloudmersive.com/ocr/receipts/photo/to/csv";

	const formdata = new FormData();
	formdata.append("base64Image", image);
	// formdata.append("imageFile", "https://www.inogic.com/blog/wp-content/uploads/2020/09/Receipt-Processor-AI-Builder-in-Canvas-App-9.png");

	const requestOptions = {
		method: "POST",
		headers: {
			"Apikey": "5b8c7cfbc188957",
			// "Apikey": "628139e5-482e-46c9-8734-7293d6e2a500"
		},
		body: formdata,
		redirect: "follow",
	};

	const res = await fetch(apiBase, requestOptions);
	let data = await res.json();
	data = data.ParsedResults[0].ParsedText;
	alert(data);
};

export default scanReceipt;
