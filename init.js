/*

App init code. 

Not run until everything has loded.

*/

initInteract();

pieces = [
	board.piece({
		type: "c-2",
		uuid: "11",
	}),
	board.piece({
		type: "d-9",
	}),
	board.piece({
		type: "h-4",
	}),
	board.piece({
		type: "s-6",
	})

];

pieces.map(view.local.add);
