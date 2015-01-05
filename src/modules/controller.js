/*

Shared controller functions

*/

"use strict";

var controller = function () { 

	// CRUD facade
	this.crud = function (context) {
		var closure = {};

		// Add a piece to the board
		closure.add = function (piece) {
			return model.add (context, piece);
		},


		// Update a piece on the board
		closure.update = function (uuid, properties) {
			var pieces = {};
			pieces[uuid] = properties;
			return model.update(context, pieces);
			//In ES6, we can just do:
			//return model.update(context, { [uuid]: properties });
		}


		return closure;
	}


	return this; 
}.apply(controller||{});


export function hello(x) {
	return x + "5";
}
