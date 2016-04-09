require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"perspective-view":[function(require,module,exports){
exports.PerspectiveView = (function() {
  var activated, allLayers, animationCurve, device, initialRotation, rotateObject, screen;

  function PerspectiveView() {}

  animationCurve = "spring(120, 20, 0, 0.07)";

  activated = false;

  rotateObject = null;

  initialRotation = 0;

  screen = Framer.Device.screen;

  device = Framer.Device.phone;

  allLayers = null;

  PerspectiveView.prototype.togglePerspective = function(verticalSeparation, temporalOpacity) {
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

  PerspectiveView.prototype._setAllLayersAsChildrenOf = function(parent) {
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

  PerspectiveView.prototype._childrenAnimating = function(layersArray) {
    return _.some(layersArray, function(layer) {
      return layer.isAnimating;
    });
  };

  PerspectiveView.prototype._panStart = function() {
    return initialRotation = rotateObject.rotationZ;
  };

  PerspectiveView.prototype._pan = function(e) {
    return rotateObject.rotationZ = initialRotation - ((event.touchCenterX - event.startX) / 4);
  };

  PerspectiveView.prototype._panEnd = function() {
    return rotateObject.rotationZ = rotateObject.rotationZ % 360;
  };

  PerspectiveView.prototype._eventsOn = function() {
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

  PerspectiveView.prototype._eventsOff = function() {
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

  return PerspectiveView;

})();


},{}],"perspective-view":[function(require,module,exports){
// Generated by CoffeeScript 1.9.1
exports.PerspectiveView = (function() {
  var activated, allLayers, animationCurve, device, initialRotation, rotateObject, screen;

  function PerspectiveView() {}

  animationCurve = "spring(120, 20, 0, 0.07)";

  activated = false;

  rotateObject = null;

  initialRotation = 0;

  screen = Framer.Device.screen;

  device = Framer.Device.phone;

  allLayers = null;

  PerspectiveView.prototype.togglePerspective = function(verticalSeparation, temporalOpacity) {
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

  PerspectiveView.prototype._setAllLayersAsChildrenOf = function(parent) {
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

  PerspectiveView.prototype._childrenAnimating = function(layersArray) {
    return _.some(layersArray, function(layer) {
      return layer.isAnimating;
    });
  };

  PerspectiveView.prototype._panStart = function() {
    return initialRotation = rotateObject.rotationZ;
  };

  PerspectiveView.prototype._pan = function(e) {
    return rotateObject.rotationZ = initialRotation - ((event.touchCenterX - event.startX) / 4);
  };

  PerspectiveView.prototype._panEnd = function() {
    return rotateObject.rotationZ = rotateObject.rotationZ % 360;
  };

  PerspectiveView.prototype._eventsOn = function() {
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

  PerspectiveView.prototype._eventsOff = function() {
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

  return PerspectiveView;

})();

},{}]},{},[])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvam9zaG10dWNrZXIvR2l0SHViL3BlcnNwZWN0aXZlLXZpZXcvcGVyc3BlY3RpdmUtdmlldy5mcmFtZXIvbW9kdWxlcy9wZXJzcGVjdGl2ZS12aWV3LmNvZmZlZSIsIi4uLy4uLy4uLy4uLy4uL1VzZXJzL2pvc2htdHVja2VyL0dpdEh1Yi9wZXJzcGVjdGl2ZS12aWV3L3BlcnNwZWN0aXZlLXZpZXcuZnJhbWVyL21vZHVsZXMvcGVyc3BlY3RpdmUtdmlldy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FNLE9BQU8sQ0FBQztBQUNiLE1BQUE7Ozs7RUFBQSxjQUFBLEdBQWlCOztFQUNqQixTQUFBLEdBQVk7O0VBQ1osWUFBQSxHQUFlOztFQUNmLGVBQUEsR0FBa0I7O0VBRWxCLE1BQUEsR0FBUyxNQUFNLENBQUMsTUFBTSxDQUFDOztFQUN2QixNQUFBLEdBQVMsTUFBTSxDQUFDLE1BQU0sQ0FBQzs7RUFDdkIsU0FBQSxHQUFZOzs0QkFFWixpQkFBQSxHQUFtQixTQUFDLGtCQUFELEVBQTBCLGVBQTFCO0FBQ2xCLFFBQUE7O01BRG1CLHFCQUFxQjs7O01BQUksa0JBQWtCOztJQUM5RCxTQUFBLEdBQVksTUFBTSxDQUFDLGNBQWMsQ0FBQyxTQUF0QixDQUFBO0lBR1osWUFBQSxHQUFrQixNQUFNLENBQUMsTUFBTSxDQUFDLFVBQWQsS0FBOEIsWUFBakMsR0FBbUQsTUFBbkQsR0FBK0Q7SUFDOUUsSUFBQyxDQUFBLFNBQUQsQ0FBQTtJQUVBLElBQUcsQ0FBSSxTQUFKLElBQWtCLENBQUksSUFBQyxDQUFBLGtCQUFELENBQW9CLE1BQU0sQ0FBQyxRQUEzQixDQUF6QjtNQUNDLFNBQUEsR0FBWTtNQUNaLE1BQU0sQ0FBQyxJQUFQLEdBQWM7TUFFZCxJQUFDLENBQUEseUJBQUQsQ0FBMkIsTUFBM0I7TUFFQSxNQUFNLENBQUMsYUFBUCxHQUF1QixNQUFNLENBQUM7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Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiY2xhc3MgZXhwb3J0cy5QZXJzcGVjdGl2ZVZpZXcgXG5cdGFuaW1hdGlvbkN1cnZlID0gXCJzcHJpbmcoMTIwLCAyMCwgMCwgMC4wNylcIlxuXHRhY3RpdmF0ZWQgPSBmYWxzZVxuXHRyb3RhdGVPYmplY3QgPSBudWxsXG5cdGluaXRpYWxSb3RhdGlvbiA9IDBcblxuXHRzY3JlZW4gPSBGcmFtZXIuRGV2aWNlLnNjcmVlblxuXHRkZXZpY2UgPSBGcmFtZXIuRGV2aWNlLnBob25lXG5cdGFsbExheWVycyA9IG51bGxcblxuXHR0b2dnbGVQZXJzcGVjdGl2ZTogKHZlcnRpY2FsU2VwYXJhdGlvbiA9IDQwLCB0ZW1wb3JhbE9wYWNpdHkgPSAwLjgpIC0+XG5cdFx0YWxsTGF5ZXJzID0gRnJhbWVyLkN1cnJlbnRDb250ZXh0LmdldExheWVycygpXG5cblx0XHQjIEVWRU5UU1xuXHRcdHJvdGF0ZU9iamVjdCA9IGlmIEZyYW1lci5EZXZpY2UuZGV2aWNlVHlwZSBpc250IFwiZnVsbHNjcmVlblwiIHRoZW4gZGV2aWNlIGVsc2Ugc2NyZWVuXG5cdFx0QF9ldmVudHNPbigpIFxuXG5cdFx0aWYgbm90IGFjdGl2YXRlZCBhbmQgbm90IEBfY2hpbGRyZW5BbmltYXRpbmcoc2NyZWVuLmNoaWxkcmVuKVxuXHRcdFx0YWN0aXZhdGVkID0gdHJ1ZVxuXHRcdFx0c2NyZWVuLmNsaXAgPSBmYWxzZVxuXG5cdFx0XHRAX3NldEFsbExheWVyc0FzQ2hpbGRyZW5PZihzY3JlZW4pXG5cblx0XHRcdGRldmljZS5vcmlnaW5hbFByb3BzID0gZGV2aWNlLnByb3BzXG5cdFx0XHRkZXZpY2UuYW5pbWF0ZVxuXHRcdFx0XHRwcm9wZXJ0aWVzOlxuXHRcdFx0XHRcdHJvdGF0aW9uWjogNDVcblx0XHRcdFx0XHRyb3RhdGlvblg6IDQ1XG5cdFx0XHRcdFx0c2NhbGVZOiAwLjg2MDYyXG5cdFx0XHRcdFx0eTogdmVydGljYWxTZXBhcmF0aW9uICogKGFsbExheWVycy5sZW5ndGggLyAzLjQpXG5cdFx0XHRcdGN1cnZlOiBhbmltYXRpb25DdXJ2ZVxuXG5cdFx0XHRmb3IgbGF5ZXIgaW4gc2NyZWVuLmNoaWxkcmVuXG5cdFx0XHRcdGxheWVyLm9yaWdpbmFsUHJvcHMgPSBsYXllci5wcm9wc1xuXG5cdFx0XHRcdGxheWVyLmFuaW1hdGVcblx0XHRcdFx0XHRwcm9wZXJ0aWVzOlxuXHRcdFx0XHRcdFx0ejogdmVydGljYWxTZXBhcmF0aW9uICogKGxheWVyLmluZGV4IC0gMSlcblx0XHRcdFx0XHRcdG9wYWNpdHk6IHRlbXBvcmFsT3BhY2l0eVxuXHRcdFx0XHRcdGRlbGF5OiAoYWxsTGF5ZXJzLmxlbmd0aCAtIGxheWVyLmluZGV4KSAvIGFsbExheWVycy5sZW5ndGhcblx0XHRcdFx0XHRjdXJ2ZTogYW5pbWF0aW9uQ3VydmVcblxuXHRcdGVsc2UgaWYgYWN0aXZhdGVkIGFuZCBub3QgQF9jaGlsZHJlbkFuaW1hdGluZyhzY3JlZW4uY2hpbGRyZW4pXG5cdFx0XHRhY3RpdmF0ZWQgPSBmYWxzZVxuXHRcdFx0QF9ldmVudHNPZmYoKVxuXG5cdFx0XHRyb3RhdGlvbk5lZ2F0aXZlID0gZGV2aWNlLnJvdGF0aW9uWiA8IDBcblxuXHRcdFx0aWYgTWF0aC5hYnMoZGV2aWNlLnJvdGF0aW9uWikgPiAxODBcblx0XHRcdFx0ZGV2aWNlLm9yaWdpbmFsUHJvcHMucm90YXRpb25aID0gaWYgcm90YXRpb25OZWdhdGl2ZSB0aGVuIC0zNjAgZWxzZSAzNjBcblx0XHRcdGVsc2Vcblx0XHRcdFx0ZGV2aWNlLm9yaWdpbmFsUHJvcHMucm90YXRpb25aID0gaWYgcm90YXRpb25OZWdhdGl2ZSB0aGVuIC0wIGVsc2UgMFxuXG5cdFx0XHRkZXZpY2UuYW5pbWF0ZVxuXHRcdFx0XHRwcm9wZXJ0aWVzOlxuXHRcdFx0XHRcdHJvdGF0aW9uWjogZGV2aWNlLm9yaWdpbmFsUHJvcHMucm90YXRpb25aXG5cdFx0XHRcdFx0cm90YXRpb25YOiBkZXZpY2Uub3JpZ2luYWxQcm9wcy5yb3RhdGlvblhcblx0XHRcdFx0XHRzY2FsZVk6IGRldmljZS5vcmlnaW5hbFByb3BzLnNjYWxlWVxuXHRcdFx0XHRcdHk6IGRldmljZS5vcmlnaW5hbFByb3BzLnkgXG5cdFx0XHRcdGN1cnZlOiBhbmltYXRpb25DdXJ2ZVxuXG5cdFx0XHRmb3IgbGF5ZXIgaW4gc2NyZWVuLmNoaWxkcmVuIHdoZW4gc2NyZWVuLmNoaWxkcmVuLmluZGV4T2YobGF5ZXIpIGlzbnQgMFxuXHRcdFx0XHRsYXllci5hbmltYXRlXG5cdFx0XHRcdFx0cHJvcGVydGllczogbGF5ZXIub3JpZ2luYWxQcm9wc1xuXHRcdFx0XHRcdGN1cnZlOiBhbmltYXRpb25DdXJ2ZVxuXG5cdFx0XHRkZXZpY2Uub25jZSBFdmVudHMuQW5pbWF0aW9uRW5kLCAtPlxuXHRcdFx0XHRzY3JlZW4uY2xpcCA9IHRydWVcblx0XHRcdFx0bGF5ZXIucGFyZW50ID0gbnVsbCBmb3IgbGF5ZXIgaW4gc2NyZWVuLmNoaWxkcmVuIHdoZW4gc2NyZWVuLmNoaWxkcmVuLmluZGV4T2YobGF5ZXIpIGlzbnQgMFxuXG5cdF9zZXRBbGxMYXllcnNBc0NoaWxkcmVuT2Y6IChwYXJlbnQpIC0+XG5cdFx0Zm9yIGxheWVyIGluIGFsbExheWVycyB3aGVuIGxheWVyLnBhcmVudCBpcyBudWxsXG5cdFx0XHRwYXJlbnQuYWRkU3ViTGF5ZXIobGF5ZXIpXG5cblx0X2NoaWxkcmVuQW5pbWF0aW5nOiAobGF5ZXJzQXJyYXkpIC0+XG5cdFx0Xy5zb21lIGxheWVyc0FycmF5LCAobGF5ZXIpIC0+IGxheWVyLmlzQW5pbWF0aW5nXG5cblx0X3BhblN0YXJ0OiAtPlxuXHRcdGluaXRpYWxSb3RhdGlvbiA9IHJvdGF0ZU9iamVjdC5yb3RhdGlvblpcblxuXHRfcGFuOiAoZSkgLT5cblx0XHRyb3RhdGVPYmplY3Qucm90YXRpb25aID0gaW5pdGlhbFJvdGF0aW9uIC0gKChldmVudC50b3VjaENlbnRlclggLSBldmVudC5zdGFydFgpIC8gNClcblxuXHRfcGFuRW5kOiAtPlxuXHRcdHJvdGF0ZU9iamVjdC5yb3RhdGlvblogPSByb3RhdGVPYmplY3Qucm90YXRpb25aICUgMzYwXG5cblx0X2V2ZW50c09uOiAtPlxuXHRcdGlmIHJvdGF0ZU9iamVjdCBpcyBzY3JlZW5cblx0XHRcdHJvdGF0ZU9iamVjdC5hbmltYXRlXG5cdFx0XHRcdHByb3BlcnRpZXM6XG5cdFx0XHRcdFx0YmFja2dyb3VuZENvbG9yOiBcInJnYmEoMTI4LCAxMjgsIDEyOCwgMC4yKVwiXG5cblx0XHRyb3RhdGVPYmplY3Qub24oRXZlbnRzLlBhblN0YXJ0LCBAX3BhblN0YXJ0KVxuXHRcdHJvdGF0ZU9iamVjdC5vbihFdmVudHMuUGFuLCBAX3Bhbilcblx0XHRyb3RhdGVPYmplY3Qub24oRXZlbnRzLlBhbkVuZCwgQF9wYW5FbmQpXG5cblx0X2V2ZW50c09mZjogLT5cblx0XHRpZiByb3RhdGVPYmplY3QgaXMgc2NyZWVuXG5cdFx0XHRyb3RhdGVPYmplY3QuYW5pbWF0ZVxuXHRcdFx0XHRwcm9wZXJ0aWVzOlxuXHRcdFx0XHRcdGJhY2tncm91bmRDb2xvcjogXCJ0cmFuc3BhcmVudFwiXG5cblx0XHRyb3RhdGVPYmplY3Qub2ZmKEV2ZW50cy5QYW5TdGFydCwgQF9wYW5TdGFydClcblx0XHRyb3RhdGVPYmplY3Qub2ZmKEV2ZW50cy5QYW4sIEBfcGFuKVxuXHRcdHJvdGF0ZU9iamVjdC5vZmYoRXZlbnRzLlBhbkVuZCwgQF9wYW5FbmQpIiwiLy8gR2VuZXJhdGVkIGJ5IENvZmZlZVNjcmlwdCAxLjkuMVxuZXhwb3J0cy5QZXJzcGVjdGl2ZVZpZXcgPSAoZnVuY3Rpb24oKSB7XG4gIHZhciBhY3RpdmF0ZWQsIGFsbExheWVycywgYW5pbWF0aW9uQ3VydmUsIGRldmljZSwgaW5pdGlhbFJvdGF0aW9uLCByb3RhdGVPYmplY3QsIHNjcmVlbjtcblxuICBmdW5jdGlvbiBQZXJzcGVjdGl2ZVZpZXcoKSB7fVxuXG4gIGFuaW1hdGlvbkN1cnZlID0gXCJzcHJpbmcoMTIwLCAyMCwgMCwgMC4wNylcIjtcblxuICBhY3RpdmF0ZWQgPSBmYWxzZTtcblxuICByb3RhdGVPYmplY3QgPSBudWxsO1xuXG4gIGluaXRpYWxSb3RhdGlvbiA9IDA7XG5cbiAgc2NyZWVuID0gRnJhbWVyLkRldmljZS5zY3JlZW47XG5cbiAgZGV2aWNlID0gRnJhbWVyLkRldmljZS5waG9uZTtcblxuICBhbGxMYXllcnMgPSBudWxsO1xuXG4gIFBlcnNwZWN0aXZlVmlldy5wcm90b3R5cGUudG9nZ2xlUGVyc3BlY3RpdmUgPSBmdW5jdGlvbih2ZXJ0aWNhbFNlcGFyYXRpb24sIHRlbXBvcmFsT3BhY2l0eSkge1xuICAgIHZhciBpLCBqLCBsYXllciwgbGVuLCBsZW4xLCByZWYsIHJlZjEsIHJlc3VsdHMsIHJvdGF0aW9uTmVnYXRpdmU7XG4gICAgaWYgKHZlcnRpY2FsU2VwYXJhdGlvbiA9PSBudWxsKSB7XG4gICAgICB2ZXJ0aWNhbFNlcGFyYXRpb24gPSA0MDtcbiAgICB9XG4gICAgaWYgKHRlbXBvcmFsT3BhY2l0eSA9PSBudWxsKSB7XG4gICAgICB0ZW1wb3JhbE9wYWNpdHkgPSAwLjg7XG4gICAgfVxuICAgIGFsbExheWVycyA9IEZyYW1lci5DdXJyZW50Q29udGV4dC5nZXRMYXllcnMoKTtcbiAgICByb3RhdGVPYmplY3QgPSBGcmFtZXIuRGV2aWNlLmRldmljZVR5cGUgIT09IFwiZnVsbHNjcmVlblwiID8gZGV2aWNlIDogc2NyZWVuO1xuICAgIHRoaXMuX2V2ZW50c09uKCk7XG4gICAgaWYgKCFhY3RpdmF0ZWQgJiYgIXRoaXMuX2NoaWxkcmVuQW5pbWF0aW5nKHNjcmVlbi5jaGlsZHJlbikpIHtcbiAgICAgIGFjdGl2YXRlZCA9IHRydWU7XG4gICAgICBzY3JlZW4uY2xpcCA9IGZhbHNlO1xuICAgICAgdGhpcy5fc2V0QWxsTGF5ZXJzQXNDaGlsZHJlbk9mKHNjcmVlbik7XG4gICAgICBkZXZpY2Uub3JpZ2luYWxQcm9wcyA9IGRldmljZS5wcm9wcztcbiAgICAgIGRldmljZS5hbmltYXRlKHtcbiAgICAgICAgcHJvcGVydGllczoge1xuICAgICAgICAgIHJvdGF0aW9uWjogNDUsXG4gICAgICAgICAgcm90YXRpb25YOiA0NSxcbiAgICAgICAgICBzY2FsZVk6IDAuODYwNjIsXG4gICAgICAgICAgeTogdmVydGljYWxTZXBhcmF0aW9uICogKGFsbExheWVycy5sZW5ndGggLyAzLjQpXG4gICAgICAgIH0sXG4gICAgICAgIGN1cnZlOiBhbmltYXRpb25DdXJ2ZVxuICAgICAgfSk7XG4gICAgICByZWYgPSBzY3JlZW4uY2hpbGRyZW47XG4gICAgICByZXN1bHRzID0gW107XG4gICAgICBmb3IgKGkgPSAwLCBsZW4gPSByZWYubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgbGF5ZXIgPSByZWZbaV07XG4gICAgICAgIGxheWVyLm9yaWdpbmFsUHJvcHMgPSBsYXllci5wcm9wcztcbiAgICAgICAgcmVzdWx0cy5wdXNoKGxheWVyLmFuaW1hdGUoe1xuICAgICAgICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgICAgIHo6IHZlcnRpY2FsU2VwYXJhdGlvbiAqIChsYXllci5pbmRleCAtIDEpLFxuICAgICAgICAgICAgb3BhY2l0eTogdGVtcG9yYWxPcGFjaXR5XG4gICAgICAgICAgfSxcbiAgICAgICAgICBkZWxheTogKGFsbExheWVycy5sZW5ndGggLSBsYXllci5pbmRleCkgLyBhbGxMYXllcnMubGVuZ3RoLFxuICAgICAgICAgIGN1cnZlOiBhbmltYXRpb25DdXJ2ZVxuICAgICAgICB9KSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gcmVzdWx0cztcbiAgICB9IGVsc2UgaWYgKGFjdGl2YXRlZCAmJiAhdGhpcy5fY2hpbGRyZW5BbmltYXRpbmcoc2NyZWVuLmNoaWxkcmVuKSkge1xuICAgICAgYWN0aXZhdGVkID0gZmFsc2U7XG4gICAgICB0aGlzLl9ldmVudHNPZmYoKTtcbiAgICAgIHJvdGF0aW9uTmVnYXRpdmUgPSBkZXZpY2Uucm90YXRpb25aIDwgMDtcbiAgICAgIGlmIChNYXRoLmFicyhkZXZpY2Uucm90YXRpb25aKSA+IDE4MCkge1xuICAgICAgICBkZXZpY2Uub3JpZ2luYWxQcm9wcy5yb3RhdGlvblogPSByb3RhdGlvbk5lZ2F0aXZlID8gLTM2MCA6IDM2MDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGRldmljZS5vcmlnaW5hbFByb3BzLnJvdGF0aW9uWiA9IHJvdGF0aW9uTmVnYXRpdmUgPyAtMCA6IDA7XG4gICAgICB9XG4gICAgICBkZXZpY2UuYW5pbWF0ZSh7XG4gICAgICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgICByb3RhdGlvblo6IGRldmljZS5vcmlnaW5hbFByb3BzLnJvdGF0aW9uWixcbiAgICAgICAgICByb3RhdGlvblg6IGRldmljZS5vcmlnaW5hbFByb3BzLnJvdGF0aW9uWCxcbiAgICAgICAgICBzY2FsZVk6IGRldmljZS5vcmlnaW5hbFByb3BzLnNjYWxlWSxcbiAgICAgICAgICB5OiBkZXZpY2Uub3JpZ2luYWxQcm9wcy55XG4gICAgICAgIH0sXG4gICAgICAgIGN1cnZlOiBhbmltYXRpb25DdXJ2ZVxuICAgICAgfSk7XG4gICAgICByZWYxID0gc2NyZWVuLmNoaWxkcmVuO1xuICAgICAgZm9yIChqID0gMCwgbGVuMSA9IHJlZjEubGVuZ3RoOyBqIDwgbGVuMTsgaisrKSB7XG4gICAgICAgIGxheWVyID0gcmVmMVtqXTtcbiAgICAgICAgaWYgKHNjcmVlbi5jaGlsZHJlbi5pbmRleE9mKGxheWVyKSAhPT0gMCkge1xuICAgICAgICAgIGxheWVyLmFuaW1hdGUoe1xuICAgICAgICAgICAgcHJvcGVydGllczogbGF5ZXIub3JpZ2luYWxQcm9wcyxcbiAgICAgICAgICAgIGN1cnZlOiBhbmltYXRpb25DdXJ2ZVxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gZGV2aWNlLm9uY2UoRXZlbnRzLkFuaW1hdGlvbkVuZCwgZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBrLCBsZW4yLCByZWYyLCByZXN1bHRzMTtcbiAgICAgICAgc2NyZWVuLmNsaXAgPSB0cnVlO1xuICAgICAgICByZWYyID0gc2NyZWVuLmNoaWxkcmVuO1xuICAgICAgICByZXN1bHRzMSA9IFtdO1xuICAgICAgICBmb3IgKGsgPSAwLCBsZW4yID0gcmVmMi5sZW5ndGg7IGsgPCBsZW4yOyBrKyspIHtcbiAgICAgICAgICBsYXllciA9IHJlZjJba107XG4gICAgICAgICAgaWYgKHNjcmVlbi5jaGlsZHJlbi5pbmRleE9mKGxheWVyKSAhPT0gMCkge1xuICAgICAgICAgICAgcmVzdWx0czEucHVzaChsYXllci5wYXJlbnQgPSBudWxsKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdHMxO1xuICAgICAgfSk7XG4gICAgfVxuICB9O1xuXG4gIFBlcnNwZWN0aXZlVmlldy5wcm90b3R5cGUuX3NldEFsbExheWVyc0FzQ2hpbGRyZW5PZiA9IGZ1bmN0aW9uKHBhcmVudCkge1xuICAgIHZhciBpLCBsYXllciwgbGVuLCByZXN1bHRzO1xuICAgIHJlc3VsdHMgPSBbXTtcbiAgICBmb3IgKGkgPSAwLCBsZW4gPSBhbGxMYXllcnMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgIGxheWVyID0gYWxsTGF5ZXJzW2ldO1xuICAgICAgaWYgKGxheWVyLnBhcmVudCA9PT0gbnVsbCkge1xuICAgICAgICByZXN1bHRzLnB1c2gocGFyZW50LmFkZFN1YkxheWVyKGxheWVyKSk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiByZXN1bHRzO1xuICB9O1xuXG4gIFBlcnNwZWN0aXZlVmlldy5wcm90b3R5cGUuX2NoaWxkcmVuQW5pbWF0aW5nID0gZnVuY3Rpb24obGF5ZXJzQXJyYXkpIHtcbiAgICByZXR1cm4gXy5zb21lKGxheWVyc0FycmF5LCBmdW5jdGlvbihsYXllcikge1xuICAgICAgcmV0dXJuIGxheWVyLmlzQW5pbWF0aW5nO1xuICAgIH0pO1xuICB9O1xuXG4gIFBlcnNwZWN0aXZlVmlldy5wcm90b3R5cGUuX3BhblN0YXJ0ID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIGluaXRpYWxSb3RhdGlvbiA9IHJvdGF0ZU9iamVjdC5yb3RhdGlvblo7XG4gIH07XG5cbiAgUGVyc3BlY3RpdmVWaWV3LnByb3RvdHlwZS5fcGFuID0gZnVuY3Rpb24oZSkge1xuICAgIHJldHVybiByb3RhdGVPYmplY3Qucm90YXRpb25aID0gaW5pdGlhbFJvdGF0aW9uIC0gKChldmVudC50b3VjaENlbnRlclggLSBldmVudC5zdGFydFgpIC8gNCk7XG4gIH07XG5cbiAgUGVyc3BlY3RpdmVWaWV3LnByb3RvdHlwZS5fcGFuRW5kID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHJvdGF0ZU9iamVjdC5yb3RhdGlvblogPSByb3RhdGVPYmplY3Qucm90YXRpb25aICUgMzYwO1xuICB9O1xuXG4gIFBlcnNwZWN0aXZlVmlldy5wcm90b3R5cGUuX2V2ZW50c09uID0gZnVuY3Rpb24oKSB7XG4gICAgaWYgKHJvdGF0ZU9iamVjdCA9PT0gc2NyZWVuKSB7XG4gICAgICByb3RhdGVPYmplY3QuYW5pbWF0ZSh7XG4gICAgICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6IFwicmdiYSgxMjgsIDEyOCwgMTI4LCAwLjIpXCJcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICAgIHJvdGF0ZU9iamVjdC5vbihFdmVudHMuUGFuU3RhcnQsIHRoaXMuX3BhblN0YXJ0KTtcbiAgICByb3RhdGVPYmplY3Qub24oRXZlbnRzLlBhbiwgdGhpcy5fcGFuKTtcbiAgICByZXR1cm4gcm90YXRlT2JqZWN0Lm9uKEV2ZW50cy5QYW5FbmQsIHRoaXMuX3BhbkVuZCk7XG4gIH07XG5cbiAgUGVyc3BlY3RpdmVWaWV3LnByb3RvdHlwZS5fZXZlbnRzT2ZmID0gZnVuY3Rpb24oKSB7XG4gICAgaWYgKHJvdGF0ZU9iamVjdCA9PT0gc2NyZWVuKSB7XG4gICAgICByb3RhdGVPYmplY3QuYW5pbWF0ZSh7XG4gICAgICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6IFwidHJhbnNwYXJlbnRcIlxuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gICAgcm90YXRlT2JqZWN0Lm9mZihFdmVudHMuUGFuU3RhcnQsIHRoaXMuX3BhblN0YXJ0KTtcbiAgICByb3RhdGVPYmplY3Qub2ZmKEV2ZW50cy5QYW4sIHRoaXMuX3Bhbik7XG4gICAgcmV0dXJuIHJvdGF0ZU9iamVjdC5vZmYoRXZlbnRzLlBhbkVuZCwgdGhpcy5fcGFuRW5kKTtcbiAgfTtcblxuICByZXR1cm4gUGVyc3BlY3RpdmVWaWV3O1xuXG59KSgpO1xuIl19
