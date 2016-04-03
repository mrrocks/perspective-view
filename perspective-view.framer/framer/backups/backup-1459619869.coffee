{PerspectiveLayer} = require "perspective"

myPerspective = new PerspectiveLayer

layerProperties = (layer) ->
	layer.html = "Index: #{layer.index}"
	layer.style =
		"padding" : "20px"
		"font-size" : "1rem"
	layer.center()
	layer.pixelAlign()

for layer in [0..6]
	layer = new Layer
		width: Screen.width / 3
		height: Screen.width / 3
		backgroundColor: Utils.randomColor(0.6)

	layerProperties(layer)

base = new Layer
	width: Screen.width / 2
	height: Screen.width / 2
	backgroundColor: Utils.randomColor()
	index: -1

base.draggable.enabled = true
layerProperties(base)

myPerspective.on Events.Click, -> 
	myPerspective.togglePerspective()
