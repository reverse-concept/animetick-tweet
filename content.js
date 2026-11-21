const TICKET_SELECTOR = ".ticket_relative.ticket_mouse";
const boundTickets = new WeakSet();

function attach(ticket) {
	if (boundTickets.has(ticket)) return;
	const button = ticket.querySelector("button");
	if (!button) return; // ボタンが存在する(=放送済みの作品)のみイベントを設置
	boundTickets.add(ticket);
	button.addEventListener("click", () => buttonClick.call(ticket), false);
}

document.querySelectorAll(TICKET_SELECTOR).forEach(attach);

// 「もっと読み込む...」などで後から追加されたチケットにも対応
const ticketList = document.getElementById("ticket_list");
if (ticketList) {
	new MutationObserver((mutations) => {
		for (const mutation of mutations) {
			for (const node of mutation.addedNodes) {
				if (node.nodeType !== Node.ELEMENT_NODE) continue;
				if (node.matches(TICKET_SELECTOR)) attach(node);
				node.querySelectorAll(TICKET_SELECTOR).forEach(attach);
			}
		}
	}).observe(ticketList, { childList: true, subtree: true });
}

async function buttonClick() {
	const subTitleLink = this.querySelector(".sub_title > a")?.href;
	const animeId = subTitleLink?.match(/\/ticket\/(\d+)\//)?.[1];
	if (!animeId) return;

	const title = this.querySelector("div.title > span")?.innerText.trim() ?? "";
	const episodeNumber = this.querySelector(".sub_title .count")?.innerText.trim() ?? "";
	const subTitle = this.querySelector(".sub_title span.sub_title")?.innerText.trim() ?? "";

	const isChecked = this.querySelector("input")?.checked;
	const isWatched = this.querySelector("button").className.includes("enable");

	// anime個別ページからハッシュタグ情報をとってくる
	const hashTag = await fetchHashTag(animeId);

	const text = buildText({
		title,
		episode: episodeNumber.replace("#", "＃"),
		subTitle,
		hashTag,
		url: subTitleLink,
	});

	if (isChecked && !isWatched) {
		// チェックが入っている かつ 視聴済みでない場合のみ実行
		openTweet(text);
	}
}
