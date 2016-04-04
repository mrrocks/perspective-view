class exports.PerspectiveLayer extends Layer
	Screen.perspective = 0
	animationCurve = "spring(120, 20, 0, 0.07)"
	activated = false
	initialRotation = null

	constructor: ->
		super
			width: Screen.width
			height: Screen.height
			clip: false
			backgroundColor: null
			index: 0

		this.originalProps = this.props

		# Events

		this.on Events.PanStart, -> initialRotation = this.rotationZ
		this.on Events.Pan, (event) -> this.rotationZ = initialRotation - ((event.touchCenterX - event.startX) / 4)
		this.on Events.PanEnd, -> this.rotationZ = this.rotationZ % 360

	togglePerspective: (verticalSeparation = 40, temporalOpacity = 0.8) ->

		if not activated and not _childrenAnimating(this.children)
				activated = true

				_setAllLayersAsChildrenOf(this)

				this.animate
					properties:
						rotationZ: 45
						rotationX: 45
						scaleY: 0.86062
						backgroundColor: "rgba(128, 128, 128, 0.2)"
						y: verticalSeparation * (this.children.length / 3.4)
					curve: animationCurve

				for layer in this.children
					layer.originalProps = layer.props

					layer.animate
						properties:
							z: verticalSeparation * (layer.index - 1)
							opacity: temporalOpacity
						delay: (this.children.length - layer.index) / this.children.length
						curve: animationCurve

			else if activated and not _childrenAnimating(this.children)
				activated = false

				this.animate
					properties: this.originalProps
					curve: animationCurve

				for layer in this.children
					layer.animate
						properties: layer.originalProps
						curve: animationCurve

				this.once Events.AnimationEnd, ->
					layer.parent = null for layer in this.children

	_setAllLayersAsChildrenOf = (parent) ->
		for layer in Framer.CurrentContext.getLayers() when layer.parent is null and layer isnt parent
			parent.addSubLayer(layer)

	_childrenAnimating = (layersArray) ->
		_.some layersArray, (layer) -> layer.isAnimating