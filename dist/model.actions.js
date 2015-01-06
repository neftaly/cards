/*

Model handling code

*/

"use strict";

var model = (function () {
  /*
  Add a piece
  */
  this.add = (function (context, piece) {
    // Init defaults
    piece = this.piece(piece);
    // Attach to state
    this.state[piece.uuid] = piece;
    // Fire "add" event
    this.dispatchEvent(context, "add", this.state[piece.uuid]);
  }).bind(this);


  /*
  Change properties of several pieces.
  */
  this.update = (function (context, pieces) {
    // Iterate through each piece
    Object.keys(pieces).forEach(function (uuid) {
      var piece = pieces[uuid];
      // Iterate through each property
      Object.keys(piece).forEach(function (property) {
        model.state[uuid][property] = piece[property];
      });
      model.dispatchEvent(context, "update", model.state[uuid]);
    });
    // rearrange model.state, putting [uuid] in correct position
    // position = piece.coords.z
    // ....
  }).bind(this);


  return this;
}).apply(model || {});