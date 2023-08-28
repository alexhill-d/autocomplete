const autoCompletes = document.querySelectorAll('.auto-complete')
let queryCall = null

	

autoCompletes.forEach( autoComplete => {
//	autoComplete.addEventListener('keydown', function handleClick(event) {
	autoComplete.addEventListener('keyup', event => {
//		console.log('autoComplete key down', event.key, event.keyCode, event)
//		console.log(document.querySelector('#query').value)
		if(queryCall) clearTimeout(queryCall)
		queryCall = setTimeout('getJSON()',750)
		 
		
	}); 
	
});


function getJSON() {
	var http = new XMLHttpRequest();
	var input, filter;
	input = document.getElementById('query');
	filter = input.value.toUpperCase();
	var result
	http.open('GET', 'autocomplete.json', true)
	http.onreadystatechange = function() {
		if(http.readyState == 4) {
			result = JSON.parse(http.responseText)
			let results = document.querySelector('.results')
			let resultText = ''
			result.data.forEach( itm => {
				
				if (itm.title.toUpperCase().indexOf(filter) > -1) {
					let articleHtml = '<div id="article' + itm.articleId + '" class="article">' 
							+ '<h2>' + itm.title + '</h2>'
							+ '<div class="entered">' + itm.published + '</div>'
							+ (itm.photo.length ? '<img src="photos/' + itm.photo + '" alt="' + itm.title + '">' : '')
							+ '</div>'
				resultText += articleHtml
				} 
				
			})
			results.innerHTML = resultText
			console.log(resultText, result)
			
		}
	
	}
	http.send(null);
	
}
document.getElementById('query').dispatchEvent(new Event('keyup'));


