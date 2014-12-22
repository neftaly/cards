/*

Handles remote peer interaction.

*/

"use strict";

// Init controller (for async)
var view = view || function () { return this; }.apply({});

view.remote = function () {

	// Identify the context when changing the model
	var context = "remote"; 


	return this;
}.apply(view.remote||{});
