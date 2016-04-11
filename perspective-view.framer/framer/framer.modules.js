require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"perspective-view":[function(require,module,exports){
exports.PerspectiveView = (function() {
  var _childrenAnimating, _pan, _panEnd, _panStart, _setAllLayersAsChildrenOf, activated, animationCurve, initialRotation, rotationParent;

  function PerspectiveView() {}

  animationCurve = "spring(120, 20, 0, 0.07)";

  activated = false;

  initialRotation = null;

  Screen.perspective = 0;

  rotationParent = Framer.Device.phone;

  rotationParent.orgProps = rotationParent.props;

  _setAllLayersAsChildrenOf = function(parent) {
    var i, layer, len, ref, results;
    ref = Framer.CurrentContext.getLayers();
    results = [];
    for (i = 0, len = ref.length; i < len; i++) {
      layer = ref[i];
      if (!(layer.parent === null && rotationParent.children.indexOf(layer) !== 0)) {
        continue;
      }
      rotationParent.addChild(layer);
      layer.x = layer.x + Framer.Device.screen.x;
      results.push(layer.y = layer.y + Framer.Device.screen.y);
    }
    return results;
  };

  _childrenAnimating = function(layersArray) {
    return _.some(layersArray, function(layer) {
      return layer.isAnimating;
    });
  };

  _panStart = function() {
    return initialRotation = rotationParent.rotationZ;
  };

  _pan = function(event) {
    return rotationParent.rotationZ = initialRotation - ((event.touchCenterX - event.startX) / 4);
  };

  _panEnd = function() {
    return rotationParent.rotationZ = rotationParent.rotationZ % 360;
  };

  PerspectiveView.prototype.toggle = function(rotation, verticalSeparation, temporalOpacity) {
    var i, j, layer, len, len1, ref, ref1, results, rotationNegative;
    if (rotation == null) {
      rotation = true;
    }
    if (verticalSeparation == null) {
      verticalSeparation = 40;
    }
    if (temporalOpacity == null) {
      temporalOpacity = 0.8;
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
          y: verticalSeparation * (rotationParent.children.length / 3.5)
        },
        curve: animationCurve
      });
      ref = rotationParent.children;
      results = [];
      for (i = 0, len = ref.length; i < len; i++) {
        layer = ref[i];
        if (!(layer !== Framer.Device.screen)) {
          continue;
        }
        layer.orgProps = layer.props;
        results.push(layer.animate({
          properties: {
            z: verticalSeparation * (layer.index - 2),
            opacity: temporalOpacity
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
      for (j = 0, len1 = ref1.length; j < len1; j++) {
        layer = ref1[j];
        layer.animate({
          properties: layer.orgProps,
          curve: animationCurve
        });
      }
      return rotationParent.once(Events.AnimationEnd, function() {
        var k, len2, ref2, results1;
        rotationParent.rotationZ = 0;
        ref2 = rotationParent.children;
        results1 = [];
        for (k = 0, len2 = ref2.length; k < len2; k++) {
          layer = ref2[k];
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
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvZnJhbnAvRHJvcGJveC9Qcm90b3R5cGVzL3BlcnNwZWN0aXZlLXZpZXcvcGVyc3BlY3RpdmUtdmlldy5mcmFtZXIvbW9kdWxlcy9wZXJzcGVjdGl2ZS12aWV3LmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FNLE9BQU8sQ0FBQztBQUNiLE1BQUE7Ozs7RUFBQSxjQUFBLEdBQWlCOztFQUNqQixTQUFBLEdBQVk7O0VBQ1osZUFBQSxHQUFrQjs7RUFFbEIsTUFBTSxDQUFDLFdBQVAsR0FBcUI7O0VBRXJCLGNBQUEsR0FBaUIsTUFBTSxDQUFDLE1BQU0sQ0FBQzs7RUFDL0IsY0FBYyxDQUFDLFFBQWYsR0FBMEIsY0FBYyxDQUFDOztFQUV6Qyx5QkFBQSxHQUE0QixTQUFDLE1BQUQ7QUFDM0IsUUFBQTtBQUFBO0FBQUE7U0FBQSxxQ0FBQTs7WUFBb0QsS0FBSyxDQUFDLE1BQU4sS0FBZ0IsSUFBaEIsSUFBeUIsY0FBYyxDQUFDLFFBQVEsQ0FBQyxPQUF4QixDQUFnQyxLQUFoQyxDQUFBLEtBQTRDOzs7TUFDeEgsY0FBYyxDQUFDLFFBQWYsQ0FBd0IsS0FBeEI7TUFFQSxLQUFLLENBQUMsQ0FBTixHQUFVLEtBQUssQ0FBQyxDQUFOLEdBQVUsTUFBTSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUM7bUJBQ3pDLEtBQUssQ0FBQyxDQUFOLEdBQVUsS0FBSyxDQUFDLENBQU4sR0FBVSxNQUFNLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQztBQUoxQzs7RUFEMkI7O0VBTzVCLGtCQUFBLEdBQXFCLFNBQUMsV0FBRDtXQUNwQixDQUFDLENBQUMsSUFBRixDQUFPLFdBQVAsRUFBb0IsU0FBQyxLQUFEO2FBQVcsS0FBSyxDQUFDO0lBQWpCLENBQXBCO0VBRG9COztFQUdyQixTQUFBLEdBQVksU0FBQTtXQUNYLGVBQUEsR0FBa0IsY0FBYyxDQUFDO0VBRHRCOztFQUda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QUMsUUFBUSxDQUFDLFNBRG5DO1VBRUEsTUFBQSxFQUFRLGNBQWMsQ0FBQyxRQUFRLENBQUMsTUFGaEM7VUFHQSxDQUFBLEVBQUcsY0FBYyxDQUFDLFFBQVEsQ0FBQyxDQUgzQjtTQUREO1FBS0EsS0FBQSxFQUFPLGNBTFA7T0FERDtBQVFBO0FBQUEsV0FBQSx3Q0FBQTs7UUFDQyxLQUFLLENBQUMsT0FBTixDQUNDO1VBQUEsVUFBQSxFQUFZLEtBQUssQ0FBQyxRQUFsQjtVQUNBLEtBQUEsRUFBTyxjQURQO1NBREQ7QUFERDthQUtBLGNBQWMsQ0FBQyxJQUFmLENBQW9CLE1BQU0sQ0FBQyxZQUEzQixFQUF5QyxTQUFBO0FBQ3hDLFlBQUE7UUFBQSxjQUFjLENBQUMsU0FBZixHQUEyQjtBQUMzQjtBQUFBO2FBQUEsd0NBQUE7O2dCQUEwQyxjQUFjLENBQUMsUUFBUSxDQUFDLE9BQXhCLENBQWdDLEtBQWhDLENBQUEsS0FBNEM7OztVQUNyRixLQUFLLENBQUMsTUFBTixHQUFlO1VBRWYsS0FBSyxDQUFDLENBQU4sR0FBVSxLQUFLLENBQUMsQ0FBTixHQUFVLE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDO3dCQUN6QyxLQUFLLENBQUMsQ0FBTixHQUFVLEtBQUssQ0FBQyxDQUFOLEdBQVUsTUFBTSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUM7QUFKMUM7O01BRndDLENBQXpDLEVBL0JJOztFQWxDRSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJjbGFzcyBleHBvcnRzLlBlcnNwZWN0aXZlVmlld1xuXHRhbmltYXRpb25DdXJ2ZSA9IFwic3ByaW5nKDEyMCwgMjAsIDAsIDAuMDcpXCJcblx0YWN0aXZhdGVkID0gZmFsc2Vcblx0aW5pdGlhbFJvdGF0aW9uID0gbnVsbFxuXG5cdFNjcmVlbi5wZXJzcGVjdGl2ZSA9IDBcblxuXHRyb3RhdGlvblBhcmVudCA9IEZyYW1lci5EZXZpY2UucGhvbmVcblx0cm90YXRpb25QYXJlbnQub3JnUHJvcHMgPSByb3RhdGlvblBhcmVudC5wcm9wc1xuXG5cdF9zZXRBbGxMYXllcnNBc0NoaWxkcmVuT2YgPSAocGFyZW50KSAtPlxuXHRcdGZvciBsYXllciBpbiBGcmFtZXIuQ3VycmVudENvbnRleHQuZ2V0TGF5ZXJzKCkgd2hlbiBsYXllci5wYXJlbnQgaXMgbnVsbCBhbmQgcm90YXRpb25QYXJlbnQuY2hpbGRyZW4uaW5kZXhPZihsYXllcikgaXNudCAwXG5cdFx0XHRyb3RhdGlvblBhcmVudC5hZGRDaGlsZChsYXllcilcblxuXHRcdFx0bGF5ZXIueCA9IGxheWVyLnggKyBGcmFtZXIuRGV2aWNlLnNjcmVlbi54XG5cdFx0XHRsYXllci55ID0gbGF5ZXIueSArIEZyYW1lci5EZXZpY2Uuc2NyZWVuLnlcblxuXHRfY2hpbGRyZW5BbmltYXRpbmcgPSAobGF5ZXJzQXJyYXkpIC0+XG5cdFx0Xy5zb21lIGxheWVyc0FycmF5LCAobGF5ZXIpIC0+IGxheWVyLmlzQW5pbWF0aW5nXG5cblx0X3BhblN0YXJ0ID0gLT5cblx0XHRpbml0aWFsUm90YXRpb24gPSByb3RhdGlvblBhcmVudC5yb3RhdGlvblpcblxuXHRfcGFuID0gKGV2ZW50KSAtPlxuXHRcdHJvdGF0aW9uUGFyZW50LnJvdGF0aW9uWiA9IGluaXRpYWxSb3RhdGlvbiAtICgoZXZlbnQudG91Y2hDZW50ZXJYIC0gZXZlbnQuc3RhcnRYKSAvIDQpXG5cblx0X3BhbkVuZCA9IC0+XG5cdFx0cm90YXRpb25QYXJlbnQucm90YXRpb25aID0gcm90YXRpb25QYXJlbnQucm90YXRpb25aICUgMzYwXG5cblx0dG9nZ2xlOiAocm90YXRpb24gPSB0cnVlLCB2ZXJ0aWNhbFNlcGFyYXRpb24gPSA0MCwgdGVtcG9yYWxPcGFjaXR5ID0gMC44KSAtPlxuXG5cdFx0aWYgbm90IGFjdGl2YXRlZCBhbmQgbm90IF9jaGlsZHJlbkFuaW1hdGluZyhyb3RhdGlvblBhcmVudC5jaGlsZHJlbilcblx0XHRcdGFjdGl2YXRlZCA9IHRydWVcblxuXHRcdFx0X3NldEFsbExheWVyc0FzQ2hpbGRyZW5PZihyb3RhdGlvblBhcmVudClcblxuXHRcdFx0IyBFdmVudHNcblxuXHRcdFx0aWYgcm90YXRpb25cblx0XHRcdFx0cm90YXRpb25QYXJlbnQub24gRXZlbnRzLlBhblN0YXJ0LCBfcGFuU3RhcnRcblx0XHRcdFx0cm90YXRpb25QYXJlbnQub24gRXZlbnRzLlBhbiwgX3BhblxuXHRcdFx0XHRyb3RhdGlvblBhcmVudC5vbiBFdmVudHMuUGFuRW5kLCBfcGFuRW5kXG5cblx0XHRcdCMgQW5pbWF0aW9uc1xuXG5cdFx0XHRyb3RhdGlvblBhcmVudC5hbmltYXRlXG5cdFx0XHRcdHByb3BlcnRpZXM6XG5cdFx0XHRcdFx0cm90YXRpb25aOiA0NVxuXHRcdFx0XHRcdHJvdGF0aW9uWDogNDVcblx0XHRcdFx0XHRzY2FsZVk6IDAuODYwNjJcblx0XHRcdFx0XHR5OiB2ZXJ0aWNhbFNlcGFyYXRpb24gKiAocm90YXRpb25QYXJlbnQuY2hpbGRyZW4ubGVuZ3RoIC8gMy41KVxuXHRcdFx0XHRjdXJ2ZTogYW5pbWF0aW9uQ3VydmVcblxuXHRcdFx0Zm9yIGxheWVyIGluIHJvdGF0aW9uUGFyZW50LmNoaWxkcmVuIHdoZW4gbGF5ZXIgaXNudCBGcmFtZXIuRGV2aWNlLnNjcmVlblxuXHRcdFx0XHRsYXllci5vcmdQcm9wcyA9IGxheWVyLnByb3BzXG5cblx0XHRcdFx0bGF5ZXIuYW5pbWF0ZVxuXHRcdFx0XHRcdHByb3BlcnRpZXM6XG5cdFx0XHRcdFx0XHR6OiB2ZXJ0aWNhbFNlcGFyYXRpb24gKiAobGF5ZXIuaW5kZXggLSAyKVxuXHRcdFx0XHRcdFx0b3BhY2l0eTogdGVtcG9yYWxPcGFjaXR5XG5cdFx0XHRcdFx0ZGVsYXk6IChyb3RhdGlvblBhcmVudC5jaGlsZHJlbi5sZW5ndGggLSBsYXllci5pbmRleCkgLyByb3RhdGlvblBhcmVudC5jaGlsZHJlbi5sZW5ndGhcblx0XHRcdFx0XHRjdXJ2ZTogYW5pbWF0aW9uQ3VydmVcblxuXHRcdGVsc2UgaWYgYWN0aXZhdGVkIGFuZCBub3QgX2NoaWxkcmVuQW5pbWF0aW5nKHJvdGF0aW9uUGFyZW50LmNoaWxkcmVuKVxuXHRcdFx0YWN0aXZhdGVkID0gZmFsc2VcblxuXHRcdFx0IyBFdmVudHNcblx0XHRcdGlmIHJvdGF0aW9uXG5cdFx0XHRcdHJvdGF0aW9uUGFyZW50Lm9mZiBFdmVudHMuUGFuU3RhcnQsIF9wYW5TdGFydFxuXHRcdFx0XHRyb3RhdGlvblBhcmVudC5vZmYgRXZlbnRzLlBhbiwgX3BhblxuXHRcdFx0XHRyb3RhdGlvblBhcmVudC5vZmYgRXZlbnRzLlBhbkVuZCwgX3BhbkVuZFxuXG5cdFx0XHQjIEFuaW1hdGlvbnNcblxuXHRcdFx0cm90YXRpb25OZWdhdGl2ZSA9IHJvdGF0aW9uUGFyZW50LnJvdGF0aW9uWiA8IDBcblxuXHRcdFx0aWYgTWF0aC5hYnMocm90YXRpb25QYXJlbnQucm90YXRpb25aICUgMzYwKSA+IDE4MFxuXHRcdFx0XHRyb3RhdGlvblBhcmVudC5vcmdQcm9wcy5yb3RhdGlvblogPSBpZiByb3RhdGlvbk5lZ2F0aXZlIHRoZW4gLTM2MCBlbHNlIDM2MFxuXHRcdFx0ZWxzZVxuXHRcdFx0XHRyb3RhdGlvblBhcmVudC5vcmdQcm9wcy5yb3RhdGlvblogPSBpZiByb3RhdGlvbk5lZ2F0aXZlIHRoZW4gLTAgZWxzZSAwXG5cblx0XHRcdHJvdGF0aW9uUGFyZW50LmFuaW1hdGVcblx0XHRcdFx0cHJvcGVydGllczpcblx0XHRcdFx0XHRyb3RhdGlvblo6IHJvdGF0aW9uUGFyZW50Lm9yZ1Byb3BzLnJvdGF0aW9uWlxuXHRcdFx0XHRcdHJvdGF0aW9uWDogcm90YXRpb25QYXJlbnQub3JnUHJvcHMucm90YXRpb25YXG5cdFx0XHRcdFx0c2NhbGVZOiByb3RhdGlvblBhcmVudC5vcmdQcm9wcy5zY2FsZVlcblx0XHRcdFx0XHR5OiByb3RhdGlvblBhcmVudC5vcmdQcm9wcy55XG5cdFx0XHRcdGN1cnZlOiBhbmltYXRpb25DdXJ2ZVxuXG5cdFx0XHRmb3IgbGF5ZXIgaW4gcm90YXRpb25QYXJlbnQuY2hpbGRyZW5cblx0XHRcdFx0bGF5ZXIuYW5pbWF0ZVxuXHRcdFx0XHRcdHByb3BlcnRpZXM6IGxheWVyLm9yZ1Byb3BzXG5cdFx0XHRcdFx0Y3VydmU6IGFuaW1hdGlvbkN1cnZlXG5cblx0XHRcdHJvdGF0aW9uUGFyZW50Lm9uY2UgRXZlbnRzLkFuaW1hdGlvbkVuZCwgLT5cblx0XHRcdFx0cm90YXRpb25QYXJlbnQucm90YXRpb25aID0gMFxuXHRcdFx0XHRmb3IgbGF5ZXIgaW4gcm90YXRpb25QYXJlbnQuY2hpbGRyZW4gd2hlbiByb3RhdGlvblBhcmVudC5jaGlsZHJlbi5pbmRleE9mKGxheWVyKSBpc250IDBcblx0XHRcdFx0XHRsYXllci5wYXJlbnQgPSBudWxsXG5cblx0XHRcdFx0XHRsYXllci54ID0gbGF5ZXIueCAtIEZyYW1lci5EZXZpY2Uuc2NyZWVuLnhcblx0XHRcdFx0XHRsYXllci55ID0gbGF5ZXIueSAtIEZyYW1lci5EZXZpY2Uuc2NyZWVuLnkiXX0=
