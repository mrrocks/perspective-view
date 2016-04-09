class exports.Perspective 
	animationCurve = "spring(120, 20, 0, 0.07)"
	activated = false

	screen = Framer.Device.screen
	device = Framer.Device.phone
	allLayers = null

	togglePerspective: (verticalSeparation = 40, temporalOpacity = 0.8) ->
		allLayers = Framer.CurrentContext.getLayers()

		if not activated and not @_childrenAnimating(screen.children)
			activated = true
			screen.clip = false

			@_setAllLayersAsChildrenOf(screen)

			device.originalProps = device.props
			device.animate
				properties:
					rotationZ: 45
					rotationX: 45
					scaleY: 0.86062
					y: verticalSeparation * (allLayers.length / 3.4)
				curve: animationCurve

			for layer in screen.children
				layer.originalProps = layer.props

				layer.animate
					properties:
						z: verticalSeparation * (layer.index - 1)
						opacity: temporalOpacity
					delay: (allLayers.length - layer.index) / allLayers.length
					curve: animationCurve

		else if activated and not @_childrenAnimating(screen.children)
			activated = false

			rotationNegative = device.rotationZ < 0

			if Math.abs(device.rotationZ) > 180
				device.originalProps.rotationZ = if rotationNegative then -360 else 360
			else
				device.originalProps.rotationZ = if rotationNegative then -0 else 0

			device.animate
				properties: device.originalProps
				curve: animationCurve

			for layer in screen.children when screen.children.indexOf(layer) isnt 0
				layer.animate
					properties: layer.originalProps
					curve: animationCurve

			device.once Events.AnimationEnd, ->
				screen.clip = true
				layer.parent = null for layer in screen.children when screen.children.indexOf(layer) isnt 0

	_setAllLayersAsChildrenOf: (parent) ->
		for layer in allLayers when layer.parent is null
			parent.addSubLayer(layer)

	_childrenAnimating: (layersArray) ->
		_.some layersArray, (layer) -> layer.isAnimating