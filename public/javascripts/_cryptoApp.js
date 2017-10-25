"use strict";

const crypto = require('crypto');
let socket = io();

$('document').ready(function(){

let cryptoApp = {
	
	cacheDOM: function cacheDOM(){
		
		this.$keyInfo = $('.key-info');
		this.$secretKey = $('.key-info h1').get(0);
		this.$editKeyButton = $('.key-info button');

		this.$decrypted = $('.decrypted'),
		this.$encrypted = $('.encrypted'),

		this.$loginForm = $('.login'),
		this.$loginInput = this.$loginForm.find('input'),
		this.$loginButton = this.$loginForm.find('button'),
		this.$loginLabel = this.$loginForm.find('label'),

		this.$infoArray = $('.one-info').find('h1'),
		this.$cryptoMethod = this.$infoArray.get(0),
		this.$algoUsed = this.$infoArray.get(1),
		this.$keySize = this.$infoArray.get(2),

		this.$userMsgInput = $('.write-area > input'),
		this.$sendButton = $('.write-area > button'),

		this.$selected = $('.selected'),
		this.$persons = $('.person'),

		this.$chatWith,
		this.userName;

	},

	bindEditKey: function(){

		this.$editKeyButton.click(function cool(){

			$(this).remove();

			cryptoApp.$keyInfo.append('<input type="text" placeholder="type here"></input>')
			cryptoApp.$keyInfo.append('<button>Save</button>')

			$('.key-info input').focus();


			$('.key-info button').click(function(){

				if(!($('.key-info input').val() == ''))
					cryptoApp.$secretKey.innerText = $('.key-info input').val();

				$(this).remove();
				$('.key-info input').remove();

				cryptoApp.$keyInfo.append('<button>Edit</button>');
				cryptoApp.$editKeyButton = $('.key-info button');
				cryptoApp.bindEditKey();
			});

			$('.key-info input').keyup(function(event){

				if(event.keyCode == 13){
				
					if(!($('.key-info input').val() == ''))
						cryptoApp.$secretKey.innerText = $('.key-info input').val();

					$('.key-info button').remove();
					$(this).remove();
					
					cryptoApp.$keyInfo.append('<button>Edit</button>');
					cryptoApp.$editKeyButton = $('.key-info button');
					cryptoApp.bindEditKey();
				}
			})
			
		});
	},


	bindButtons: function(){

		this.$persons.click((function(){
			
			cryptoApp.$selected.removeClass('selected');
			$(this).addClass('selected');
			cryptoApp.$selected = $(this);
			cryptoApp.$chatWith = $(this).find('h1').get(0).innerText;
		}));


		this.$loginButton.click((function(){
				
				cryptoApp.onlyOnce = false;
				cryptoApp.userName = cryptoApp.$loginInput.val();
				cryptoApp.$loginInput.val("");


				cryptoApp.$loginButton.remove();
				cryptoApp.$loginInput.remove();
				cryptoApp.$loginLabel.remove();

				cryptoApp.$loginForm.append('<h1 class="header-text"> Hello, '+cryptoApp.userName+'</h1>');
				this.addPerson(this.userName);
				socket.emit('newUser', this.userName);
		}));


		this.$loginInput.keyup((function(event){

			if(event.keyCode == 13){

				this.userName = this.$loginInput.val();
				this.$loginInput.val("");

				this.$loginButton.remove();
				this.$loginInput.remove();
				this.$loginLabel.remove();
				
				this.$loginForm.append('<h1 class="header-text"> Hello, '+this.userName+'</h1>')
				this.addPerson(this.userName);
				socket.emit('newUser', this.userName);

			}
		}).bind(this));


		this.$userMsgInput.keyup((function(event){
			
			let a = document.querySelectorAll('.chat-box')[0];
			let b = document.querySelectorAll('.chat-box')[1];
			a.scrollTop = a.scrollHeight;
			b.scrollTop = b.scrollHeight;


			if(event.keyCode == 13){

				this.$sendButton.click();
				this.$userMsgInput.val("");
			}

		}).bind(this));


		this.$sendButton.click((function(){

			let a = document.querySelectorAll('.chat-box')[0];
			let b = document.querySelectorAll('.chat-box')[1];
			a.scrollTop = a.scrollHeight;
			b.scrollTop = b.scrollHeight;

			let cryptoInstance = new cryptoAES();
			cryptoInstance.changePassword(this.$secretKey.innerText);
			let encryptedText = cryptoInstance.encrypt(this.$userMsgInput.val().trim());

			this.addDecryptedMsg("out",this.$userMsgInput.val().trim());
			this.addEncryptedMsg("out",encryptedText);
			this.$userMsgInput.val("");

			//send encryptedText via socketio
			socket.on('recNewMsg',function(msg, senderName){
				cryptoApp.addEncryptedMsg("in",msg,senderName);
				console.log(msg, senderName);
			});
	
			socket.emit('newMsg', encryptedText, cryptoApp.userName);
			

		}).bind(this));

	},

	//state : in or out
	addDecryptedMsg: function addDecryptedMsg(state, msg){


		let allP = $('.decrypted p');
		let lastP = allP.get(allP.length-1).innerText;
		if(lastP == msg) return;

		this.$decrypted.append('<p class="msg '+state+'">'+msg+'</p>');
	},

	//state : in or out
	addEncryptedMsg: function addEncryptedMsg(state, msg, senderName){

		let allP = $('.encrypted p');
		let lastP = allP.get(allP.length-1).innerText;
		if(lastP == msg) return;


		if(state == "in"){
			let cryptoInstance = new cryptoAES();
			cryptoInstance.changePassword(this.$secretKey.innerText);
			let decryptedText = cryptoInstance.decrypt(msg);
			this.addDecryptedMsg("in", senderName + " : "+ decryptedText);
		}
		this.$encrypted.append('<p class="msg '+state+'">'+msg+'</p>');
	},

	changeCryptoMethod: function changeCryptoMethod(newMethod){
		this.$cryptoMethod.innerText = newMethod;
	},

	changeAlgoUsed: function changeAlgoUsed(newAlgo){
		this.$algoUsed.innerText = newAlgo;
	},

	changeKeySize: function changeKeySize(newSize){
		this.$keySize.innerText = newSize;
	},

	addPerson: function addPerson(name){
		
		let userNameArray = $('.name');
		for (let i = 0; i < userNameArray.length; i++) {
			if(userNameArray[i].innerText == name)
				return;
		}
		$('.online-people').append('<div class="person"><h1 class="name">'+name+'</h1></div>');
			
		let a = $($('.person').last()[0]);

		a.click((function(){
			
			cryptoApp.$selected.removeClass('selected');
			$(this).addClass('selected');
			cryptoApp.$selected = $(this);
			cryptoApp.$chatWith = $(this).find('h1').get(0).innerText;
		}));


	},

	run: function(){
		this.cacheDOM();
		this.bindButtons();
		this.bindEditKey();
			

		socket.on('requestUserList',function(userNameArray){
			// console.log(userName);
			userNameArray.map(function(userName){
				cryptoApp.addPerson(userName);
				console.log(userName);				
			})
		});

		socket.on('newUserAdded',function(name){
			cryptoApp.addPerson(name);
		})
	},
};

cryptoApp.run();


});





//cryptoAES module
function cryptoAES(){

	let password = "default password"; 

	let publicAPI = {
		changePassword: changePassword,
		getPassword: getPassword,
		encrypt: encrypt,
		decrypt: decrypt,
	}

	function encrypt(text){

		let cipher = crypto.createCipher('aes192',password);
		let encrypted = cipher.update(text, 'utf8', 'hex');
		encrypted += cipher.final('hex');
		return encrypted;
	}

	function decrypt(text){
		try{
			let decipher = crypto.createDecipher('aes192', password);
			let decrypted = decipher.update(text,'hex','utf8');
			decrypted += decipher.final('utf8');
			return decrypted;
		}
		catch(error){
			// throw error.toString();
			return "bad decrypt: your key failed to decrypt the message"
		}
	}
	function changePassword(newPassword){
		password = newPassword;
	}

	function getPassword(){
		return password;
	}

	return publicAPI;
}

