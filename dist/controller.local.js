/*

Handles local user interaction.

*/

"use strict";

controller.local = (function () {
  this.context = "local";

  // Attach CRUD facade
  this.crud = new controller.crud(this.context);


  // Turn a card over
  this.turn = (function (uuid) {
    //var rotateY = (model.state[uuid].rotateY === 180)? 0: 180;
    var rotateY = model.state[uuid].rotateY + 180;
    this.crud.update(uuid, { rotateY: rotateY });
  }).bind(this);

  // Rotate a card to rotateZ (or +90deg if undefined)
  this.rotate = (function (uuid, rotateZ) {
    if (typeof rotateZ === "undefined") rotateZ = model.state[uuid].rotateZ + 90;
    this.crud.update(uuid, { rotateZ: rotateZ });
  }).bind(this);


  return this;
}).apply(controller.local || {});

//*****************************************************************************
/*

PROTOTYPE ONLY

UI handler - needs to be rewritten

*/


function stopInteractingWithElement(event) {
  // If element has been interacted with, rise it to the top
  /*if (event.target.classList.contains("active")) {
  	model.element.appendChild(event.target);
  }*/
  event.target.classList.remove("active");
  event.target.classList.remove("interacting");
}


function initInteract() {
  /*
  interact.js config
  */

  // target elements with the "draggable" class
  interact(".draggable").on("mousedown", function (event) {
    event.target.classList.add("active");
  }).on("mouseout", stopInteractingWithElement).on("doubletap", function (event) {
    var uuid = event.target.id || event.target.parentNode.id;
    controller.local.turn(uuid);
    //controller.local.rotate(uuid);
  }).draggable({
    // allow dragging of multple elements at the same time
    max: Infinity,

    // call this function on every dragmove event
    onmove: function (event) {
      var target = event.target,
      // keep the dragged position in the data-x/data-y attributes
      x = (parseFloat(target.getAttribute("data-x")) || 0) + Math.floor(event.dx), y = (parseFloat(target.getAttribute("data-y")) || 0) + Math.floor(event.dy);

      // translate the element
      target.classList.add("active");
      target.classList.add("interacting");
      /*target.style.webkitTransform =
      target.style.transform =
      	"translate(" + x + "px, " + y + "px)";
      */
      target.style.left = x + "px";
      target.style.top = y + "px";

      // update the posiion attributes
      target.setAttribute("data-x", x);
      target.setAttribute("data-y", y);

      // Update the model
      controller.local.crud.update(target.id, { x: x, y: y });
    },
    // call this function on every dragend event
    onend: function (event) {
      stopInteractingWithElement(event);
    }
  })
  // enable inertial throwing
  .inertia(true)
  // keep the element within the area of it's parent
  .restrict({
    drag: "parent",
    endOnly: true,
    elementRect: { top: 0, left: 0, bottom: 1, right: 1 }
  });

  // allow more than one interaction at a time
  interact.maxInteractions(Infinity);
}