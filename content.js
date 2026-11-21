const tickets = document.getElementsByClassName("ticket_relative ticket_mouse");
for(let ticket of tickets) {
	let button = ticket.querySelector("button");
	if (button != null) {
		// ボタンが存在する(=放送済みの作品)のみイベントを設置
		button.addEventListener('click', buttonClick.bind(ticket), false);
	}
};

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
