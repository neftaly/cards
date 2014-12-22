/*

Handles local user interaction.

*/

"use strict";

// Init controller (for async)
var view = view || function () { return this; }.apply({});

view.local = function () {

	// Identify the context when changing the model
	var context = "local"; 


	this.add = function (piece) {
		return board.add (context, piece);
	}


	//board.state[11].addEventListener("", function (e) { ... }, false);
	this.draw = function (piece) {

		// Setup DOM element
		var element = document.createElement(piece.class);
		board.element.appendChild(element);
		element.className = piece.type + " draggable";
		element.id = piece.uuid;
		element.tabindex = 0;

		element.style.left = piece.x + "px";
		element.style.top = piece.y + "px";
		element.style.zIndex = piece.z;

		piece.element = element;

		//this.reposition(piece.uuid, piece.coords);

		return piece;

	}.bind(this);


	/*this.reposition = function (uuid) {
		piece = board.state[uuid].coords;

		piece.element.style.left = coords.x + "px";
		piece.element.style.top = coords.y + "px";
		piece.element.style.zIndex = coords.z;
		return true;

	}.bind(this);*/


	// draw piece whenever a new piece is added
	board.addEventHandler("add", function (context, object) {
		this.draw(object);
	}.bind(this));


	return this;

}.apply(view.local||{});










/*

PROTOTYPE ONLY
UI handler - needs to be rewritten

*/


function stopInteractingWithElement(event) {
	// If element has been interacted with, rise it to the top
	if (event.target.classList.contains("active")) {
		board.element.appendChild(event.target);
	}
	event.target.classList.remove("active");
	event.target.classList.remove("interacting");
}


function initInteract() {
/*
interact.js config
*/

	// target elements with the "draggable" class
	interact(".draggable")
		.on("mousedown", function (event) {
			event.target.classList.add("active");
		})
		.on("mouseout", stopInteractingWithElement)
		.draggable({
			// allow dragging of multple elements at the same time
			max: Infinity,

			// call this function on every dragmove event
			onmove: function (event) {
				var target = event.target,
					// keep the dragged position in the data-x/data-y attributes
					x = (parseFloat(target.getAttribute("data-x")) || 0) + event.dx,
					y = (parseFloat(target.getAttribute("data-y")) || 0) + event.dy;

				// translate the element
				target.classList.add("active");
				target.classList.add("interacting");
				target.style.webkitTransform =
				target.style.transform =
					"translate(" + x + "px, " + y + "px)";

				// update the posiion attributes
				target.setAttribute("data-x", x);
				target.setAttribute("data-y", y);
			},
			// call this function on every dragend event
			onend: function (event) {
				stopInteractingWithElement(event);
			}
		})
		// enable inertial throwing
		.inertia(true)
		// keep the element within the area of it"s parent
		.restrict({
			drag: "parent",
			endOnly: true,
			elementRect: { top: 0, left: 0, bottom: 1, right: 1 }
		});

		// allow more than one interaction at a time
	interact.maxInteractions(Infinity);
}