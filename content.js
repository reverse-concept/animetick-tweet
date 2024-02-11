const tickets = document.getElementsByClassName("ticket_relative ticket_mouse");
for(let ticket of tickets) {
	let button = ticket.querySelector("button");
	if (button != null) {
		// ボタンが存在する(=放送済みの作品)のみイベントを設置
		button.addEventListener('click', buttonClick.bind(ticket), false);
	}
};

function buttonClick() {
	let title = this.getElementsByClassName("title")[0].querySelector("span").innerText;
	let episodeNumber = this.getElementsByClassName("sub_title")[0].getElementsByClassName("count")[0].innerText;
	let subTitle = this.getElementsByClassName("sub_title")[0].getElementsByClassName("sub_title")[0].innerText;
	if (subTitle) {
		subTitle = "「" + subTitle + "」";
	}
	const subTitleLink = this.getElementsByClassName("sub_title")[0].querySelector("a").getAttribute("href");
	const animeId = subTitleLink.match(/ticket\/(.*)\//)[1];

	const isChecked = this.querySelector("input").checked;
	const isWatched = this.querySelector("button").className.includes("enable");

	// anime個別ページからハッシュタグ情報とってくる
	fetch("/anime/" + animeId)
	.then((res) => res.text())
	.then((htmlText) => {
		let htmlDom = new DOMParser().parseFromString(htmlText, "text/html");
		let hashTag = htmlDom.getElementsByClassName("hashtag")[0];
		if (hashTag) {
			// 「#」をすべて「%23」にエスケープするため、splitしてからjoinしている
			hashTag = hashTag.innerText.split("#").join("%23");
		} else {
			hashTag = "";
		}

		const text = title + "%20" + episodeNumber.replace("#", "＃") + "%20" + subTitle + "を見ました"
			+ hashTag + "%0Ahttp://animetick.net" + subTitleLink;

	    if (isChecked && !isWatched) {
	    	// チェックが入っている かつ 視聴済みでない場合のみ実行
	    	window.open("https://twitter.com/intent/tweet?text=" + text);
	    }
	});
}
