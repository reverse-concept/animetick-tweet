function openTweet(text) {
	window.open("https://x.com/intent/post?text=" + encodeURIComponent(text));
}

const TWEET_SEPARATOR = "　"; // 「を見ました」とハッシュタグの間

function buildText({ title, episode, subTitle, hashTag, url }) {
	const head = [title, episode, subTitle ? "「" + subTitle + "」" : ""]
		.filter(Boolean)
		.join(" ");
	// サブタイトルがない場合、話数(＃7)の直後に「を見ました」が続くと
	// Xでハッシュタグ扱いされるため、半角スペースを空ける
	const watched = subTitle ? "を見ました" : " を見ました";
	const tag = hashTag ? TWEET_SEPARATOR + hashTag : "";
	return head + watched + tag + "\n" + url;
}

const hashTagCache = new Map();

function extractHashTag(root) {
	return root.querySelector(".hashtag")?.textContent.trim() ?? "";
}

async function fetchHashTag(animeId) {
	if (hashTagCache.has(animeId)) return hashTagCache.get(animeId);
	try {
		const res = await fetch("/anime/" + animeId);
		if (!res.ok) return "";
		const doc = new DOMParser().parseFromString(await res.text(), "text/html");
		const hashTag = extractHashTag(doc);
		hashTagCache.set(animeId, hashTag);
		return hashTag;
	} catch (e) {
		console.error("animetick-tweet: ハッシュタグの取得に失敗しました", e);
		return "";
	}
}