const title = document.querySelector(".anime-info-bottom h2")?.innerText.trim() ?? "";
const hashTag = extractHashTag(document);

const episodes = document.getElementsByClassName("episode-block");
for(let episode of episodes) {
	let button = episode.getElementsByClassName("episode_watch button")[0];

	if (button != null) {
		// ボタンが存在する(=放送済みの作品)のみイベントを設置
		button.addEventListener('click', buttonClick.bind(episode), false);
	}
};

function buttonClick() {
	const link = this.querySelector(".sub_title a");
	if (!link) return;
	const subTitleLink = link.href;

	// 個別ページはリンクのテキストに話数が含まれている(例: "#7 サブタイトル")
	const [, episode, subTitle] = link.innerText.trim().replace("#", "＃").match(/^(\S+)\s*(.*)$/) ?? [];

	const text = buildText({ title, episode, subTitle, hashTag, url: subTitleLink });

	const isChecked = this.querySelector("input").checked;
	const isWatched = this.getElementsByClassName("episode_watch button")[0].className.includes("enable");
	if (isChecked && !isWatched) {
		// チェックが入っている かつ 視聴済みでない場合のみ実行
		openTweet(text);
	}
}

