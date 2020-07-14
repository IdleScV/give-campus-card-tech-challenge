window.addEventListener('DOMContentLoaded', (event) => {
	// console.log('index.js is loaded');
	loadData();
});

// Using a promise to return data for error handling
function get(url) {
	return new Promise((resolve, reject) => {
		const req = new XMLHttpRequest();
		req.open('GET', url);
		req.onload = () => (req.status === 200 ? resolve(req.response) : reject(Error(req.statusText)));
		req.onerror = (e) => reject(Error(`Network Error: ${e}`));
		req.send();
	});
}

function loadData() {
	get('./donors.json')
		.then((response) => {
			return responseParser(response);
		})
		.catch((error) => console.log(error));
}

// Because the json data returned has an error( keys aren't strings), we must change them to strings
function responseParser(string) {
	string = string.replace(/name/g, `"name"`).replace(/amount/g, `"amount"`).replace(/type/g, `"type"`);
	let data = JSON.parse(string);
	showData(data);
}

function showData(data) {
	let total = 0;
	let table = document.getElementById('donor-table');
	data.forEach((obj) => {
		let { name, amount, type } = obj;
		total = total + amount;
		let newRow = table.insertRow(1);
		// create individual items
		let nameItem = newRow.insertCell(0);
		nameItem.innerHTML = name;
		let amountItem = newRow.insertCell(1);
		amountItem.innerHTML = amount;
		let typeItem = newRow.insertCell(2);
		typeItem.innerHTML = type;
	});
	let totalField = document.getElementById('total');
	totalField.innerText = `$${total}`;
}
