/*

Model handling code

*/

"use strict";

var board = function () {

	/*
	Add a piece
	*/
	this.add = function (context, piece) {
		/*
			Check if already exists
		*/
		this.state[piece.uuid] = piece;
		/*
			Attach observer
			...
			...
		*/
		this.triggerEvent(context, "add", this.state[piece.uuid]);
	}.bind(this);


	/*
	Move a piece
	*/
	this.reposition = function (uuid, coords) {
		var piece = this.state[uuid];
		piece.coords = util.toArray(coords);
		// rearrange board.state, putting [uuid] in correct position
		// position = piece.coords.z
		// ....
	}.bind(this);


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
			element: piece.element || false
		}
	}


	// DOM element which game pieces are drawn in
	Object.defineProperty(this, "element", { 
		get: function() { return document.getElementById("gameboard"); } 
	} );


	return this;

}.apply(board||{});
