/*

Handles remote peer interaction.

*/

"use strict";

view.remote = function () {
	this.context = "remote";

	// draw piece whenever a new piece is added
	model.addEventListener("update", function (context, object) {
		if (context !== this.context) {
			//console.log(context, "updated", object)
		}
	}.bind(this));


	return this;
}.apply(view.remote||{});
