/*

App init code. 

Not run until everything has loaded.

*/

initInteract();

[
	{
		type: "c-2",
		uuid: "11",
	},
	{
		type: "d-9",
	},
	{
		type: "h-4",
	},
	{
		type: "s-6",
	}
]
	.forEach(controller.remote.crud.add);
