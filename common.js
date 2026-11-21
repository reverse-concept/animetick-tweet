function openTweet(text) {
	window.open("https://x.com/intent/post?text=" + encodeURIComponent(text));
}