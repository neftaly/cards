"use strict";

var util = function () {

	/*
	Convert object to assoc array
	*/
	this.toArray = function (object, recursive) {

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

	}.bind(this);


	return this;

}.apply(util||{});
