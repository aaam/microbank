ERROR_THRESHOLD = 0.1; // between 0.0 (no error) and 1.0 (100% of error)
DELAY_THRESOLD = 0.2; // between 0.0 and 1.0, but above ERROR_THRESOLD

function getRandom () {
	return Math.random();
}

function returnError (res) {
	console.log("Chaos Router returning 500");
	res.status(500).send("Chaos Router in action");
}

function delay (req, res, next) {
	console.log ("Chaos Router delaying response");
	setTimeout (chaos (req, res, next), 2e3);
}

function chaos (req, res, next) {
	r = getRandom();
	if (r < ERROR_THRESHOLD) {
		returnError (res);
	} else {
		if (r < DELAY_THRESOLD) {
			delay (req, res, next);
		}
		else {
			next ();
		}
	}
}

module.exports = chaos;