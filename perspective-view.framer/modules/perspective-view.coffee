class exports.PerspectiveView
	animationCurve = "spring(120, 20, 0, 0.07)"
	activated = false
	initialRotation = null
	panningRatio = 4

	Screen.perspective = 0

	rotationParent = Framer.Device.phone
	rotationParent.orgProps = rotationParent.props

	_setAllLayersAsChildrenOf = (parent) ->
		for layer in Framer.CurrentContext.getLayers() when layer.parent is null and rotationParent.children.indexOf(layer) isnt 0
			rotationParent.addChild(layer)

			layer.x = layer.x + Framer.Device.screen.x
			layer.y = layer.y + Framer.Device.screen.y

			layer.initialZ = null

	_childrenAnimating = (layersArray) ->
		_.some layersArray, (layer) -> layer.isAnimating

	_panStart = ->
		initialRotation = rotationParent.rotationZ

		layer.initialZ = layer.z for layer in rotationParent.children when layer isnt Framer.Device.screen

	_pan = (event) ->
		rotationParent.rotationZ = initialRotation - ((event.touchCenterX - event.startX) / panningRatio)

		for layer, i in rotationParent.children when _.last(rotationParent.children).z isnt 1
					layer.z = layer.initialZ - (((event.touchCenterY - event.startY) * (i - 1)) / panningRatio)

	_panEnd = ->
		rotationParent.rotationZ = rotationParent.rotationZ % 360

	_keyDownTextField = (e) =>
		if e.keyCode is 13
			print this
			this.toggle()

	toggle: (rotation = true, z = 40, opacity = 0.8) ->

		if not activated and not _childrenAnimating(rotationParent.children)
			activated = true

			_setAllLayersAsChildrenOf(rotationParent)

			# Events

			if rotation
				rotationParent.on Events.PanStart, _panStart
				rotationParent.on Events.Pan, _pan
				rotationParent.on Events.PanEnd, _panEnd

			# Animations

			rotationParent.animate
				properties:
					rotationZ: 45
					rotationX: 45
					scaleY: 0.86062
					y: z * (rotationParent.children.length / 3.5)
				curve: animationCurve

			for layer in rotationParent.children when layer isnt Framer.Device.screen
				layer.orgProps = layer.props

				layer.animate
					properties:
						z: z * (layer.index - 2)
						opacity: opacity
					delay: (rotationParent.children.length - layer.index) / rotationParent.children.length
					curve: animationCurve

		else if activated and not _childrenAnimating(rotationParent.children)
			activated = false

			# Events
			if rotation
				rotationParent.off Events.PanStart, _panStart
				rotationParent.off Events.Pan, _pan
				rotationParent.off Events.PanEnd, _panEnd

			# Animations

			rotationNegative = rotationParent.rotationZ < 0

			if Math.abs(rotationParent.rotationZ % 360) > 180
				rotationParent.orgProps.rotationZ = if rotationNegative then -360 else 360
			else
				rotationParent.orgProps.rotationZ = if rotationNegative then -0 else 0

			rotationParent.animate
				properties:
					rotationZ: rotationParent.orgProps.rotationZ
					rotationX: rotationParent.orgProps.rotationX
					scaleY: rotationParent.orgProps.scaleY
					y: rotationParent.orgProps.y
				curve: animationCurve

			for layer in rotationParent.children
				layer.animate
					properties: layer.orgProps
					curve: animationCurve

			rotationParent.once Events.AnimationEnd, ->
				rotationParent.rotationZ = 0
				for layer in rotationParent.children when rotationParent.children.indexOf(layer) isnt 0
					layer.parent = null

					layer.x = layer.x - Framer.Device.screen.x
					layer.y = layer.y - Framer.Device.screen.y