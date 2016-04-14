require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"perspective-view":[function(require,module,exports){
exports.PerspectiveView = (function() {
  var _childrenAnimating, _keyDownTextField, _pan, _panEnd, _panStart, _setAllLayersAsChildrenOf, activated, animationCurve, initialRotation, panningRatio, rotationParent;

  function PerspectiveView() {}

  animationCurve = "spring(120, 20, 0, 0.07)";

  activated = false;

  initialRotation = null;

  panningRatio = 4;

  Screen.perspective = 0;

  rotationParent = Framer.Device.phone;

  rotationParent.orgProps = rotationParent.props;

  _setAllLayersAsChildrenOf = function(parent) {
    var j, layer, len, ref, results;
    ref = Framer.CurrentContext.getLayers();
    results = [];
    for (j = 0, len = ref.length; j < len; j++) {
      layer = ref[j];
      if (!(layer.parent === null && rotationParent.children.indexOf(layer) !== 0)) {
        continue;
      }
      rotationParent.addChild(layer);
      layer.x = layer.x + Framer.Device.screen.x;
      layer.y = layer.y + Framer.Device.screen.y;
      results.push(layer.initialZ = null);
    }
    return results;
  };

  _childrenAnimating = function(layersArray) {
    return _.some(layersArray, function(layer) {
      return layer.isAnimating;
    });
  };

  _panStart = function() {
    var j, layer, len, ref, results;
    initialRotation = rotationParent.rotationZ;
    ref = rotationParent.children;
    results = [];
    for (j = 0, len = ref.length; j < len; j++) {
      layer = ref[j];
      if (layer !== Framer.Device.screen) {
        results.push(layer.initialZ = layer.z);
      }
    }
    return results;
  };

  _pan = function(event) {
    var i, j, layer, len, ref, results;
    rotationParent.rotationZ = initialRotation - ((event.touchCenterX - event.startX) / panningRatio);
    ref = rotationParent.children;
    results = [];
    for (i = j = 0, len = ref.length; j < len; i = ++j) {
      layer = ref[i];
      if (_.last(rotationParent.children).z !== 1) {
        results.push(layer.z = layer.initialZ - (((event.touchCenterY - event.startY) * (i - 1)) / panningRatio));
      }
    }
    return results;
  };

  _panEnd = function() {
    return rotationParent.rotationZ = rotationParent.rotationZ % 360;
  };

  _keyDownTextField = function(e) {
    if (e.keyCode === 13) {
      print(PerspectiveView);
      return PerspectiveView.toggle();
    }
  };

  PerspectiveView.prototype.toggle = function(rotation, z, opacity) {
    var j, k, layer, len, len1, ref, ref1, results, rotationNegative;
    if (rotation == null) {
      rotation = true;
    }
    if (z == null) {
      z = 40;
    }
    if (opacity == null) {
      opacity = 0.8;
    }
    if (!activated && !_childrenAnimating(rotationParent.children)) {
      activated = true;
      _setAllLayersAsChildrenOf(rotationParent);
      if (rotation) {
        rotationParent.on(Events.PanStart, _panStart);
        rotationParent.on(Events.Pan, _pan);
        rotationParent.on(Events.PanEnd, _panEnd);
      }
      rotationParent.animate({
        properties: {
          rotationZ: 45,
          rotationX: 45,
          scaleY: 0.86062,
          y: z * (rotationParent.children.length / 3.5)
        },
        curve: animationCurve
      });
      ref = rotationParent.children;
      results = [];
      for (j = 0, len = ref.length; j < len; j++) {
        layer = ref[j];
        if (!(layer !== Framer.Device.screen)) {
          continue;
        }
        layer.orgProps = layer.props;
        results.push(layer.animate({
          properties: {
            z: z * (layer.index - 2),
            opacity: opacity
          },
          delay: (rotationParent.children.length - layer.index) / rotationParent.children.length,
          curve: animationCurve
        }));
      }
      return results;
    } else if (activated && !_childrenAnimating(rotationParent.children)) {
      activated = false;
      if (rotation) {
        rotationParent.off(Events.PanStart, _panStart);
        rotationParent.off(Events.Pan, _pan);
        rotationParent.off(Events.PanEnd, _panEnd);
      }
      rotationNegative = rotationParent.rotationZ < 0;
      if (Math.abs(rotationParent.rotationZ % 360) > 180) {
        rotationParent.orgProps.rotationZ = rotationNegative ? -360 : 360;
      } else {
        rotationParent.orgProps.rotationZ = rotationNegative ? -0 : 0;
      }
      rotationParent.animate({
        properties: {
          rotationZ: rotationParent.orgProps.rotationZ,
          rotationX: rotationParent.orgProps.rotationX,
          scaleY: rotationParent.orgProps.scaleY,
          y: rotationParent.orgProps.y
        },
        curve: animationCurve
      });
      ref1 = rotationParent.children;
      for (k = 0, len1 = ref1.length; k < len1; k++) {
        layer = ref1[k];
        layer.animate({
          properties: layer.orgProps,
          curve: animationCurve
        });
      }
      return rotationParent.once(Events.AnimationEnd, function() {
        var l, len2, ref2, results1;
        rotationParent.rotationZ = 0;
        ref2 = rotationParent.children;
        results1 = [];
        for (l = 0, len2 = ref2.length; l < len2; l++) {
          layer = ref2[l];
          if (!(rotationParent.children.indexOf(layer) !== 0)) {
            continue;
          }
          layer.parent = null;
          layer.x = layer.x - Framer.Device.screen.x;
          results1.push(layer.y = layer.y - Framer.Device.screen.y);
        }
        return results1;
      });
    }
  };

  return PerspectiveView;

})();


},{}]},{},[])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvZnJhbnAvRHJvcGJveC9Qcm90b3R5cGVzL3BlcnNwZWN0aXZlLXZpZXcvcGVyc3BlY3RpdmUtdmlldy5mcmFtZXIvbW9kdWxlcy9wZXJzcGVjdGl2ZS12aWV3LmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FNLE9BQU8sQ0FBQztBQUNiLE1BQUE7Ozs7RUFBQSxjQUFBLEdBQWlCOztFQUNqQixTQUFBLEdBQVk7O0VBQ1osZUFBQSxHQUFrQjs7RUFDbEIsWUFBQSxHQUFlOztFQUVmLE1BQU0sQ0FBQyxXQUFQLEdBQXFCOztFQUVyQixjQUFBLEdBQWlCLE1BQU0sQ0FBQyxNQUFNLENBQUM7O0VBQy9CLGNBQWMsQ0FBQyxRQUFmLEdBQTBCLGNBQWMsQ0FBQzs7RUFFekMseUJBQUEsR0FBNEIsU0FBQyxNQUFEO0FBQzNCLFFBQUE7QUFBQTtBQUFBO1NBQUEscUNBQUE7O1lBQW9ELEtBQUssQ0FBQyxNQUFOLEtBQWdCLElBQWhCLElBQXlCLGNBQWMsQ0FBQyxRQUFRLENBQUMsT0FBeEIsQ0FBZ0MsS0FBaEMsQ0FBQSxLQUE0Qzs7O01BQ3hILGNBQWMsQ0FBQyxRQUFmLENBQXdCLEtBQXhCO01BRUEsS0FBSyxDQUFDLENBQU4sR0FBVSxLQUFLLENBQUMsQ0FBTixHQUFVLE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDO01BQ3pDLEtBQUssQ0FBQyxDQUFOLEdBQVUsS0FBSyxDQUFDLENBQU4sR0FBVSxNQUFNLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQzttQkFFekMsS0FBSyxDQUFDLFFBQU4sR0FBaUI7QUFObEI7O0VBRDJCOztFQVM1QixrQkFBQSxHQUFxQixTQUFDLFdBQUQ7V0FDcEIsQ0FBQyxDQUFDLElBQUYsQ0FBTyxXQUFQLEVBQW9CLFNBQUMsS0FBRDthQUFXLEtBQUssQ0FBQztJQUFqQixDQUFw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QUE7O2dCQUEwQyxjQUFjLENBQUMsUUFBUSxDQUFDLE9BQXhCLENBQWdDLEtBQWhDLENBQUEsS0FBNEM7OztVQUNyRixLQUFLLENBQUMsTUFBTixHQUFlO1VBRWYsS0FBSyxDQUFDLENBQU4sR0FBVSxLQUFLLENBQUMsQ0FBTixHQUFVLE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDO3dCQUN6QyxLQUFLLENBQUMsQ0FBTixHQUFVLEtBQUssQ0FBQyxDQUFOLEdBQVUsTUFBTSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUM7QUFKMUM7O01BRndDLENBQXpDLEVBL0JJOztFQWxDRSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJjbGFzcyBleHBvcnRzLlBlcnNwZWN0aXZlVmlld1xuXHRhbmltYXRpb25DdXJ2ZSA9IFwic3ByaW5nKDEyMCwgMjAsIDAsIDAuMDcpXCJcblx0YWN0aXZhdGVkID0gZmFsc2Vcblx0aW5pdGlhbFJvdGF0aW9uID0gbnVsbFxuXHRwYW5uaW5nUmF0aW8gPSA0XG5cblx0U2NyZWVuLnBlcnNwZWN0aXZlID0gMFxuXG5cdHJvdGF0aW9uUGFyZW50ID0gRnJhbWVyLkRldmljZS5waG9uZVxuXHRyb3RhdGlvblBhcmVudC5vcmdQcm9wcyA9IHJvdGF0aW9uUGFyZW50LnByb3BzXG5cblx0X3NldEFsbExheWVyc0FzQ2hpbGRyZW5PZiA9IChwYXJlbnQpIC0+XG5cdFx0Zm9yIGxheWVyIGluIEZyYW1lci5DdXJyZW50Q29udGV4dC5nZXRMYXllcnMoKSB3aGVuIGxheWVyLnBhcmVudCBpcyBudWxsIGFuZCByb3RhdGlvblBhcmVudC5jaGlsZHJlbi5pbmRleE9mKGxheWVyKSBpc250IDBcblx0XHRcdHJvdGF0aW9uUGFyZW50LmFkZENoaWxkKGxheWVyKVxuXG5cdFx0XHRsYXllci54ID0gbGF5ZXIueCArIEZyYW1lci5EZXZpY2Uuc2NyZWVuLnhcblx0XHRcdGxheWVyLnkgPSBsYXllci55ICsgRnJhbWVyLkRldmljZS5zY3JlZW4ueVxuXG5cdFx0XHRsYXllci5pbml0aWFsWiA9IG51bGxcblxuXHRfY2hpbGRyZW5BbmltYXRpbmcgPSAobGF5ZXJzQXJyYXkpIC0+XG5cdFx0Xy5zb21lIGxheWVyc0FycmF5LCAobGF5ZXIpIC0+IGxheWVyLmlzQW5pbWF0aW5nXG5cblx0X3BhblN0YXJ0ID0gLT5cblx0XHRpbml0aWFsUm90YXRpb24gPSByb3RhdGlvblBhcmVudC5yb3RhdGlvblpcblxuXHRcdGxheWVyLmluaXRpYWxaID0gbGF5ZXIueiBmb3IgbGF5ZXIgaW4gcm90YXRpb25QYXJlbnQuY2hpbGRyZW4gd2hlbiBsYXllciBpc250IEZyYW1lci5EZXZpY2Uuc2NyZWVuXG5cblx0X3BhbiA9IChldmVudCkgLT5cblx0XHRyb3RhdGlvblBhcmVudC5yb3RhdGlvblogPSBpbml0aWFsUm90YXRpb24gLSAoKGV2ZW50LnRvdWNoQ2VudGVyWCAtIGV2ZW50LnN0YXJ0WCkgLyBwYW5uaW5nUmF0aW8pXG5cblx0XHRmb3IgbGF5ZXIsIGkgaW4gcm90YXRpb25QYXJlbnQuY2hpbGRyZW4gd2hlbiBfLmxhc3Qocm90YXRpb25QYXJlbnQuY2hpbGRyZW4pLnogaXNudCAxXG5cdFx0XHRcdFx0bGF5ZXIueiA9IGxheWVyLmluaXRpYWxaIC0gKCgoZXZlbnQudG91Y2hDZW50ZXJZIC0gZXZlbnQuc3RhcnRZKSAqIChpIC0gMSkpIC8gcGFubmluZ1JhdGlvKVxuXG5cdF9wYW5FbmQgPSAtPlxuXHRcdHJvdGF0aW9uUGFyZW50LnJvdGF0aW9uWiA9IHJvdGF0aW9uUGFyZW50LnJvdGF0aW9uWiAlIDM2MFxuXG5cdF9rZXlEb3duVGV4dEZpZWxkID0gKGUpID0+XG5cdFx0aWYgZS5rZXlDb2RlIGlzIDEzXG5cdFx0XHRwcmludCB0aGlzXG5cdFx0XHR0aGlzLnRvZ2dsZSgpXG5cblx0dG9nZ2xlOiAocm90YXRpb24gPSB0cnVlLCB6ID0gNDAsIG9wYWNpdHkgPSAwLjgpIC0+XG5cblx0XHRpZiBub3QgYWN0aXZhdGVkIGFuZCBub3QgX2NoaWxkcmVuQW5pbWF0aW5nKHJvdGF0aW9uUGFyZW50LmNoaWxkcmVuKVxuXHRcdFx0YWN0aXZhdGVkID0gdHJ1ZVxuXG5cdFx0XHRfc2V0QWxsTGF5ZXJzQXNDaGlsZHJlbk9mKHJvdGF0aW9uUGFyZW50KVxuXG5cdFx0XHQjIEV2ZW50c1xuXG5cdFx0XHRpZiByb3RhdGlvblxuXHRcdFx0XHRyb3RhdGlvblBhcmVudC5vbiBFdmVudHMuUGFuU3RhcnQsIF9wYW5TdGFydFxuXHRcdFx0XHRyb3RhdGlvblBhcmVudC5vbiBFdmVudHMuUGFuLCBfcGFuXG5cdFx0XHRcdHJvdGF0aW9uUGFyZW50Lm9uIEV2ZW50cy5QYW5FbmQsIF9wYW5FbmRcblxuXHRcdFx0IyBBbmltYXRpb25zXG5cblx0XHRcdHJvdGF0aW9uUGFyZW50LmFuaW1hdGVcblx0XHRcdFx0cHJvcGVydGllczpcblx0XHRcdFx0XHRyb3RhdGlvblo6IDQ1XG5cdFx0XHRcdFx0cm90YXRpb25YOiA0NVxuXHRcdFx0XHRcdHNjYWxlWTogMC44NjA2MlxuXHRcdFx0XHRcdHk6IHogKiAocm90YXRpb25QYXJlbnQuY2hpbGRyZW4ubGVuZ3RoIC8gMy41KVxuXHRcdFx0XHRjdXJ2ZTogYW5pbWF0aW9uQ3VydmVcblxuXHRcdFx0Zm9yIGxheWVyIGluIHJvdGF0aW9uUGFyZW50LmNoaWxkcmVuIHdoZW4gbGF5ZXIgaXNudCBGcmFtZXIuRGV2aWNlLnNjcmVlblxuXHRcdFx0XHRsYXllci5vcmdQcm9wcyA9IGxheWVyLnByb3BzXG5cblx0XHRcdFx0bGF5ZXIuYW5pbWF0ZVxuXHRcdFx0XHRcdHByb3BlcnRpZXM6XG5cdFx0XHRcdFx0XHR6OiB6ICogKGxheWVyLmluZGV4IC0gMilcblx0XHRcdFx0XHRcdG9wYWNpdHk6IG9wYWNpdHlcblx0XHRcdFx0XHRkZWxheTogKHJvdGF0aW9uUGFyZW50LmNoaWxkcmVuLmxlbmd0aCAtIGxheWVyLmluZGV4KSAvIHJvdGF0aW9uUGFyZW50LmNoaWxkcmVuLmxlbmd0aFxuXHRcdFx0XHRcdGN1cnZlOiBhbmltYXRpb25DdXJ2ZVxuXG5cdFx0ZWxzZSBpZiBhY3RpdmF0ZWQgYW5kIG5vdCBfY2hpbGRyZW5BbmltYXRpbmcocm90YXRpb25QYXJlbnQuY2hpbGRyZW4pXG5cdFx0XHRhY3RpdmF0ZWQgPSBmYWxzZVxuXG5cdFx0XHQjIEV2ZW50c1xuXHRcdFx0aWYgcm90YXRpb25cblx0XHRcdFx0cm90YXRpb25QYXJlbnQub2ZmIEV2ZW50cy5QYW5TdGFydCwgX3BhblN0YXJ0XG5cdFx0XHRcdHJvdGF0aW9uUGFyZW50Lm9mZiBFdmVudHMuUGFuLCBfcGFuXG5cdFx0XHRcdHJvdGF0aW9uUGFyZW50Lm9mZiBFdmVudHMuUGFuRW5kLCBfcGFuRW5kXG5cblx0XHRcdCMgQW5pbWF0aW9uc1xuXG5cdFx0XHRyb3RhdGlvbk5lZ2F0aXZlID0gcm90YXRpb25QYXJlbnQucm90YXRpb25aIDwgMFxuXG5cdFx0XHRpZiBNYXRoLmFicyhyb3RhdGlvblBhcmVudC5yb3RhdGlvblogJSAzNjApID4gMTgwXG5cdFx0XHRcdHJvdGF0aW9uUGFyZW50Lm9yZ1Byb3BzLnJvdGF0aW9uWiA9IGlmIHJvdGF0aW9uTmVnYXRpdmUgdGhlbiAtMzYwIGVsc2UgMzYwXG5cdFx0XHRlbHNlXG5cdFx0XHRcdHJvdGF0aW9uUGFyZW50Lm9yZ1Byb3BzLnJvdGF0aW9uWiA9IGlmIHJvdGF0aW9uTmVnYXRpdmUgdGhlbiAtMCBlbHNlIDBcblxuXHRcdFx0cm90YXRpb25QYXJlbnQuYW5pbWF0ZVxuXHRcdFx0XHRwcm9wZXJ0aWVzOlxuXHRcdFx0XHRcdHJvdGF0aW9uWjogcm90YXRpb25QYXJlbnQub3JnUHJvcHMucm90YXRpb25aXG5cdFx0XHRcdFx0cm90YXRpb25YOiByb3RhdGlvblBhcmVudC5vcmdQcm9wcy5yb3RhdGlvblhcblx0XHRcdFx0XHRzY2FsZVk6IHJvdGF0aW9uUGFyZW50Lm9yZ1Byb3BzLnNjYWxlWVxuXHRcdFx0XHRcdHk6IHJvdGF0aW9uUGFyZW50Lm9yZ1Byb3BzLnlcblx0XHRcdFx0Y3VydmU6IGFuaW1hdGlvbkN1cnZlXG5cblx0XHRcdGZvciBsYXllciBpbiByb3RhdGlvblBhcmVudC5jaGlsZHJlblxuXHRcdFx0XHRsYXllci5hbmltYXRlXG5cdFx0XHRcdFx0cHJvcGVydGllczogbGF5ZXIub3JnUHJvcHNcblx0XHRcdFx0XHRjdXJ2ZTogYW5pbWF0aW9uQ3VydmVcblxuXHRcdFx0cm90YXRpb25QYXJlbnQub25jZSBFdmVudHMuQW5pbWF0aW9uRW5kLCAtPlxuXHRcdFx0XHRyb3RhdGlvblBhcmVudC5yb3RhdGlvblogPSAwXG5cdFx0XHRcdGZvciBsYXllciBpbiByb3RhdGlvblBhcmVudC5jaGlsZHJlbiB3aGVuIHJvdGF0aW9uUGFyZW50LmNoaWxkcmVuLmluZGV4T2YobGF5ZXIpIGlzbnQgMFxuXHRcdFx0XHRcdGxheWVyLnBhcmVudCA9IG51bGxcblxuXHRcdFx0XHRcdGxheWVyLnggPSBsYXllci54IC0gRnJhbWVyLkRldmljZS5zY3JlZW4ueFxuXHRcdFx0XHRcdGxheWVyLnkgPSBsYXllci55IC0gRnJhbWVyLkRldmljZS5zY3JlZW4ueSJdfQ==
