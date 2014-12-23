/*

Handles remote peer interaction.

*/

"use strict";

controller.remote = function () {
	this.context = "remote";

	// Attach CRUD facade
	this.crud = new controller.crud(this.context);


	return this;
}.apply(controller.remote||{});


/*
simulate a remote move:
controller.remote.crud.update("11", { x: "100" });
*/