"use strict";

var board = function () {

	this.add = function (piece) {

		// Setup gamestate element
		this.gamestate[piece.uuid] = piece;

		// Setup DOM element
		var element = document.createElement(piece.type);
		board.element().appendChild(element);
		element.className = piece.subType + " draggable";
		element.id = piece.uuid;
		element.tabindex = 0;

		piece.element = element;

		this.position(piece.uuid, piece.coords);

		return piece;


	}.bind(this);


	this.position = function (uuid, coords) {
		var piece = this.gamestate[uuid];
		piece.coords = coords;
		// rearrange board.gamestate, putting [uuid] in correct position
		// position = piece.coords.z
		// ....

		//piece.element.style.left = coords.x + "px";
		//piece.element.style.top = coords.y + "px";
		return true;

	}.bind(this);


	// TODO: Setup observer pattern for gamestate
	this.gamestate = [];
	// DOM element which game pieces are drawn in
	this.element = function () { return document.getElementById("gameboard"); }

	return this;

}.apply({});



function stopInteractingWithElement(event) {
	// If element has been interacted with, rise it to the top
	if (event.target.classList.contains("active")) {
		board.element().appendChild(event.target);
	}
	event.target.classList.remove("active");
	event.target.classList.remove("interacting");
}

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
