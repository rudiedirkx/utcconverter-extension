document.addEventListener('selectionchange', function() {
	var selection = window.getSelection().toString().trim();
	if (chrome.runtime) {
		chrome.runtime.sendMessage({selection});
	}
	else {
		console.log('selectionchange', location.href);
	}
});
