document.addEventListener("DOMContentLoaded", function(event) { 
  document.body.classList.remove('loadind')


var contactsUsButton = document.querySelectorAll('.cta-button,.card-button');
var contactsUs = document.querySelector('.contacts-modal');
var closeModal = document.querySelector('.close-modal');



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
			document.querySelector('.header .container').style.transform = 'translateX(-'+ getScrollbarWidth()/2 +'px)';
			for(var i = 0; i < contactsUsButton.length; i++) {
				contactsUs.classList.add('visible');
				if(document.body.clientHeight > window.innerHeight){
					
					document.body.style.overflow = 'hidden';
					document.body.style.paddingRight = getScrollbarWidth()+'px';
				}
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



// function doRegister() {
//   let checks = {
//     name : document.getElementById("name"),
//     phone : document.getElementById("phone"),
//     message : document.getElementById("message")
//   },
// error = "";
//   if (checks.name.value=="") {
//     error += document.getElementById("name-alert").value+='<p>A name is required!</p>';
//   }
//   if (checks.phone.value=="") {
//     error += document.getElementById("subject-alert").innerHTML+='<p>A subject is required!</p>';
//   }
//   if (checks.message.value=="") {
//     error += document.getElementById("message-alert").innerHTML+='<p>A message is required!</p>';
//   }
//   let pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
//   if (!pattern.test(checks.email.value.toLowerCase())) {
//     error += document.getElementById("email-alert").innerHTML+='<p>A valid email is required!</p>';
//   }
// }
// Ajax
function validate(e) {


	}
window.onload = function() {
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
};


});