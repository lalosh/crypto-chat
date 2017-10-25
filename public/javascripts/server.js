let socket = io();

$('document').ready(function(){

let scrolling = document.querySelectorAll('.chat-box')[0];
let $encrypted = $('.encrypted');

function addEncryptedMsg(state, msg){

		let allP = $('.encrypted p');
		let lastP = allP.get(allP.length-1).innerText;
		if(lastP == msg) return;

		$encrypted.append('<p class="msg '+state+'">'+msg+'</p>');
}

socket.on('toServer',function(msg, senderName){
	console.log(msg,senderName);
	addEncryptedMsg('in',senderName + " : " + msg);
	scrolling.scrollTop = scrolling.scrollHeight;

})


})