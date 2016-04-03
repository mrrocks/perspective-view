# Perspective module

{PerspectiveLayer} = require "perspective"

myPerspective = new PerspectiveLayer

# Some random layers

layers = []

for i in [1..16]
	layers[i] = layer = new Layer
		width: 200, height: 200
		backgroundColor: Utils.randomColor(1).desaturate(15).lighten(10)
		style:
			"padding" : "20px"
			"font-size" : "1rem"

	layer.html = layer.name = "Layer: #{layer.index}"
	layer.center()

# Toggle Perspective

layers[16].on Events.Tap, ->
	myPerspective.togglePerspective()