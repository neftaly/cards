/*

Model state and state event handler code

*/

"use strict";

var board = function () {

	// Gamestate object
	var state = {};
	this.state = state;


	// State change events
	var events = {
		add: [], // Piece added to board
		move: [] // Piece X/Y/ changed
	};

	// Event handler
	this.triggerEvent = function (context, eventName, object) {
		events[eventName].forEach( function (handler) { handler(context, object); } );
	}

	// Add new event handler
	this.addEventHandler = function (eventName, handler) {
		events[eventName].push(handler);
	}

	// Observe changes to the gamestate
	Object.observe(state, function(changes) {
		changes.forEach(function(change) {
			console.log(change.type, change.name, change.oldValue);
    	});
	});

	return this;

}.apply(board||{});
