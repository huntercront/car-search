document.addEventListener("DOMContentLoaded", function(event) { 
  document.body.classList.remove('loadind')


var contactsUsButton = document.querySelectorAll('.cta-button,.card-button');
var contactsUs = document.querySelector('.contacts-modal');
var closeModal = document.querySelector('.close-modal');
var mobileButton = document.querySelector('.ham')
var headerOverlay = document.querySelector('.heder-overlay');
var mobileMenu = document.querySelector('.header .nav-block')

mobileButton.addEventListener('click',function(e){
	if(this.classList.contains('active')){
		document.body.style.overflow = 'auto';
		document.body.style.paddingRight = '0px';
		this.classList.remove('active');
		headerOverlay.classList.remove('overlay-active')
		mobileMenu.classList.remove('active');
	}else{
		this.classList.add('active');
		document.body.style.overflow = 'hidden';
		document.body.style.paddingRight = getScrollbarWidth()+'px';
		headerOverlay.classList.add('overlay-active')
		mobileMenu.classList.add('active');
	}
})
headerOverlay.addEventListener('click',function(e){
	if(mobileButton.classList.contains('active')){
		document.body.style.overflow = 'auto';
		document.body.style.paddingRight = '0px';
		mobileButton.classList.remove('active');
		this.classList.remove('overlay-active')
		mobileMenu.classList.remove('active');
	}
})


function getScrollbarWidth() {
  const outer = document.createElement('div');
  outer.style.visibility = 'hidden';
  outer.style.overflow = 'scroll';
  outer.style.msOverflowStyle = 'scrollbar'; 
  document.body.appendChild(outer);
  const inner = document.createElement('div');
  outer.appendChild(inner);
  const scrollbarWidth = (outer.offsetWidth - inner.offsetWidth);
  outer.parentNode.removeChild(outer);
  return scrollbarWidth;
}

function hideModal(){
	if(contactsUs.classList.contains('visible')){
	contactsUs.classList.remove('visible');
	
	if(document.body.clientHeight > window.innerHeight){
		setTimeout(function() {
		document.body.style.overflow = 'auto';
		document.body.style.paddingRight = 0+'px';
		document.querySelector('.header .container').style.transform = 'translateX(0px)';
	}, 150)
	}

}
}



if(contactsUsButton){
	for(var i = 0; i < contactsUsButton.length; i++) {
		contactsUsButton[i].addEventListener('click', function(e) {
			if (document.documentElement.clientWidth > 1400) {
			document.querySelector('.header .container').style.transform = 'translateX(-'+ getScrollbarWidth()/2 +'px)';
			}
			for(var i = 0; i < contactsUsButton.length; i++) {
				contactsUs.classList.add('visible');

				if(document.body.clientHeight > window.innerHeight){
					
					document.body.style.overflow = 'hidden';
					document.body.style.paddingRight = getScrollbarWidth()+'px';
				}
				setTimeout(function () {
				document.getElementById('name').focus();
			}, 50);
			}
			})
		}
	}


	closeModal.addEventListener('click', function(e) {
		hideModal();
	})

	document.onkeydown = function(evt) {
		evt = evt || window.event;
		if (evt.keyCode == 27) {
			hideModal();
		}
	};


var formInputs = document.querySelectorAll('.contacts-form input,.contacts-form textarea')
for (var i = 0; i < formInputs.length; i++) {
	formInputs[i].addEventListener('input', function(){
		this.setAttribute('value', this.value);
	})
}



	document.querySelector(".contacts-form").addEventListener("submit", function(e){
		event.preventDefault();
    event.stopPropagation();

		var params = {
			name : document.getElementById("name").value,
			phone : document.getElementById("phone").value,
			message : document.getElementById("message").value
		};
			var url = "../php/mail.php?data=" + encodeURIComponent(JSON.stringify(params));;

			console.log(url)
			var postData= 'form-data' + JSON.stringify(params)
			xhttp = new XMLHttpRequest();
			xhttp.open("get", url, true);
			xhttp.setRequestHeader('Content-Type', 'application/json');
			xhttp.onload = function() {
					if (xhttp.readyState == 4 && xhttp.status === 200 && xhttp.responseText) {
							var json = JSON.parse(xhttp.responseText);
							console.log(json.name + ", " + json.phone + ", " + json.message);

					}
					else if (xhttp.status !== 200 || !xhttp.responseText) {
							//display error message

					}
			};
			xhttp.send();


	});

	(function() {
		scrollTo();
	})();
	
	function scrollTo() {
		const links = document.querySelectorAll('[data-anchor]');
		links.forEach(each => (each.onclick = scrollAnchors));
	}
	
	function scrollAnchors(e, respond = null) {
		if(mobileButton.classList.contains('active')){
			document.body.style.overflow = 'auto';
			document.body.style.paddingRight = '0px';
			mobileButton.classList.remove('active');
			headerOverlay.classList.remove('overlay-active')
			mobileMenu.classList.remove('active');
		}
		const distanceToTop = el => Math.floor(el.getBoundingClientRect().top);
		e.preventDefault();
		var targetID = (respond) ? respond.getAttribute('href') : this.getAttribute('href');
		const targetAnchor = document.querySelector(targetID);
		if (!targetAnchor) return;
		const originalTop = (distanceToTop(targetAnchor)) - document.querySelector('header').offsetHeight;
		window.scrollBy({ top: originalTop, left: 0, behavior: 'smooth' });
		const checkIfDone = setInterval(function() {
			const atBottom = window.innerHeight + window.pageYOffset >= document.body.offsetHeight - 2;
			if (distanceToTop(targetAnchor) === 0 || atBottom) {
				targetAnchor.tabIndex = '-1';
				window.history.pushState('', '', targetID);
				clearInterval(checkIfDone);
			}
		}, 100);
	}

});