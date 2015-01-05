/*

Handles remote peer interaction.

*/

"use strict";

view.remote = function () {
	this.context = "remote";

	// Send buffered local updates to peer
	this.tick = function () {
		// Don't send any updates if buffer is empty
		if (Object.keys(buffer).length === 0) return false;
		// Process buffer (delta encoding, etc)
		var data = {};
		Object.keys(buffer).forEach(function (objectId) {
			var object = buffer[objectId];
			data[object.uuid] = {
				uuid: object.uuid,
				x: object.x,
				y: object.y,
				rotateX: object.rotateX,
				rotateY: object.rotateY,
				rotateZ: object.rotateZ
				/*
				Also:
				transforms
				interacted (show a coloured outline when other players interact with stuff)
				innerhtml (or similar, for shared calculators/text fields/etc)
				*/
			}
		});
		// Send data to peers
		model.session.send("message", {data:data});
		// Reset the buffer
		buffer = {}; 
	}.bind(this);


	// Add local updates to buffer
	model.addEventListener("update", function (context, object) {
		if (context !== "local") return false;
		buffer[object.uuid] = object;
	}.bind(this));


	this.tickRate = 100; // Update time
	var buffer = {}; // Output buffer
	this.ticker = setInterval(this.tick, this.tickRate);

	return this;
}.apply(view.remote||{});
