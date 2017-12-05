window.addEventListener('load', function(){

	var inputField = document.getElementById('js-key-input');
	var submitButton = document.getElementById('js-key-input-submit');

	submitButton.addEventListener('click', function(){
		var key = inputField.value;
		if(key == null || key.length == 0)
		{
			return
		}
		else
		{
			makeRequest(key.trim() );
		}
	});

	inputField.addEventListener('keypress', function(event){
		if(event.key == 'Enter')
		{
			var key = inputField.value;
			if(key == null || key.length == 0)
			{
				return
			}
			else
			{
				makeRequest(key.trim() );
			}
		}
	});

});


function makeRequest(key)
{
	var gb = new GiantBomb(key);

	var platformResultUi = document.getElementById('js-platforms-result');
	var searchResultUi = document.getElementById('js-search-result');
	var searchTitle = document.getElementById('js-search-result-title');
	var searchDeck = document.getElementById('js-search-result-deck');
	var searchImage = document.getElementById('js-search-result-image');
	
	var timeoutDisplay = document.getElementById('js-timeout');
	
	
	platformResultUi.textContent = '';
	searchResultUi.textContent = '';
	searchTitle.textContent = '';
	searchDeck.textContent = '';
	searchImage.src = '';

	// 10 second timeout because getting 20 platforms may take some time.
	var timeout = 10000;
	gb.setTimeout(8000);
	timeoutDisplay.textContent = 'Request Timeout: ' + timeout/1000 + ' seconds';

	gb.getPlatforms({fields:['name', 'id'], limit:20}, function(error, response, body){

		if(error)
		{
			platformResultUi.textContent = 'Failed to retrive 20 platforms from Giant Bomb. See the console for more details';
		}
		else
		{
			platformResultUi.textContent = 'Successfully retrieved 20 platforms from Giant Bomb. See the console for more details';
		}

		console.log('Platforms Search');
		console.log(error, ' error');
		console.log(body, ' apiResponse');
		console.log('---------------------------------');
	});


	var searchOptions = {resources:['character'], fields:['name', 'id', 'deck', 'image'], limit:1, query:'claptrap'};
	gb.search(searchOptions, function(error, response, body){


		if(error)
		{
			searchResultUi.textContent = 'Failed to search for character: ' + searchOptions.query;
			searchResultUi.textContent += ' See console for more details';
		}
		else
		{
			searchResultUi.textContent = 'Displaying first result for character search: "' + searchOptions.query;
			searchResultUi.textContent += '" .See console for more details';

			searchTitle.textContent = body.results[0].name;
			searchDeck.textContent = body.results[0].deck;
			searchImage.src = body.results[0].image.small_url;

		}

		console.log('Character Search');
		console.log(error, ' error');
		console.log(body, ' apiResponse');
		console.log('---------------------------------');
	});
}


