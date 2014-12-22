/*

Model state and state event handler code

	Event list:

	* add
	* update
	* update_(property name)

*/

"use strict";

var model = function () {

	// Trigger an event
	this.dispatchEvent = function (context, eventName, target) {
		if (typeof this.events[eventName] === "undefined") return false;
		this.events[eventName].forEach(function (handler) { 
			handler(context, target); 
		});
		return true;
	}


	// Add a new event handler
	this.addEventListener = function (eventName, handler) {
		if (typeof this.events[eventName] === "undefined") {
			this.events[eventName] = [];
			var eventDidNotExist = true;
		}
		this.events[eventName].push(handler);
		// If we had to create a new event, return false
		return (eventDidNotExist)? false: true;
	}


	// Remove an event handler
	// TODO: untested
	this.removeEventListener = function (eventName, handler) {
		this.events.forEach(function (handlerKey) {
			if (this.events[handlerKey] === handler) {
				this.events.splice(handlerKey, 1);
				return true;
			}
		});
		return false;
	}


	return this;
}.apply(model||{});
