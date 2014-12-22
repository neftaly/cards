/*

Handles the state model.

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
		state[piece.uuid] = piece;
		/*
			Attach observer
		*/
		/*
			Fire event
		*/
	}.bind(this);


	/*
	Move a piece
	*/
	this.reposition = function (uuid, coords) {
		var piece = state[uuid];
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

	var state = {};
	this.state = state; // TODO: Make this.state read-only.

	// State change events
	var events = {
		local: { // Events from the UI, caused by the client
			add: new CustomEvent("add", { "detail": "local" }), // Piece added to board
			move: new CustomEvent("move", { "detail": "local" }) // Piece X/Y/ changed
			// bubble - piece moved to top of stack
			// update - 
		},
		remote: { // Events from the network, caused by a peer
			add: new CustomEvent("add", { "detail": "local" }),
			move: new CustomEvent("move", { "detail": "local" })
		},
	}

	return this;

}.apply({}||board);
