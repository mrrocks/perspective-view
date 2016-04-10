# Perspective module

{PerspectiveView} = require "perspective-view"

perspectiveView = new PerspectiveView

# Some random layers

layers = []

for i in [1..16]
	layers[i] = layer = new Layer
		width: 250, height: 250
		backgroundColor: Utils.randomColor().desaturate(15).lighten(10)
		style:
			"padding" : "20px"
			"font-size" : "1.5rem"

	layer.html = layer.name = "Layer: #{layer.index}"
	layer.center()

# Toggle Perspective

layers[16].on Events.Tap, ->
	perspectiveView.togglePerspective()