const title = document.getElementsByClassName("anime-info-bottom")[0].querySelector("h2").innerText;
let hashTag = document.getElementsByClassName("hashtag")[0];
if (hashTag) {
	// 「#」をすべて「%23」にエスケープするため、splitしてからjoinしている
	hashTag = hashTag.innerText.split("#").join("%23");
} else {
	hashTag = "";
}

const episodes = document.getElementsByClassName("episode-block");
for(let episode of episodes) {
	let button = episode.getElementsByClassName("episode_watch button")[0];

	if (button != null) {
		// ボタンが存在する(=放送済みの作品)のみイベントを設置
		button.addEventListener('click', buttonClick.bind(episode), false);
	}
};

function buttonClick() {
	let subTitle = this.getElementsByClassName("sub_title")[0].querySelector("a").innerText;
	if (subTitle) {
		subTitle = subTitle.replace("#", "＃").replace(" ", " 「") + "」";
	}
	const subTitleLink = this.getElementsByClassName("sub_title")[0].querySelector("a").getAttribute("href");

	const text = title + "%20" + subTitle + "を見ました%20" + hashTag + "%0Ahttp://animetick.net" + subTitleLink;

	const isChecked = this.querySelector("input").checked;
	const isWatched = this.getElementsByClassName("episode_watch button")[0].className.includes("enable");
	if (isChecked && !isWatched) {
		// チェックが入っている かつ 視聴済みでない場合のみ実行
		window.open("https://twitter.com/intent/tweet?text=" + text);
	}
}

