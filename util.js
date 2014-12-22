/*

Utility code

Staging ground only - code should be moved into more appropriate places

*/

"use strict";

var util = function () {

	/*
	Convert object to assoc array
	*/
	/*this.toArray = function (object, recursive) {

		// Check if `variable` can be recursed
		var recursable = function (variable) {
			return (
				typeof variable === "object" 
				|| typeof variable === "array"
			);
		}

		var array = [];
		Object.keys(object).map(function (key) {
			if (recursive && recursable(object[key])) {
				array[key] = this.toArray(object[key], true);
			} else {
				array[key] = object[key];
			}
		}.bind(this));

		return array;

	}.bind(this);*/

	// Random UUID generator
	this.UUID = function(seed) {
		var seed = seed || Math.random(); // Insecure if seed undefined
		var UUID = "";
		for (var i = 0 ; i < 36; i++) {
			UUID += (function (i) {
				if (i === 8 || i === 13 || i === 18 || i === 23) return "-";
				if (i === 14) return "4"; // UUID version flag
				if (i === 19) return "8"; // Can be "8", "9", "A" or "B"
				return Math.floor( Math.random(seed) * 16 ).toString(16);
			})(i);
		}
		return UUID;
	}


	return this;

}.apply(util||{});
