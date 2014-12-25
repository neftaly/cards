/*

Handles remote peer interaction.

*/

"use strict";

controller.remote = function () {
	this.context = "remote";

	// Attach CRUD facade
	this.crud = new controller.crud(this.context);


	// Init WebRTC
	this.init = function (roomName) {
		model.session = Peer.initSession().connect(window.location.hash);
		// Receive remote messages
		model.session.on("message", this.messageHandler);
	}.bind(this);

	this.messageHandler = function (message) {
		var data = message.data;
		this.crud.update(data.uuid, { x: data.x, y: data.y });
	}.bind(this);

	return this;
}.apply(controller.remote||{});


/*
simulate a remote move:
controller.remote.crud.update("11", { x: "100" });
*/
