
window.onload = () => {
	// Ugly move Menu under canvas
	// $(".Menu").appendTo(document.body)

	initBindings()

}


function initBindings() {
	// Menu
	$("#reset").bind("click", restartApp)
}