const tickets = document.getElementsByClassName("ticket_relative ticket_mouse");
for(let ticket of tickets) {
	let button = ticket.querySelector("button");
	if (button != null) {
		// ボタンが存在する(=放送済みの作品)のみイベントを設置
		button.addEventListener('click', buttonClick.bind(ticket), false);
	}
};

function buttonClick() {
	window.open("https://twitter.com/intent/tweet");
}
