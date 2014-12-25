/*

App init code. 

Not run until everything has loaded.

*/


// Setup room name
window.location.hash = (window.location.hash || util.randomString(8));
	
// Init WebRTC
controller.remote.init(window.location.hash);

initInteract();

[
	{
		type: "c-2",
		uuid: "11"
	},
	{
		type: "d-9",
		uuid: "c801c6fa-1bf8-4712-8fab-f15a787ef150"
	},
	{
		type: "h-4",
		uuid: "b0e199cf-565e-425d-8946-ae1e3a88f442"
	},
	{
		type: "s-6",
		uuid: "981fa30a-01f3-421b-869c-28a250b88a92"
	}
]
	.forEach(controller.remote.crud.add);