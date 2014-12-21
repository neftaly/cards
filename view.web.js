/*

Handles messaging.

*/

"use strict";

// Init controller (for async)
var view = view || function () { return this; }.apply({});

view.web = function () {

	// Observe changes to the gamestate
	Object.observe(board.state, function(changes) {
		changes.forEach(function(change) {
			//console.log(change.type, change.name, change.oldValue);
    	});
	});

	return this;
}.apply({}||view.web);
