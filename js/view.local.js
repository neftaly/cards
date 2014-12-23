/*

Handles local user interaction.

*/

"use strict";

view.local = function () {
	this.context = "local";

	this.draw = function (piece) {

		// Setup DOM element
		var element = document.createElement(piece.class);
		model.element.appendChild(element);
		element.id = piece.uuid;
		element.className = piece.type + " draggable";
		element.tabindex = 0;

		// Set DOM element attributes
		this.update(piece);

	}.bind(this);


	this.update = function (piece) {

		// Setup DOM element
		var element = document.getElementById(piece.uuid);

		element.style.left = piece.x + "px";
		element.style.top = piece.y + "px";
		element.style.zIndex = piece.z;

	}.bind(this);


	// draw piece whenever a new piece is added
	model.addEventListener("add", function (context, object) {
		if (context !== this.context) this.draw(object);
	}.bind(this));

	// draw piece whenever a new piece is added
	model.addEventListener("update", function (context, object) {
		if (context !== this.context) {
			console.log("up", object);
			this.update(object);
		}
	}.bind(this));


	return this;
}.apply(view.local||{});
