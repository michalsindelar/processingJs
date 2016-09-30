

window.onload = () => {
	// Ugly move Menu under canvas
	// $(".Menu").appendTo(document.body)

	initCommonBindings()
	initMenuBindings()
	generateModes()
	initModesBindings()

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

function generateModes() {
	const formatLinkText = key => key.toLowerCase().replace("_", " ")

	Object.keys(MODES).map((key) => {
		var menuEl = "<div id=\"" + key + "\" class=\"btn btn-default\" >" + formatLinkText(key) + "</div>"
		$(menuEl).appendTo(".Modes")
	})
}

function initModesBindings() {
	$(".Modes").children().bind("click", toggleMode)
}

function toggleMode(ev) {
	MODES[ev.target.id] ?
		$(ev.target).addClass("active") :
		$(ev.target).removeClass("active")

	MODES[ev.target.id] = !MODES[ev.target.id]
}