/*

Handles the state model.

*/

"use strict";

var board = function () {

	// Add a piece
	this.add = function (piece) {
		state[piece.uuid] = piece;
	}.bind(this);


	// Move a piece
	this.reposition = function (uuid, coords) {
		var piece = state[uuid];
		piece.coords = coords;
		// rearrange board.state, putting [uuid] in correct position
		// position = piece.coords.z
		// ....
	}.bind(this);

	var state = {};

	// TODO: expose only a read-only copy of `state`.
	this.state = state;

	// DOM element which game pieces are drawn in
	this.element = function () { return document.getElementById("gameboard"); }

	return this;

}.apply({}||board);
