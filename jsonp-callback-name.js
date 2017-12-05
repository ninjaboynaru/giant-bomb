



/**
* @function
* Return a random int between min and max
*/
function randomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
* @function
* Return a random string to be used for a JSONP callback name.
*/
function randomJsonpCallbackName() {
	var minInt = 1000;
	var maxInt = 8000;
	return `json_callback_${randomInt(minInt, maxInt)}_${randomInt(minInt, maxInt)}`;
}




module.exports = randomJsonpCallbackName;


