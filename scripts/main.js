$('document').ready(function(){

let cryptoApp = {
	cacheDOM: function cacheDOM(){
		
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
	bindButtons: function(){

		this.$persons.click(function(){
			
			$selected.removeClass('selected');
			$(this).addClass('selected');
			$selected = $(this);
			$chatWith = $(this).find('h1').get(0).innerText;
		});


		this.$loginButton.click(function(){

			userName = $loginInput.val();
			$loginInput.val("");


			this.$loginButton.remove();
			this.$loginInput.remove();
			this.$loginLabel.remove();

			$('.login').append('<h1 class="header-text"> Hello, '+this.userName+'</h1>')
		});

		this.$loginInput.keyup(function(event){

			if(event.keyCode == 13){

				this.userName = this.$loginInput.val();
				this.$loginInput.val("");

				this.$loginButton.remove();
				this.$loginInput.remove();
				this.$loginLabel.remove();
				
				this.$loginForm.append('<h1 class="header-text"> Hello, '+this.userName+'</h1>')
			}
		}).bind(this);


		this.$userMsg.keyup(function(event){

			if(event.keyCode == 13){

				this.$sendButton.click();
				this.$userMsg.val("");
			}
		});

		this.$sendButton.click(function(){

			this.addDecryptedMsg("out",this.$userMsg.val());
			this.$userMsg.val("");
		});

	},

	//state : in or out
	addDecryptedMsg: function addDecryptedMsg(state, msg){

		$decrypted.append('<p class="msg '+state+'">'+msg+'</p>');
	},

	//state : in or out
	addEncryptedMsg: function addEncryptedMsg(state, msg){

		$encrypted.append('<p class="msg '+state+'">'+msg+'</p>');
	},

	changeCryptoMethod: function changeCryptoMethod(newMethod){
		$cryptoMethod.innerText = newMethod;
	},

	changeAlgoUsed: function changeAlgoUsed(newAlgo){
		$algoUsed.innerText = newAlgo;
	},

	changeKeySize: function changeKeySize(newSize){
		$keySize.innerText = newSize;
	},

	run: function(){
		this.cacheDOM();
		this.bindButtons();
	},
};

cryptoApp.run();
	
	/*
let $decrypted, 
	$encrypted, 

	$loginForm, 
	$loginInput, 
	$loginButton, 
	$loginLabel, 

	$infoArray, 
	$cryptoMethod, 
	$algoUsed, 
	$keySize, 

	$userMsg, 
	$sendButton, 

	$selected, 
	$persons,

	$chatWith,
	userName;

function cacheDOM(){
	$decrypted = $('.decrypted'),
	$encrypted = $('.encrypted'),

	$loginForm = $('.login'),
	$loginInput = $loginForm.find('input'),
	$loginButton = $loginForm.find('button'),
	$loginLabel = $loginForm.find('label'),

	$infoArray = $('.one-info').find('h1'),
	$cryptoMethod = $infoArray.get(0),
	$algoUsed = $infoArray.get(1),
	$keySize = $infoArray.get(2),

	$userMsg = $('.write-area > input'),
	$sendButton = $('.write-area > button'),

	$selected = $('.selected'),
	$persons = $('.person'),

	$chatWith,
	userName;
}

cacheDOM();

$persons.click(function(){
	
	$selected.removeClass('selected');
	$(this).addClass('selected');
	$selected = $(this);
	$chatWith = $(this).find('h1').get(0).innerText;
})


$loginButton.click(function(){

	userName = $loginInput.val();
	$loginInput.val("");

	$loginButton.remove();
	$loginInput.remove();
	$loginLabel.remove();

	$('.login').append('<h1 class="header-text"> Hello, '+userName+'</h1>')
})

$loginInput.keyup(function(event){

	if(event.keyCode == 13){

		userName = $loginInput.val();
		$loginInput.val("");

		$loginButton.remove();
		$loginInput.remove();
		$loginLabel.remove();
		
		$loginForm.append('<h1 class="header-text"> Hello, '+userName+'</h1>')
	}
})


$userMsg.keyup(function(event){

	if(event.keyCode == 13){

		$sendButton.click();
		$userMsg.val("");
	}
})

$sendButton.click(function(){

	addDecryptedMsg("out",$userMsg.val());
	$userMsg.val("");
})


//state : in or out
function addDecryptedMsg(state, msg){

	$decrypted.append('<p class="msg '+state+'">'+msg+'</p>');
}

//state : in or out
function addEncryptedMsg(state, msg){

	$encrypted.append('<p class="msg '+state+'">'+msg+'</p>');
}

function changeCryptoMethod(newMethod){
	$cryptoMethod.innerText = newMethod;
}

function changeAlgoUsed(newAlgo){
	$algoUsed.innerText = newAlgo;
}

function changeKeySize(newSize){
	$keySize.innerText = newSize;
}

*/

})