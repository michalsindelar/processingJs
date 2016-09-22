
window.onload = () => {
	// Ugly move Menu under canvas
	// $(".Menu").appendTo(document.body)

	initBindings()

}


function initBindings() {
	// Menu
	$("#resetCanvas").bind("click", restartApp)
	$("#addRandomPoint").bind("click", addRandomPoint)
}