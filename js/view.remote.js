/*

Handles remote peer interaction.

*/

"use strict";

view.remote = function () {
	this.context = "remote";

	// Send local updates to remote peers
	// TODO: deltas, tick rates (setInterval), etc
	model.addEventListener("update", function (context, object) {
		if (context === "local") {
			console.log(context, object);
			var objectDetails = {
				blame: "github.com/neftaly/cards (promise I'll stop soon!)",
				uuid: object.uuid,
				x: object.x,
				y: object.y
				/*
				Also:
				transforms
				interacted (show a coloured outline when other players interact with stuff)
				innerhtml (or similar, for shared calculators/text fields/etc)
				*/
			}
			model.session.send("message", {data:objectDetails});
		}
	}.bind(this));


	return this;
}.apply(view.remote||{});
