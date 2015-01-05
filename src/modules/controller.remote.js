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


	// Handle updates from peers
	this.messageHandler = function (message) {
		Object.keys(message.data).forEach(function (uuid) {
			var piece = message.data[uuid];
			// Object checking/filtering goes here
			this.crud.update(piece.uuid, piece);
		}.bind(this));
	}.bind(this);

	return this;
}.apply(controller.remote||{});


/*
simulate a remote move:
controller.remote.crud.update("11", { x: "100" });
*/
