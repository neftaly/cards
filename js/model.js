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
			rotateX: piece.rotateX || 0, /* AVOID USING - Top-to-bottom flip, in deg */
			rotateY: piece.rotateY || 0, /* Left-to-right flip, in deg */
			rotateZ: piece.rotateZ || 0, /* Clockwise rotation, in deg */
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
