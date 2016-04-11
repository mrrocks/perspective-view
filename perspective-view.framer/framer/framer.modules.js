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
      if (!(layer.parent === null)) {
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
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvZnJhbnAvRHJvcGJveC9Qcm90b3R5cGVzL3BlcnNwZWN0aXZlLXZpZXcvcGVyc3BlY3RpdmUtdmlldy5mcmFtZXIvbW9kdWxlcy9wZXJzcGVjdGl2ZS12aWV3LmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FNLE9BQU8sQ0FBQztBQUNiLE1BQUE7Ozs7RUFBQSxjQUFBLEdBQWlCOztFQUNqQixTQUFBLEdBQVk7O0VBQ1osZUFBQSxHQUFrQjs7RUFFbEIsTUFBTSxDQUFDLFdBQVAsR0FBcUI7O0VBRXJCLGNBQUEsR0FBaUIsTUFBTSxDQUFDLE1BQU0sQ0FBQzs7RUFDL0IsY0FBYyxDQUFDLFFBQWYsR0FBMEIsY0FBYyxDQUFDOztFQUV6Qyx5QkFBQSxHQUE0QixTQUFDLE1BQUQ7QUFDM0IsUUFBQTtBQUFBO0FBQUE7U0FBQSxxQ0FBQTs7WUFBb0QsS0FBSyxDQUFDLE1BQU4sS0FBZ0I7OztNQUNuRSxjQUFjLENBQUMsUUFBZixDQUF3QixLQUF4QjtNQUVBLEtBQUssQ0FBQyxDQUFOLEdBQVUsS0FBSyxDQUFDLENBQU4sR0FBVSxNQUFNLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQzttQkFDekMsS0FBSyxDQUFDLENBQU4sR0FBVSxLQUFLLENBQUMsQ0FBTixHQUFVLE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDO0FBSjFDOztFQUQyQjs7RUFPNUIsa0JBQUEsR0FBcUIsU0FBQyxXQUFEO1dBQ3BCLENBQUMsQ0FBQyxJQUFGLENBQU8sV0FBUCxFQUFvQixTQUFDLEtBQUQ7YUFBVyxLQUFLLENBQUM7SUFBakIsQ0FBcEI7RUFEb0I7O0VBR3JCLFNBQUEsR0FBWSxTQUFBO1dBQ1gsZUFBQSxHQUFrQixjQUFjLENBQUM7RUFEdEI7O0VBR1osSUFBQSxHQUFPLFNBQUMsS0FBRDtXQUNOLGNBQWMsQ0FBQyxTQUFmLEdBQTJCLGVBQUEsR0FBa0IsQ0FB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O1NBREQ7UUFLQSxLQUFBLEVBQU8sY0FMUDtPQUREO0FBUUE7QUFBQSxXQUFBLHdDQUFBOztRQUNDLEtBQUssQ0FBQyxPQUFOLENBQ0M7VUFBQSxVQUFBLEVBQVksS0FBSyxDQUFDLFFBQWxCO1VBQ0EsS0FBQSxFQUFPLGNBRFA7U0FERDtBQUREO2FBS0EsY0FBYyxDQUFDLElBQWYsQ0FBb0IsTUFBTSxDQUFDLFlBQTNCLEVBQXlDLFNBQUE7QUFDeEMsWUFBQTtRQUFBLGNBQWMsQ0FBQyxTQUFmLEdBQTJCO0FBQzNCO0FBQUE7YUFBQSx3Q0FBQTs7Z0JBQTBDLGNBQWMsQ0FBQyxRQUFRLENBQUMsT0FBeEIsQ0FBZ0MsS0FBaEMsQ0FBQSxLQUE0Qzs7O1VBQ3JGLEtBQUssQ0FBQyxNQUFOLEdBQWU7VUFFZixLQUFLLENBQUMsQ0FBTixHQUFVLEtBQUssQ0FBQyxDQUFOLEdBQVUsTUFBTSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUM7d0JBQ3pDLEtBQUssQ0FBQyxDQUFOLEdBQVUsS0FBSyxDQUFDLENBQU4sR0FBVSxNQUFNLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQztBQUoxQzs7TUFGd0MsQ0FBekMsRUEvQkk7O0VBbENFIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImNsYXNzIGV4cG9ydHMuUGVyc3BlY3RpdmVWaWV3XG5cdGFuaW1hdGlvbkN1cnZlID0gXCJzcHJpbmcoMTIwLCAyMCwgMCwgMC4wNylcIlxuXHRhY3RpdmF0ZWQgPSBmYWxzZVxuXHRpbml0aWFsUm90YXRpb24gPSBudWxsXG5cblx0U2NyZWVuLnBlcnNwZWN0aXZlID0gMFxuXG5cdHJvdGF0aW9uUGFyZW50ID0gRnJhbWVyLkRldmljZS5waG9uZVxuXHRyb3RhdGlvblBhcmVudC5vcmdQcm9wcyA9IHJvdGF0aW9uUGFyZW50LnByb3BzXG5cblx0X3NldEFsbExheWVyc0FzQ2hpbGRyZW5PZiA9IChwYXJlbnQpIC0+XG5cdFx0Zm9yIGxheWVyIGluIEZyYW1lci5DdXJyZW50Q29udGV4dC5nZXRMYXllcnMoKSB3aGVuIGxheWVyLnBhcmVudCBpcyBudWxsXG5cdFx0XHRyb3RhdGlvblBhcmVudC5hZGRDaGlsZChsYXllcilcblxuXHRcdFx0bGF5ZXIueCA9IGxheWVyLnggKyBGcmFtZXIuRGV2aWNlLnNjcmVlbi54XG5cdFx0XHRsYXllci55ID0gbGF5ZXIueSArIEZyYW1lci5EZXZpY2Uuc2NyZWVuLnlcblxuXHRfY2hpbGRyZW5BbmltYXRpbmcgPSAobGF5ZXJzQXJyYXkpIC0+XG5cdFx0Xy5zb21lIGxheWVyc0FycmF5LCAobGF5ZXIpIC0+IGxheWVyLmlzQW5pbWF0aW5nXG5cblx0X3BhblN0YXJ0ID0gLT5cblx0XHRpbml0aWFsUm90YXRpb24gPSByb3RhdGlvblBhcmVudC5yb3RhdGlvblpcblxuXHRfcGFuID0gKGV2ZW50KSAtPlxuXHRcdHJvdGF0aW9uUGFyZW50LnJvdGF0aW9uWiA9IGluaXRpYWxSb3RhdGlvbiAtICgoZXZlbnQudG91Y2hDZW50ZXJYIC0gZXZlbnQuc3RhcnRYKSAvIDQpXG5cblx0X3BhbkVuZCA9IC0+XG5cdFx0cm90YXRpb25QYXJlbnQucm90YXRpb25aID0gcm90YXRpb25QYXJlbnQucm90YXRpb25aICUgMzYwXG5cblx0dG9nZ2xlOiAocm90YXRpb24gPSB0cnVlLCB2ZXJ0aWNhbFNlcGFyYXRpb24gPSA0MCwgdGVtcG9yYWxPcGFjaXR5ID0gMC44KSAtPlxuXG5cdFx0aWYgbm90IGFjdGl2YXRlZCBhbmQgbm90IF9jaGlsZHJlbkFuaW1hdGluZyhyb3RhdGlvblBhcmVudC5jaGlsZHJlbilcblx0XHRcdGFjdGl2YXRlZCA9IHRydWVcblxuXHRcdFx0X3NldEFsbExheWVyc0FzQ2hpbGRyZW5PZihyb3RhdGlvblBhcmVudClcblxuXHRcdFx0IyBFdmVudHNcblxuXHRcdFx0aWYgcm90YXRpb25cblx0XHRcdFx0cm90YXRpb25QYXJlbnQub24gRXZlbnRzLlBhblN0YXJ0LCBfcGFuU3RhcnRcblx0XHRcdFx0cm90YXRpb25QYXJlbnQub24gRXZlbnRzLlBhbiwgX3BhblxuXHRcdFx0XHRyb3RhdGlvblBhcmVudC5vbiBFdmVudHMuUGFuRW5kLCBfcGFuRW5kXG5cblx0XHRcdCMgQW5pbWF0aW9uc1xuXG5cdFx0XHRyb3RhdGlvblBhcmVudC5hbmltYXRlXG5cdFx0XHRcdHByb3BlcnRpZXM6XG5cdFx0XHRcdFx0cm90YXRpb25aOiA0NVxuXHRcdFx0XHRcdHJvdGF0aW9uWDogNDVcblx0XHRcdFx0XHRzY2FsZVk6IDAuODYwNjJcblx0XHRcdFx0XHR5OiB2ZXJ0aWNhbFNlcGFyYXRpb24gKiAocm90YXRpb25QYXJlbnQuY2hpbGRyZW4ubGVuZ3RoIC8gMy41KVxuXHRcdFx0XHRjdXJ2ZTogYW5pbWF0aW9uQ3VydmVcblxuXHRcdFx0Zm9yIGxheWVyIGluIHJvdGF0aW9uUGFyZW50LmNoaWxkcmVuXG5cdFx0XHRcdGxheWVyLm9yZ1Byb3BzID0gbGF5ZXIucHJvcHNcblxuXHRcdFx0XHRsYXllci5hbmltYXRlXG5cdFx0XHRcdFx0cHJvcGVydGllczpcblx0XHRcdFx0XHRcdHo6IHZlcnRpY2FsU2VwYXJhdGlvbiAqIChsYXllci5pbmRleCAtIDIpXG5cdFx0XHRcdFx0XHRvcGFjaXR5OiB0ZW1wb3JhbE9wYWNpdHlcblx0XHRcdFx0XHRkZWxheTogKHJvdGF0aW9uUGFyZW50LmNoaWxkcmVuLmxlbmd0aCAtIGxheWVyLmluZGV4KSAvIHJvdGF0aW9uUGFyZW50LmNoaWxkcmVuLmxlbmd0aFxuXHRcdFx0XHRcdGN1cnZlOiBhbmltYXRpb25DdXJ2ZVxuXG5cdFx0ZWxzZSBpZiBhY3RpdmF0ZWQgYW5kIG5vdCBfY2hpbGRyZW5BbmltYXRpbmcocm90YXRpb25QYXJlbnQuY2hpbGRyZW4pXG5cdFx0XHRhY3RpdmF0ZWQgPSBmYWxzZVxuXG5cdFx0XHQjIEV2ZW50c1xuXHRcdFx0aWYgcm90YXRpb25cblx0XHRcdFx0cm90YXRpb25QYXJlbnQub2ZmIEV2ZW50cy5QYW5TdGFydCwgX3BhblN0YXJ0XG5cdFx0XHRcdHJvdGF0aW9uUGFyZW50Lm9mZiBFdmVudHMuUGFuLCBfcGFuXG5cdFx0XHRcdHJvdGF0aW9uUGFyZW50Lm9mZiBFdmVudHMuUGFuRW5kLCBfcGFuRW5kXG5cblx0XHRcdCMgQW5pbWF0aW9uc1xuXG5cdFx0XHRyb3RhdGlvbk5lZ2F0aXZlID0gcm90YXRpb25QYXJlbnQucm90YXRpb25aIDwgMFxuXG5cdFx0XHRpZiBNYXRoLmFicyhyb3RhdGlvblBhcmVudC5yb3RhdGlvblogJSAzNjApID4gMTgwXG5cdFx0XHRcdHJvdGF0aW9uUGFyZW50Lm9yZ1Byb3BzLnJvdGF0aW9uWiA9IGlmIHJvdGF0aW9uTmVnYXRpdmUgdGhlbiAtMzYwIGVsc2UgMzYwXG5cdFx0XHRlbHNlXG5cdFx0XHRcdHJvdGF0aW9uUGFyZW50Lm9yZ1Byb3BzLnJvdGF0aW9uWiA9IGlmIHJvdGF0aW9uTmVnYXRpdmUgdGhlbiAtMCBlbHNlIDBcblxuXHRcdFx0cm90YXRpb25QYXJlbnQuYW5pbWF0ZVxuXHRcdFx0XHRwcm9wZXJ0aWVzOlxuXHRcdFx0XHRcdHJvdGF0aW9uWjogcm90YXRpb25QYXJlbnQub3JnUHJvcHMucm90YXRpb25aXG5cdFx0XHRcdFx0cm90YXRpb25YOiByb3RhdGlvblBhcmVudC5vcmdQcm9wcy5yb3RhdGlvblhcblx0XHRcdFx0XHRzY2FsZVk6IHJvdGF0aW9uUGFyZW50Lm9yZ1Byb3BzLnNjYWxlWVxuXHRcdFx0XHRcdHk6IHJvdGF0aW9uUGFyZW50Lm9yZ1Byb3BzLnlcblx0XHRcdFx0Y3VydmU6IGFuaW1hdGlvbkN1cnZlXG5cblx0XHRcdGZvciBsYXllciBpbiByb3RhdGlvblBhcmVudC5jaGlsZHJlblxuXHRcdFx0XHRsYXllci5hbmltYXRlXG5cdFx0XHRcdFx0cHJvcGVydGllczogbGF5ZXIub3JnUHJvcHNcblx0XHRcdFx0XHRjdXJ2ZTogYW5pbWF0aW9uQ3VydmVcblxuXHRcdFx0cm90YXRpb25QYXJlbnQub25jZSBFdmVudHMuQW5pbWF0aW9uRW5kLCAtPlxuXHRcdFx0XHRyb3RhdGlvblBhcmVudC5yb3RhdGlvblogPSAwXG5cdFx0XHRcdGZvciBsYXllciBpbiByb3RhdGlvblBhcmVudC5jaGlsZHJlbiB3aGVuIHJvdGF0aW9uUGFyZW50LmNoaWxkcmVuLmluZGV4T2YobGF5ZXIpIGlzbnQgMFxuXHRcdFx0XHRcdGxheWVyLnBhcmVudCA9IG51bGxcblxuXHRcdFx0XHRcdGxheWVyLnggPSBsYXllci54IC0gRnJhbWVyLkRldmljZS5zY3JlZW4ueFxuXHRcdFx0XHRcdGxheWVyLnkgPSBsYXllci55IC0gRnJhbWVyLkRldmljZS5zY3JlZW4ueSJdfQ==
