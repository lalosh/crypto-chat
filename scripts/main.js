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

		this.$userMsg = $('.write-area > input'),
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
			})

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

		}));


		this.$loginInput.keyup((function(event){

			if(event.keyCode == 13){

				this.userName = this.$loginInput.val();
				this.$loginInput.val("");

				this.$loginButton.remove();
				this.$loginInput.remove();
				this.$loginLabel.remove();
				
				this.$loginForm.append('<h1 class="header-text"> Hello, '+this.userName+'</h1>')
			}
		}).bind(this));


		this.$userMsg.keyup((function(event){
			
			let a = document.querySelectorAll('.chat-box')[0];
			let b = document.querySelectorAll('.chat-box')[0];
			a.scrollTop = a.scrollHeight;
			b.scrollTop = b.scrollHeight;


			if(event.keyCode == 13){

				this.$sendButton.click();
				this.$userMsg.val("");
			}

		}).bind(this));

		this.$sendButton.click((function(){


			let a = document.querySelectorAll('.chat-box')[0];
			let b = document.querySelectorAll('.chat-box')[0];
			a.scrollTop = a.scrollHeight;
			b.scrollTop = b.scrollHeight;

			this.addDecryptedMsg("in",this.$userMsg.val().trim());
			this.$userMsg.val("");
		
		}).bind(this));

	},

	//state : in or out
	addDecryptedMsg: function addDecryptedMsg(state, msg){

		this.$decrypted.append('<p class="msg '+state+'">'+msg+'</p>');
	},

	//state : in or out
	addEncryptedMsg: function addEncryptedMsg(state, msg){

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

	run: function(){
		this.cacheDOM();
		this.bindButtons();
		this.bindEditKey();
	},
};

cryptoApp.run();

})