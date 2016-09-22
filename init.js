
window.onload = () => {
	// Ugly move Menu under canvas
	// $(".Menu").appendTo(document.body)

	initCommonBindings()
	initMenuBindings()

}


function initCommonBindings() {
	$("canvas").bind("contextmenu", function(e){
		return false
	})
}

function initMenuBindings() {
	// Menu
	$("#resetCanvas").bind("click", restartApp)
	$("#addRandomPoint").bind("click", addRandomPoint)
	$("#removeRandomPoint").bind("click", removeRandomPoint)
}