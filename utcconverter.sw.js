function lpad(num) {
	return `0${num}`.slice(-2);
}

function add(title) {
	chrome.contextMenus.create({
		id: 'utcconverter',
		title,
		contexts: ['selection'],
	});
	console.log(1, chrome.runtime.lastError);
}

chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse) {
	const selection = msg.selection;
console.log(`"${selection}"`);

	if (selection && selection.match(/^\d{9,11}$/)) {
		const d = new Date(1000 * parseInt(selection));
		const date = `${d.getFullYear()}-${lpad(d.getMonth()+1)}-${lpad(d.getDate())}`;
		const time = `${lpad(d.getHours())}-${lpad(d.getMinutes())}-${lpad(d.getSeconds())}`;
		add(`UTC: ${date} ${time}`);
		sendResponse();
		return;
	}

	chrome.contextMenus.removeAll();
	sendResponse();
});
