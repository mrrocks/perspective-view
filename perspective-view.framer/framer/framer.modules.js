require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"perspective-view":[function(require,module,exports){
exports.Perspective = (function() {
  var activated, allLayers, animationCurve, device, initialRotation, rotateObject, screen;

  function Perspective() {}

  animationCurve = "spring(120, 20, 0, 0.07)";

  activated = false;

  rotateObject = null;

  initialRotation = 0;

  screen = Framer.Device.screen;

  device = Framer.Device.phone;

  allLayers = null;

  Perspective.prototype.togglePerspective = function(verticalSeparation, temporalOpacity) {
    var i, j, layer, len, len1, ref, ref1, results, rotationNegative;
    if (verticalSeparation == null) {
      verticalSeparation = 40;
    }
    if (temporalOpacity == null) {
      temporalOpacity = 0.8;
    }
    allLayers = Framer.CurrentContext.getLayers();
    rotateObject = Framer.Device.deviceType !== "fullscreen" ? device : screen;
    this._eventsOn();
    if (!activated && !this._childrenAnimating(screen.children)) {
      activated = true;
      screen.clip = false;
      this._setAllLayersAsChildrenOf(screen);
      device.originalProps = device.props;
      device.animate({
        properties: {
          rotationZ: 45,
          rotationX: 45,
          scaleY: 0.86062,
          y: verticalSeparation * (allLayers.length / 3.4)
        },
        curve: animationCurve
      });
      ref = screen.children;
      results = [];
      for (i = 0, len = ref.length; i < len; i++) {
        layer = ref[i];
        layer.originalProps = layer.props;
        results.push(layer.animate({
          properties: {
            z: verticalSeparation * (layer.index - 1),
            opacity: temporalOpacity
          },
          delay: (allLayers.length - layer.index) / allLayers.length,
          curve: animationCurve
        }));
      }
      return results;
    } else if (activated && !this._childrenAnimating(screen.children)) {
      activated = false;
      this._eventsOff();
      rotationNegative = device.rotationZ < 0;
      if (Math.abs(device.rotationZ) > 180) {
        device.originalProps.rotationZ = rotationNegative ? -360 : 360;
      } else {
        device.originalProps.rotationZ = rotationNegative ? -0 : 0;
      }
      device.animate({
        properties: {
          rotationZ: device.originalProps.rotationZ,
          rotationX: device.originalProps.rotationX,
          scaleY: device.originalProps.scaleY,
          y: device.originalProps.y
        },
        curve: animationCurve
      });
      ref1 = screen.children;
      for (j = 0, len1 = ref1.length; j < len1; j++) {
        layer = ref1[j];
        if (screen.children.indexOf(layer) !== 0) {
          layer.animate({
            properties: layer.originalProps,
            curve: animationCurve
          });
        }
      }
      return device.once(Events.AnimationEnd, function() {
        var k, len2, ref2, results1;
        screen.clip = true;
        ref2 = screen.children;
        results1 = [];
        for (k = 0, len2 = ref2.length; k < len2; k++) {
          layer = ref2[k];
          if (screen.children.indexOf(layer) !== 0) {
            results1.push(layer.parent = null);
          }
        }
        return results1;
      });
    }
  };

  Perspective.prototype._setAllLayersAsChildrenOf = function(parent) {
    var i, layer, len, results;
    results = [];
    for (i = 0, len = allLayers.length; i < len; i++) {
      layer = allLayers[i];
      if (layer.parent === null) {
        results.push(parent.addSubLayer(layer));
      }
    }
    return results;
  };

  Perspective.prototype._childrenAnimating = function(layersArray) {
    return _.some(layersArray, function(layer) {
      return layer.isAnimating;
    });
  };

  Perspective.prototype._panStart = function() {
    return initialRotation = rotateObject.rotationZ;
  };

  Perspective.prototype._pan = function(e) {
    return rotateObject.rotationZ = initialRotation - ((event.touchCenterX - event.startX) / 4);
  };

  Perspective.prototype._panEnd = function() {
    return rotateObject.rotationZ = rotateObject.rotationZ % 360;
  };

  Perspective.prototype._eventsOn = function() {
    if (rotateObject === screen) {
      rotateObject.animate({
        properties: {
          backgroundColor: "rgba(128, 128, 128, 0.2)"
        }
      });
    }
    rotateObject.on(Events.PanStart, this._panStart);
    rotateObject.on(Events.Pan, this._pan);
    return rotateObject.on(Events.PanEnd, this._panEnd);
  };

  Perspective.prototype._eventsOff = function() {
    if (rotateObject === screen) {
      rotateObject.animate({
        properties: {
          backgroundColor: "transparent"
        }
      });
    }
    rotateObject.off(Events.PanStart, this._panStart);
    rotateObject.off(Events.Pan, this._pan);
    return rotateObject.off(Events.PanEnd, this._panEnd);
  };

  return Perspective;

})();


},{}],"perspective-view":[function(require,module,exports){
// Generated by CoffeeScript 1.9.1
exports.Perspective = (function() {
  var activated, allLayers, animationCurve, device, initialRotation, rotateObject, screen;

  function Perspective() {}

  animationCurve = "spring(120, 20, 0, 0.07)";

  activated = false;

  rotateObject = null;

  initialRotation = 0;

  screen = Framer.Device.screen;

  device = Framer.Device.phone;

  allLayers = null;

  Perspective.prototype.togglePerspective = function(verticalSeparation, temporalOpacity) {
    var i, j, layer, len, len1, ref, ref1, results, rotationNegative;
    if (verticalSeparation == null) {
      verticalSeparation = 40;
    }
    if (temporalOpacity == null) {
      temporalOpacity = 0.8;
    }
    allLayers = Framer.CurrentContext.getLayers();
    rotateObject = Framer.Device.deviceType !== "fullscreen" ? device : screen;
    this._eventsOn();
    if (!activated && !this._childrenAnimating(screen.children)) {
      activated = true;
      screen.clip = false;
      this._setAllLayersAsChildrenOf(screen);
      device.originalProps = device.props;
      device.animate({
        properties: {
          rotationZ: 45,
          rotationX: 45,
          scaleY: 0.86062,
          y: verticalSeparation * (allLayers.length / 3.4)
        },
        curve: animationCurve
      });
      ref = screen.children;
      results = [];
      for (i = 0, len = ref.length; i < len; i++) {
        layer = ref[i];
        layer.originalProps = layer.props;
        results.push(layer.animate({
          properties: {
            z: verticalSeparation * (layer.index - 1),
            opacity: temporalOpacity
          },
          delay: (allLayers.length - layer.index) / allLayers.length,
          curve: animationCurve
        }));
      }
      return results;
    } else if (activated && !this._childrenAnimating(screen.children)) {
      activated = false;
      this._eventsOff();
      rotationNegative = device.rotationZ < 0;
      if (Math.abs(device.rotationZ) > 180) {
        device.originalProps.rotationZ = rotationNegative ? -360 : 360;
      } else {
        device.originalProps.rotationZ = rotationNegative ? -0 : 0;
      }
      device.animate({
        properties: {
          rotationZ: device.originalProps.rotationZ,
          rotationX: device.originalProps.rotationX,
          scaleY: device.originalProps.scaleY,
          y: device.originalProps.y
        },
        curve: animationCurve
      });
      ref1 = screen.children;
      for (j = 0, len1 = ref1.length; j < len1; j++) {
        layer = ref1[j];
        if (screen.children.indexOf(layer) !== 0) {
          layer.animate({
            properties: layer.originalProps,
            curve: animationCurve
          });
        }
      }
      return device.once(Events.AnimationEnd, function() {
        var k, len2, ref2, results1;
        screen.clip = true;
        ref2 = screen.children;
        results1 = [];
        for (k = 0, len2 = ref2.length; k < len2; k++) {
          layer = ref2[k];
          if (screen.children.indexOf(layer) !== 0) {
            results1.push(layer.parent = null);
          }
        }
        return results1;
      });
    }
  };

  Perspective.prototype._setAllLayersAsChildrenOf = function(parent) {
    var i, layer, len, results;
    results = [];
    for (i = 0, len = allLayers.length; i < len; i++) {
      layer = allLayers[i];
      if (layer.parent === null) {
        results.push(parent.addSubLayer(layer));
      }
    }
    return results;
  };

  Perspective.prototype._childrenAnimating = function(layersArray) {
    return _.some(layersArray, function(layer) {
      return layer.isAnimating;
    });
  };

  Perspective.prototype._panStart = function() {
    return initialRotation = rotateObject.rotationZ;
  };

  Perspective.prototype._pan = function(e) {
    return rotateObject.rotationZ = initialRotation - ((event.touchCenterX - event.startX) / 4);
  };

  Perspective.prototype._panEnd = function() {
    return rotateObject.rotationZ = rotateObject.rotationZ % 360;
  };

  Perspective.prototype._eventsOn = function() {
    if (rotateObject === screen) {
      rotateObject.animate({
        properties: {
          backgroundColor: "rgba(128, 128, 128, 0.2)"
        }
      });
    }
    rotateObject.on(Events.PanStart, this._panStart);
    rotateObject.on(Events.Pan, this._pan);
    return rotateObject.on(Events.PanEnd, this._panEnd);
  };

  Perspective.prototype._eventsOff = function() {
    if (rotateObject === screen) {
      rotateObject.animate({
        properties: {
          backgroundColor: "transparent"
        }
      });
    }
    rotateObject.off(Events.PanStart, this._panStart);
    rotateObject.off(Events.Pan, this._pan);
    return rotateObject.off(Events.PanEnd, this._panEnd);
  };

  return Perspective;

})();

},{}]},{},[])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvam9zaG10dWNrZXIvR2l0SHViL3BlcnNwZWN0aXZlLXZpZXcvcGVyc3BlY3RpdmUtdmlldy5mcmFtZXIvbW9kdWxlcy9wZXJzcGVjdGl2ZS12aWV3LmNvZmZlZSIsIi4uLy4uLy4uLy4uLy4uL1VzZXJzL2pvc2htdHVja2VyL0dpdEh1Yi9wZXJzcGVjdGl2ZS12aWV3L3BlcnNwZWN0aXZlLXZpZXcuZnJhbWVyL21vZHVsZXMvcGVyc3BlY3RpdmUtdmlldy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FNLE9BQU8sQ0FBQztBQUNiLE1BQUE7Ozs7RUFBQSxjQUFBLEdBQWlCOztFQUNqQixTQUFBLEdBQVk7O0VBQ1osWUFBQSxHQUFlOztFQUNmLGVBQUEsR0FBa0I7O0VBRWxCLE1BQUEsR0FBUyxNQUFNLENBQUMsTUFBTSxDQUFDOztFQUN2QixNQUFBLEdBQVMsTUFBTSxDQUFDLE1BQU0sQ0FBQzs7RUFDdkIsU0FBQSxHQUFZOzt3QkFFWixpQkFBQSxHQUFtQixTQUFDLGtCQUFELEVBQTBCLGVBQTFCO0FBQ2xCLFFBQUE7O01BRG1CLHFCQUFxQjs7O01BQUksa0JBQWtCOztJQUM5RCxTQUFBLEdBQVksTUFBTSxDQUFDLGNBQWMsQ0FBQyxTQUF0QixDQUFBO0lBR1osWUFBQSxHQUFrQixNQUFNLENBQUMsTUFBTSxDQUFDLFVBQWQsS0FBOEIsWUFBakMsR0FBbUQsTUFBbkQsR0FBK0Q7SUFDOUUsSUFBQyxDQUFBLFNBQUQsQ0FBQTtJQUVBLElBQUcsQ0FBSSxTQUFKLElBQWtCLENBQUksSUFBQyxDQUFBLGtCQUFELENBQW9CLE1BQU0sQ0FBQyxRQUEzQixDQUF6QjtNQUNDLFNBQUEsR0FBWTtNQUNaLE1BQU0sQ0FBQyxJQUFQLEdBQWM7TUFFZCxJQUFDLENBQUEseUJBQUQsQ0FBMkIsTUFBM0I7TUFFQSxNQUFNLENBQUMsYUFBUCxHQUF1QixNQUFNLENBQUM7TUFDOUIsTUFBTSxDQUFDLE9BQVAsQ0FDQztRQUFBLFVBQUEsRUFDQztVQUFBLFNBQUEsRUFBVyxFQUFYO1VBQ0EsU0FBQSxFQUFXLEVBRFg7VUFFQSxNQUFBLEVBQVEsT0FGUjtVQUdBLENBQUEsRUFBRyxrQkFBQSxHQUFxQixDQUFDLFNBQVMsQ0FBQyxNQUFWLEdBQW1CLEdBQXBCLENBSHhCO1NBREQ7UUFLQSxLQUFBLEVBQU8sY0FMUDtPQUREO0FBUUE7QUFBQTtXQUFBLHFDQUFBOztRQUNDLEtBQUssQ0FBQyxhQUFOLEdBQXNCLEtBQUssQ0FBQztxQkFFNUIsS0FBSyxDQUFDLE9BQU4sQ0FDQztVQUFBLFVBQUEsRUFDQztZQUFBLENBQUEsRUFBRyxrQkFBQSxHQUFxQixDQUFDLEtBQUssQ0FBQyxLQUFOLEdBQWMsQ0FBZixDQUF4QjtZQUNBLE9BQUEsRUFBUyxlQURUO1dBREQ7VUFHQSxLQUFBLEVBQU8sQ0FBQyxTQUFTLENBQUMsTUFBVixHQUFtQixLQUFLLENBQUMsS0FBMUIsQ0FBQSxHQUFtQyxTQUFTLENBQUMsTUFIcEQ7VUFJQSxLQUFBLEVBQU8sY0FKUDtTQUREO0FBSEQ7cUJBZkQ7S0FBQSxNQXlCSyxJQUFHLFNBQUEsSUFBYyxDQUFJLElBQUMsQ0FBQSxrQkFBRCxDQUFvQixNQUFNLENBQUMsUUFBM0IsQ0FBckI7TUFDSixTQUFBLEdBQVk7TUFDWixJQUFDLENBQUEsVUFBRCxDQUFBO01BRUEsZ0JBQUEsR0FBbUIsTUFBTSxDQUFDLFNBQVAsR0FBbUI7TUFFdEMsSUFBRyxJQUFJLENBQUMsR0FBTCxDQUFTLE1BQU0sQ0FBQyxTQUFoQixDQUFBLEdBQTZCLEdBQWhDO1FBQ0MsTUFBTSxDQUFDLGFBQWEsQ0FBQyxTQUFyQixHQUFvQyxnQkFBSCxHQUF5QixDQUFDLEdBQTFCLEdBQW1DLElBRHJFO09BQUEsTUFBQTtRQUdDLE1BQU0sQ0FBQyxhQUFhLENBQUMsU0FBckIsR0FBb0MsZ0JBQUgsR0FBeUIsQ0FBQyxDQUExQixHQUFpQyxFQUhuRTs7TUFLQSxNQUFNLENBQUMsT0FBUCxDQUNDO1FBQUEsVUFBQSxFQUNDO1VBQUEsU0FBQSxFQUFXLE1BQU0sQ0FBQyxhQUFhLENBQUMsU0FBaEM7VUFDQSxTQUFBLEVBQVcsTUFBTSxDQUFDLGFBQWEsQ0FBQyxTQURoQztVQUVBLE1BQUEsRUFBUSxNQUFNLENBQUMsYUFBYSxDQUFDLE1BRjdCO1VBR0EsQ0FBQSxFQUFHLE1BQU0sQ0FBQyxhQUFhLENBQUMsQ0FIeEI7U0FERDtRQUtBLEtBQUEsRUFBTyxjQUxQO09BREQ7QUFRQTtBQUFBLFdBQUEsd0NBQUE7O1lBQWtDLE1BQU0sQ0FBQyxRQUFRLENBQUMsT0FBaEIsQ0FBd0IsS0FBeEIsQ0FBQSxLQUFvQztVQUNyRSxLQUFLLENBQUMsT0FBTixDQUNDO1lBQUEsVUFBQSxFQUFZLEtBQUssQ0FBQyxhQUFsQjtZQUNBLEtBQUEsRUFBTyxjQURQO1dBREQ7O0FBREQ7YUFLQSxNQUFNLENBQUMsSUFBUCxDQUFZLE1BQU0sQ0FBQyxZQUFuQixFQUFpQyxTQUFBO0FBQ2hDLFlBQUE7UUFBQSxNQUFNLENBQUMsSUFBUCxHQUFjO0FBQ2Q7QUFBQTthQUFBLHdDQUFBOztjQUFzRCxNQUFNLENBQUMsUUFBUSxDQUFDLE9BQWhCLENBQXdCLEtBQXhCLENBQUEsS0FBb0M7MEJBQTFGLEtBQUssQ0FBQyxNQUFOLEdBQWU7O0FBQWY7O01BRmdDLENBQWpDLEVBeEJJOztFQWhDYTs7d0JBNERuQix5QkFBQSxHQUEyQixTQUFDLE1BQUQ7QUFDMUIsUUFBQTtBQUFBO1NBQUEsMkNBQUE7O1VBQTRCLEtBQUssQ0FBQyxNQUFOLEtBQWdCO3FCQUMzQyxNQUFNLENBQUMsV0FBUCxDQUFtQixLQUFuQjs7QUFERDs7RUFEMEI7O3dCQUkzQixrQkFBQSxHQUFvQixTQUFDLFdBQUQ7V0FDbkIsQ0FBQyxDQUFDLElBQUYsQ0FBTyxXQUFQLEVBQW9CLFNBQUMsS0FBRDthQUFXLEtBQUssQ0FBQztJQUFqQixDQUFwQjtFQURtQjs7d0JBR3BCLFNBQUEsR0FBVyxTQUFBO1dBQ1YsZUFBQSxHQUFrQixZQUFZLENBQUM7RUFEckI7O3dCQUdYLElBQUEsR0FBTSxTQUFDLENBQUQ7V0FDTCxZQUFZLENBQUMsU0FBYixHQUF5QixlQUFBLEdBQWtCLENBQUMsQ0FBQyxLQUFLLENBQUMsWUFBTixHQUFxQixLQUFLLENBQUMsTUFBNUIsQ0FBQSxHQUFzQyxDQUF2QztFQUR0Qzs7d0JBR04sT0FBQSxHQUFTLFNBQUE7V0FDUixZQUFZLENBQUMsU0FBYixHQUF5QixZQUFZLENBQUMsU0FBYixHQUF5QjtFQUQxQzs7d0JBR1QsU0FBQSxHQUFXLFNBQUE7SUFDVixJQUFHLFlBQUEsS0FBZ0IsTUFBbkI7TUFDQyxZQUFZLENBQUMsT0FBYixDQUNDO1FBQUEsVUFBQSxFQUNDO1VBQUEsZUFBQSxFQUFpQiwwQkFBakI7U0FERDtPQURELEVBREQ7O0lBS0EsWUFBWSxDQUFDLEVBQWIsQ0FBZ0IsTUFBTSxDQUFDLFFBQXZCLEVBQWlDLElBQUMsQ0FBQSxTQUFsQztJQUNBLFlBQVksQ0FBQyxFQUFiLENBQWdCLE1BQU0sQ0FBQyxHQUF2QixFQUE0QixJQUFDLENBQUEsSUFBN0I7V0FDQSxZQUFZLENBQUMsRUFBYixDQUFnQixNQUFNLENBQUMsTUFBdkIsRUFBK0IsSUFBQyxDQUFBLE9BQWhDO0VBUlU7O3dCQVVYLFVBQUEsR0FBWSxTQUFBO0lBQ1gsSUFBRyxZQUFBLEtBQWdCLE1BQW5CO01BQ0MsWUFBWSxDQUFDLE9BQWIsQ0FDQztRQUFBLFVBQUEsRUFDQztVQUFBLGVBQUEsRUFBaUIsYUFBakI7U0FERDtPQURELEVBREQ7O0lBS0EsWUFBWSxDQUFDLEdBQWIsQ0FBaUIsTUFBTSxDQUFDLFFBQXhCLEVBQWtDLElBQUMsQ0FBQSxTQUFuQztJQUNBLFlBQVksQ0FBQyxHQUFiLENBQWlCLE1BQU0sQ0FBQyxHQUF4QixFQUE2QixJQUFDLENBQUEsSUFBOUI7V0FDQSxZQUFZLENBQUMsR0FBYixDQUFpQixNQUFNLENBQUMsTUFBeEIsRUFBZ0MsSUFBQyxDQUFBLE9BQWpDO0VBUlc7Ozs7Ozs7O0FDaEdiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiY2xhc3MgZXhwb3J0cy5QZXJzcGVjdGl2ZSBcblx0YW5pbWF0aW9uQ3VydmUgPSBcInNwcmluZygxMjAsIDIwLCAwLCAwLjA3KVwiXG5cdGFjdGl2YXRlZCA9IGZhbHNlXG5cdHJvdGF0ZU9iamVjdCA9IG51bGxcblx0aW5pdGlhbFJvdGF0aW9uID0gMFxuXG5cdHNjcmVlbiA9IEZyYW1lci5EZXZpY2Uuc2NyZWVuXG5cdGRldmljZSA9IEZyYW1lci5EZXZpY2UucGhvbmVcblx0YWxsTGF5ZXJzID0gbnVsbFxuXG5cdHRvZ2dsZVBlcnNwZWN0aXZlOiAodmVydGljYWxTZXBhcmF0aW9uID0gNDAsIHRlbXBvcmFsT3BhY2l0eSA9IDAuOCkgLT5cblx0XHRhbGxMYXllcnMgPSBGcmFtZXIuQ3VycmVudENvbnRleHQuZ2V0TGF5ZXJzKClcblxuXHRcdCMgRVZFTlRTXG5cdFx0cm90YXRlT2JqZWN0ID0gaWYgRnJhbWVyLkRldmljZS5kZXZpY2VUeXBlIGlzbnQgXCJmdWxsc2NyZWVuXCIgdGhlbiBkZXZpY2UgZWxzZSBzY3JlZW5cblx0XHRAX2V2ZW50c09uKCkgXG5cblx0XHRpZiBub3QgYWN0aXZhdGVkIGFuZCBub3QgQF9jaGlsZHJlbkFuaW1hdGluZyhzY3JlZW4uY2hpbGRyZW4pXG5cdFx0XHRhY3RpdmF0ZWQgPSB0cnVlXG5cdFx0XHRzY3JlZW4uY2xpcCA9IGZhbHNlXG5cblx0XHRcdEBfc2V0QWxsTGF5ZXJzQXNDaGlsZHJlbk9mKHNjcmVlbilcblxuXHRcdFx0ZGV2aWNlLm9yaWdpbmFsUHJvcHMgPSBkZXZpY2UucHJvcHNcblx0XHRcdGRldmljZS5hbmltYXRlXG5cdFx0XHRcdHByb3BlcnRpZXM6XG5cdFx0XHRcdFx0cm90YXRpb25aOiA0NVxuXHRcdFx0XHRcdHJvdGF0aW9uWDogNDVcblx0XHRcdFx0XHRzY2FsZVk6IDAuODYwNjJcblx0XHRcdFx0XHR5OiB2ZXJ0aWNhbFNlcGFyYXRpb24gKiAoYWxsTGF5ZXJzLmxlbmd0aCAvIDMuNClcblx0XHRcdFx0Y3VydmU6IGFuaW1hdGlvbkN1cnZlXG5cblx0XHRcdGZvciBsYXllciBpbiBzY3JlZW4uY2hpbGRyZW5cblx0XHRcdFx0bGF5ZXIub3JpZ2luYWxQcm9wcyA9IGxheWVyLnByb3BzXG5cblx0XHRcdFx0bGF5ZXIuYW5pbWF0ZVxuXHRcdFx0XHRcdHByb3BlcnRpZXM6XG5cdFx0XHRcdFx0XHR6OiB2ZXJ0aWNhbFNlcGFyYXRpb24gKiAobGF5ZXIuaW5kZXggLSAxKVxuXHRcdFx0XHRcdFx0b3BhY2l0eTogdGVtcG9yYWxPcGFjaXR5XG5cdFx0XHRcdFx0ZGVsYXk6IChhbGxMYXllcnMubGVuZ3RoIC0gbGF5ZXIuaW5kZXgpIC8gYWxsTGF5ZXJzLmxlbmd0aFxuXHRcdFx0XHRcdGN1cnZlOiBhbmltYXRpb25DdXJ2ZVxuXG5cdFx0ZWxzZSBpZiBhY3RpdmF0ZWQgYW5kIG5vdCBAX2NoaWxkcmVuQW5pbWF0aW5nKHNjcmVlbi5jaGlsZHJlbilcblx0XHRcdGFjdGl2YXRlZCA9IGZhbHNlXG5cdFx0XHRAX2V2ZW50c09mZigpXG5cblx0XHRcdHJvdGF0aW9uTmVnYXRpdmUgPSBkZXZpY2Uucm90YXRpb25aIDwgMFxuXG5cdFx0XHRpZiBNYXRoLmFicyhkZXZpY2Uucm90YXRpb25aKSA+IDE4MFxuXHRcdFx0XHRkZXZpY2Uub3JpZ2luYWxQcm9wcy5yb3RhdGlvblogPSBpZiByb3RhdGlvbk5lZ2F0aXZlIHRoZW4gLTM2MCBlbHNlIDM2MFxuXHRcdFx0ZWxzZVxuXHRcdFx0XHRkZXZpY2Uub3JpZ2luYWxQcm9wcy5yb3RhdGlvblogPSBpZiByb3RhdGlvbk5lZ2F0aXZlIHRoZW4gLTAgZWxzZSAwXG5cblx0XHRcdGRldmljZS5hbmltYXRlXG5cdFx0XHRcdHByb3BlcnRpZXM6XG5cdFx0XHRcdFx0cm90YXRpb25aOiBkZXZpY2Uub3JpZ2luYWxQcm9wcy5yb3RhdGlvblpcblx0XHRcdFx0XHRyb3RhdGlvblg6IGRldmljZS5vcmlnaW5hbFByb3BzLnJvdGF0aW9uWFxuXHRcdFx0XHRcdHNjYWxlWTogZGV2aWNlLm9yaWdpbmFsUHJvcHMuc2NhbGVZXG5cdFx0XHRcdFx0eTogZGV2aWNlLm9yaWdpbmFsUHJvcHMueSBcblx0XHRcdFx0Y3VydmU6IGFuaW1hdGlvbkN1cnZlXG5cblx0XHRcdGZvciBsYXllciBpbiBzY3JlZW4uY2hpbGRyZW4gd2hlbiBzY3JlZW4uY2hpbGRyZW4uaW5kZXhPZihsYXllcikgaXNudCAwXG5cdFx0XHRcdGxheWVyLmFuaW1hdGVcblx0XHRcdFx0XHRwcm9wZXJ0aWVzOiBsYXllci5vcmlnaW5hbFByb3BzXG5cdFx0XHRcdFx0Y3VydmU6IGFuaW1hdGlvbkN1cnZlXG5cblx0XHRcdGRldmljZS5vbmNlIEV2ZW50cy5BbmltYXRpb25FbmQsIC0+XG5cdFx0XHRcdHNjcmVlbi5jbGlwID0gdHJ1ZVxuXHRcdFx0XHRsYXllci5wYXJlbnQgPSBudWxsIGZvciBsYXllciBpbiBzY3JlZW4uY2hpbGRyZW4gd2hlbiBzY3JlZW4uY2hpbGRyZW4uaW5kZXhPZihsYXllcikgaXNudCAwXG5cblx0X3NldEFsbExheWVyc0FzQ2hpbGRyZW5PZjogKHBhcmVudCkgLT5cblx0XHRmb3IgbGF5ZXIgaW4gYWxsTGF5ZXJzIHdoZW4gbGF5ZXIucGFyZW50IGlzIG51bGxcblx0XHRcdHBhcmVudC5hZGRTdWJMYXllcihsYXllcilcblxuXHRfY2hpbGRyZW5BbmltYXRpbmc6IChsYXllcnNBcnJheSkgLT5cblx0XHRfLnNvbWUgbGF5ZXJzQXJyYXksIChsYXllcikgLT4gbGF5ZXIuaXNBbmltYXRpbmdcblxuXHRfcGFuU3RhcnQ6IC0+XG5cdFx0aW5pdGlhbFJvdGF0aW9uID0gcm90YXRlT2JqZWN0LnJvdGF0aW9uWlxuXG5cdF9wYW46IChlKSAtPlxuXHRcdHJvdGF0ZU9iamVjdC5yb3RhdGlvblogPSBpbml0aWFsUm90YXRpb24gLSAoKGV2ZW50LnRvdWNoQ2VudGVyWCAtIGV2ZW50LnN0YXJ0WCkgLyA0KVxuXG5cdF9wYW5FbmQ6IC0+XG5cdFx0cm90YXRlT2JqZWN0LnJvdGF0aW9uWiA9IHJvdGF0ZU9iamVjdC5yb3RhdGlvblogJSAzNjBcblxuXHRfZXZlbnRzT246IC0+XG5cdFx0aWYgcm90YXRlT2JqZWN0IGlzIHNjcmVlblxuXHRcdFx0cm90YXRlT2JqZWN0LmFuaW1hdGVcblx0XHRcdFx0cHJvcGVydGllczpcblx0XHRcdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IFwicmdiYSgxMjgsIDEyOCwgMTI4LCAwLjIpXCJcblxuXHRcdHJvdGF0ZU9iamVjdC5vbihFdmVudHMuUGFuU3RhcnQsIEBfcGFuU3RhcnQpXG5cdFx0cm90YXRlT2JqZWN0Lm9uKEV2ZW50cy5QYW4sIEBfcGFuKVxuXHRcdHJvdGF0ZU9iamVjdC5vbihFdmVudHMuUGFuRW5kLCBAX3BhbkVuZClcblxuXHRfZXZlbnRzT2ZmOiAtPlxuXHRcdGlmIHJvdGF0ZU9iamVjdCBpcyBzY3JlZW5cblx0XHRcdHJvdGF0ZU9iamVjdC5hbmltYXRlXG5cdFx0XHRcdHByb3BlcnRpZXM6XG5cdFx0XHRcdFx0YmFja2dyb3VuZENvbG9yOiBcInRyYW5zcGFyZW50XCJcblxuXHRcdHJvdGF0ZU9iamVjdC5vZmYoRXZlbnRzLlBhblN0YXJ0LCBAX3BhblN0YXJ0KVxuXHRcdHJvdGF0ZU9iamVjdC5vZmYoRXZlbnRzLlBhbiwgQF9wYW4pXG5cdFx0cm90YXRlT2JqZWN0Lm9mZihFdmVudHMuUGFuRW5kLCBAX3BhbkVuZCkiLCIvLyBHZW5lcmF0ZWQgYnkgQ29mZmVlU2NyaXB0IDEuOS4xXG5leHBvcnRzLlBlcnNwZWN0aXZlID0gKGZ1bmN0aW9uKCkge1xuICB2YXIgYWN0aXZhdGVkLCBhbGxMYXllcnMsIGFuaW1hdGlvbkN1cnZlLCBkZXZpY2UsIGluaXRpYWxSb3RhdGlvbiwgcm90YXRlT2JqZWN0LCBzY3JlZW47XG5cbiAgZnVuY3Rpb24gUGVyc3BlY3RpdmUoKSB7fVxuXG4gIGFuaW1hdGlvbkN1cnZlID0gXCJzcHJpbmcoMTIwLCAyMCwgMCwgMC4wNylcIjtcblxuICBhY3RpdmF0ZWQgPSBmYWxzZTtcblxuICByb3RhdGVPYmplY3QgPSBudWxsO1xuXG4gIGluaXRpYWxSb3RhdGlvbiA9IDA7XG5cbiAgc2NyZWVuID0gRnJhbWVyLkRldmljZS5zY3JlZW47XG5cbiAgZGV2aWNlID0gRnJhbWVyLkRldmljZS5waG9uZTtcblxuICBhbGxMYXllcnMgPSBudWxsO1xuXG4gIFBlcnNwZWN0aXZlLnByb3RvdHlwZS50b2dnbGVQZXJzcGVjdGl2ZSA9IGZ1bmN0aW9uKHZlcnRpY2FsU2VwYXJhdGlvbiwgdGVtcG9yYWxPcGFjaXR5KSB7XG4gICAgdmFyIGksIGosIGxheWVyLCBsZW4sIGxlbjEsIHJlZiwgcmVmMSwgcmVzdWx0cywgcm90YXRpb25OZWdhdGl2ZTtcbiAgICBpZiAodmVydGljYWxTZXBhcmF0aW9uID09IG51bGwpIHtcbiAgICAgIHZlcnRpY2FsU2VwYXJhdGlvbiA9IDQwO1xuICAgIH1cbiAgICBpZiAodGVtcG9yYWxPcGFjaXR5ID09IG51bGwpIHtcbiAgICAgIHRlbXBvcmFsT3BhY2l0eSA9IDAuODtcbiAgICB9XG4gICAgYWxsTGF5ZXJzID0gRnJhbWVyLkN1cnJlbnRDb250ZXh0LmdldExheWVycygpO1xuICAgIHJvdGF0ZU9iamVjdCA9IEZyYW1lci5EZXZpY2UuZGV2aWNlVHlwZSAhPT0gXCJmdWxsc2NyZWVuXCIgPyBkZXZpY2UgOiBzY3JlZW47XG4gICAgdGhpcy5fZXZlbnRzT24oKTtcbiAgICBpZiAoIWFjdGl2YXRlZCAmJiAhdGhpcy5fY2hpbGRyZW5BbmltYXRpbmcoc2NyZWVuLmNoaWxkcmVuKSkge1xuICAgICAgYWN0aXZhdGVkID0gdHJ1ZTtcbiAgICAgIHNjcmVlbi5jbGlwID0gZmFsc2U7XG4gICAgICB0aGlzLl9zZXRBbGxMYXllcnNBc0NoaWxkcmVuT2Yoc2NyZWVuKTtcbiAgICAgIGRldmljZS5vcmlnaW5hbFByb3BzID0gZGV2aWNlLnByb3BzO1xuICAgICAgZGV2aWNlLmFuaW1hdGUoe1xuICAgICAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgICAgcm90YXRpb25aOiA0NSxcbiAgICAgICAgICByb3RhdGlvblg6IDQ1LFxuICAgICAgICAgIHNjYWxlWTogMC44NjA2MixcbiAgICAgICAgICB5OiB2ZXJ0aWNhbFNlcGFyYXRpb24gKiAoYWxsTGF5ZXJzLmxlbmd0aCAvIDMuNClcbiAgICAgICAgfSxcbiAgICAgICAgY3VydmU6IGFuaW1hdGlvbkN1cnZlXG4gICAgICB9KTtcbiAgICAgIHJlZiA9IHNjcmVlbi5jaGlsZHJlbjtcbiAgICAgIHJlc3VsdHMgPSBbXTtcbiAgICAgIGZvciAoaSA9IDAsIGxlbiA9IHJlZi5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgICBsYXllciA9IHJlZltpXTtcbiAgICAgICAgbGF5ZXIub3JpZ2luYWxQcm9wcyA9IGxheWVyLnByb3BzO1xuICAgICAgICByZXN1bHRzLnB1c2gobGF5ZXIuYW5pbWF0ZSh7XG4gICAgICAgICAgcHJvcGVydGllczoge1xuICAgICAgICAgICAgejogdmVydGljYWxTZXBhcmF0aW9uICogKGxheWVyLmluZGV4IC0gMSksXG4gICAgICAgICAgICBvcGFjaXR5OiB0ZW1wb3JhbE9wYWNpdHlcbiAgICAgICAgICB9LFxuICAgICAgICAgIGRlbGF5OiAoYWxsTGF5ZXJzLmxlbmd0aCAtIGxheWVyLmluZGV4KSAvIGFsbExheWVycy5sZW5ndGgsXG4gICAgICAgICAgY3VydmU6IGFuaW1hdGlvbkN1cnZlXG4gICAgICAgIH0pKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiByZXN1bHRzO1xuICAgIH0gZWxzZSBpZiAoYWN0aXZhdGVkICYmICF0aGlzLl9jaGlsZHJlbkFuaW1hdGluZyhzY3JlZW4uY2hpbGRyZW4pKSB7XG4gICAgICBhY3RpdmF0ZWQgPSBmYWxzZTtcbiAgICAgIHRoaXMuX2V2ZW50c09mZigpO1xuICAgICAgcm90YXRpb25OZWdhdGl2ZSA9IGRldmljZS5yb3RhdGlvblogPCAwO1xuICAgICAgaWYgKE1hdGguYWJzKGRldmljZS5yb3RhdGlvblopID4gMTgwKSB7XG4gICAgICAgIGRldmljZS5vcmlnaW5hbFByb3BzLnJvdGF0aW9uWiA9IHJvdGF0aW9uTmVnYXRpdmUgPyAtMzYwIDogMzYwO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZGV2aWNlLm9yaWdpbmFsUHJvcHMucm90YXRpb25aID0gcm90YXRpb25OZWdhdGl2ZSA/IC0wIDogMDtcbiAgICAgIH1cbiAgICAgIGRldmljZS5hbmltYXRlKHtcbiAgICAgICAgcHJvcGVydGllczoge1xuICAgICAgICAgIHJvdGF0aW9uWjogZGV2aWNlLm9yaWdpbmFsUHJvcHMucm90YXRpb25aLFxuICAgICAgICAgIHJvdGF0aW9uWDogZGV2aWNlLm9yaWdpbmFsUHJvcHMucm90YXRpb25YLFxuICAgICAgICAgIHNjYWxlWTogZGV2aWNlLm9yaWdpbmFsUHJvcHMuc2NhbGVZLFxuICAgICAgICAgIHk6IGRldmljZS5vcmlnaW5hbFByb3BzLnlcbiAgICAgICAgfSxcbiAgICAgICAgY3VydmU6IGFuaW1hdGlvbkN1cnZlXG4gICAgICB9KTtcbiAgICAgIHJlZjEgPSBzY3JlZW4uY2hpbGRyZW47XG4gICAgICBmb3IgKGogPSAwLCBsZW4xID0gcmVmMS5sZW5ndGg7IGogPCBsZW4xOyBqKyspIHtcbiAgICAgICAgbGF5ZXIgPSByZWYxW2pdO1xuICAgICAgICBpZiAoc2NyZWVuLmNoaWxkcmVuLmluZGV4T2YobGF5ZXIpICE9PSAwKSB7XG4gICAgICAgICAgbGF5ZXIuYW5pbWF0ZSh7XG4gICAgICAgICAgICBwcm9wZXJ0aWVzOiBsYXllci5vcmlnaW5hbFByb3BzLFxuICAgICAgICAgICAgY3VydmU6IGFuaW1hdGlvbkN1cnZlXG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBkZXZpY2Uub25jZShFdmVudHMuQW5pbWF0aW9uRW5kLCBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGssIGxlbjIsIHJlZjIsIHJlc3VsdHMxO1xuICAgICAgICBzY3JlZW4uY2xpcCA9IHRydWU7XG4gICAgICAgIHJlZjIgPSBzY3JlZW4uY2hpbGRyZW47XG4gICAgICAgIHJlc3VsdHMxID0gW107XG4gICAgICAgIGZvciAoayA9IDAsIGxlbjIgPSByZWYyLmxlbmd0aDsgayA8IGxlbjI7IGsrKykge1xuICAgICAgICAgIGxheWVyID0gcmVmMltrXTtcbiAgICAgICAgICBpZiAoc2NyZWVuLmNoaWxkcmVuLmluZGV4T2YobGF5ZXIpICE9PSAwKSB7XG4gICAgICAgICAgICByZXN1bHRzMS5wdXNoKGxheWVyLnBhcmVudCA9IG51bGwpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0czE7XG4gICAgICB9KTtcbiAgICB9XG4gIH07XG5cbiAgUGVyc3BlY3RpdmUucHJvdG90eXBlLl9zZXRBbGxMYXllcnNBc0NoaWxkcmVuT2YgPSBmdW5jdGlvbihwYXJlbnQpIHtcbiAgICB2YXIgaSwgbGF5ZXIsIGxlbiwgcmVzdWx0cztcbiAgICByZXN1bHRzID0gW107XG4gICAgZm9yIChpID0gMCwgbGVuID0gYWxsTGF5ZXJzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICBsYXllciA9IGFsbExheWVyc1tpXTtcbiAgICAgIGlmIChsYXllci5wYXJlbnQgPT09IG51bGwpIHtcbiAgICAgICAgcmVzdWx0cy5wdXNoKHBhcmVudC5hZGRTdWJMYXllcihsYXllcikpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0cztcbiAgfTtcblxuICBQZXJzcGVjdGl2ZS5wcm90b3R5cGUuX2NoaWxkcmVuQW5pbWF0aW5nID0gZnVuY3Rpb24obGF5ZXJzQXJyYXkpIHtcbiAgICByZXR1cm4gXy5zb21lKGxheWVyc0FycmF5LCBmdW5jdGlvbihsYXllcikge1xuICAgICAgcmV0dXJuIGxheWVyLmlzQW5pbWF0aW5nO1xuICAgIH0pO1xuICB9O1xuXG4gIFBlcnNwZWN0aXZlLnByb3RvdHlwZS5fcGFuU3RhcnQgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gaW5pdGlhbFJvdGF0aW9uID0gcm90YXRlT2JqZWN0LnJvdGF0aW9uWjtcbiAgfTtcblxuICBQZXJzcGVjdGl2ZS5wcm90b3R5cGUuX3BhbiA9IGZ1bmN0aW9uKGUpIHtcbiAgICByZXR1cm4gcm90YXRlT2JqZWN0LnJvdGF0aW9uWiA9IGluaXRpYWxSb3RhdGlvbiAtICgoZXZlbnQudG91Y2hDZW50ZXJYIC0gZXZlbnQuc3RhcnRYKSAvIDQpO1xuICB9O1xuXG4gIFBlcnNwZWN0aXZlLnByb3RvdHlwZS5fcGFuRW5kID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHJvdGF0ZU9iamVjdC5yb3RhdGlvblogPSByb3RhdGVPYmplY3Qucm90YXRpb25aICUgMzYwO1xuICB9O1xuXG4gIFBlcnNwZWN0aXZlLnByb3RvdHlwZS5fZXZlbnRzT24gPSBmdW5jdGlvbigpIHtcbiAgICBpZiAocm90YXRlT2JqZWN0ID09PSBzY3JlZW4pIHtcbiAgICAgIHJvdGF0ZU9iamVjdC5hbmltYXRlKHtcbiAgICAgICAgcHJvcGVydGllczoge1xuICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogXCJyZ2JhKDEyOCwgMTI4LCAxMjgsIDAuMilcIlxuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gICAgcm90YXRlT2JqZWN0Lm9uKEV2ZW50cy5QYW5TdGFydCwgdGhpcy5fcGFuU3RhcnQpO1xuICAgIHJvdGF0ZU9iamVjdC5vbihFdmVudHMuUGFuLCB0aGlzLl9wYW4pO1xuICAgIHJldHVybiByb3RhdGVPYmplY3Qub24oRXZlbnRzLlBhbkVuZCwgdGhpcy5fcGFuRW5kKTtcbiAgfTtcblxuICBQZXJzcGVjdGl2ZS5wcm90b3R5cGUuX2V2ZW50c09mZiA9IGZ1bmN0aW9uKCkge1xuICAgIGlmIChyb3RhdGVPYmplY3QgPT09IHNjcmVlbikge1xuICAgICAgcm90YXRlT2JqZWN0LmFuaW1hdGUoe1xuICAgICAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgICAgYmFja2dyb3VuZENvbG9yOiBcInRyYW5zcGFyZW50XCJcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICAgIHJvdGF0ZU9iamVjdC5vZmYoRXZlbnRzLlBhblN0YXJ0LCB0aGlzLl9wYW5TdGFydCk7XG4gICAgcm90YXRlT2JqZWN0Lm9mZihFdmVudHMuUGFuLCB0aGlzLl9wYW4pO1xuICAgIHJldHVybiByb3RhdGVPYmplY3Qub2ZmKEV2ZW50cy5QYW5FbmQsIHRoaXMuX3BhbkVuZCk7XG4gIH07XG5cbiAgcmV0dXJuIFBlcnNwZWN0aXZlO1xuXG59KSgpO1xuIl19
