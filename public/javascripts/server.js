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



var enc = new TextDecoder();


socket.on('recvFilesServer',function(filesArray){
	
  for (let i = 0; i < filesArray.length; i++) {
  
    let arr = new Uint8Array(filesArray[i]);
    console.log(enc.decode(arr));
    let msg = enc.decode(arr);
	addEncryptedMsg('in', msg);
	scrolling.scrollTop = scrolling.scrollHeight;
  }

})
})