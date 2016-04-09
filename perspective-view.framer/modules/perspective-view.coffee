class exports.PerspectiveView 
	animationCurve = "spring(120, 20, 0, 0.07)"
	activated = false
	rotateObject = null
	initialRotation = 0

	screen = Framer.Device.screen
	device = Framer.Device.phone
	allLayers = null

	togglePerspective: (verticalSeparation = 40, temporalOpacity = 0.8) ->
		allLayers = Framer.CurrentContext.getLayers()

		# EVENTS
		rotateObject = if Framer.Device.deviceType isnt "fullscreen" then device else screen
		@_eventsOn() 

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
			@_eventsOff()

			rotationNegative = device.rotationZ < 0

			if Math.abs(device.rotationZ) > 180
				device.originalProps.rotationZ = if rotationNegative then -360 else 360
			else
				device.originalProps.rotationZ = if rotationNegative then -0 else 0

			device.animate
				properties:
					rotationZ: device.originalProps.rotationZ
					rotationX: device.originalProps.rotationX
					scaleY: device.originalProps.scaleY
					y: device.originalProps.y 
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

	_panStart: ->
		initialRotation = rotateObject.rotationZ

	_pan: (e) ->
		rotateObject.rotationZ = initialRotation - ((event.touchCenterX - event.startX) / 4)

	_panEnd: ->
		rotateObject.rotationZ = rotateObject.rotationZ % 360

	_eventsOn: ->
		if rotateObject is screen
			rotateObject.animate
				properties:
					backgroundColor: "rgba(128, 128, 128, 0.2)"

		rotateObject.on(Events.PanStart, @_panStart)
		rotateObject.on(Events.Pan, @_pan)
		rotateObject.on(Events.PanEnd, @_panEnd)

	_eventsOff: ->
		if rotateObject is screen
			rotateObject.animate
				properties:
					backgroundColor: "transparent"

		rotateObject.off(Events.PanStart, @_panStart)
		rotateObject.off(Events.Pan, @_pan)
		rotateObject.off(Events.PanEnd, @_panEnd)