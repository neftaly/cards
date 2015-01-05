/*

Model handling code

*/

"use strict";

var model = function () {

	/*
	Prototype for creating a new piece 
	*/
	this.piece = function(piece) {
		return {
			class: piece.class || "card",
			type: piece.type || "joker-1",
			uuid: piece.uuid || util.UUID(),
			x: piece.x || 0,
			y: piece.y || 0,
			z: piece.z || 0,
			rotateX: piece.rotateX || 0, /* Flip top-over-bottom, in deg */
			rotateY: piece.rotateY || 0, /* Turn left-over-right, in deg */
			rotateZ: piece.rotateZ || 0 /* Rotate clockwise, in deg */
		}
	}


	// DOM element which game pieces are drawn in
	Object.defineProperty(this, "element", { 
		get: function() { return document.getElementById("gameboard"); }
	});


	this.state = {}; // Gamestate object
	this.events = {}; // State change events

	this.session = false; // WebRTC session

	return this;
}.apply(model||{});
