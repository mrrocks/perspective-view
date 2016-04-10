require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"perspective-view":[function(require,module,exports){
var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

exports.PerspectiveView = (function(superClass) {
  var _childrenAnimating, _pan, _panEnd, _panStart, _setAllLayersAsChildrenOf, activated, animationCurve, initialRotation;

  extend(PerspectiveView, superClass);

  Screen.perspective = 0;

  animationCurve = "spring(120, 20, 0, 0.07)";

  activated = false;

  initialRotation = null;

  function PerspectiveView() {
    PerspectiveView.__super__.constructor.call(this, {
      width: Screen.width,
      height: Screen.height,
      clip: false,
      backgroundColor: null,
      index: 0
    });
    this.originalProps = this.props;
  }

  _setAllLayersAsChildrenOf = function(parent) {
    var i, layer, len, ref, results;
    ref = Framer.CurrentContext.getLayers();
    results = [];
    for (i = 0, len = ref.length; i < len; i++) {
      layer = ref[i];
      if (layer.parent === null && layer !== parent) {
        results.push(parent.addSubLayer(layer));
      }
    }
    return results;
  };

  _childrenAnimating = function(layersArray) {
    return _.some(layersArray, function(layer) {
      return layer.isAnimating;
    });
  };

  _panStart = function() {
    return initialRotation = this.rotationZ;
  };

  _pan = function(event) {
    return this.rotationZ = initialRotation - ((event.touchCenterX - event.startX) / 4);
  };

  _panEnd = function() {
    return this.rotationZ = this.rotationZ % 360;
  };

  PerspectiveView.prototype.togglePerspective = function(verticalSeparation, temporalOpacity) {
    var i, j, layer, len, len1, ref, ref1, results, rotationNegative;
    if (verticalSeparation == null) {
      verticalSeparation = 40;
    }
    if (temporalOpacity == null) {
      temporalOpacity = 0.8;
    }
    if (!activated && !_childrenAnimating(this.children)) {
      activated = true;
      _setAllLayersAsChildrenOf(this);
      this.on(Events.PanStart, _panStart);
      this.on(Events.Pan, _pan);
      this.on(Events.PanEnd, _panEnd);
      this.animate({
        properties: {
          rotationZ: 45,
          rotationX: 45,
          scaleY: 0.86062,
          backgroundColor: "rgba(128, 128, 128, 0.2)",
          y: verticalSeparation * (this.children.length / 3.4)
        },
        curve: animationCurve
      });
      ref = this.children;
      results = [];
      for (i = 0, len = ref.length; i < len; i++) {
        layer = ref[i];
        layer.originalProps = layer.props;
        results.push(layer.animate({
          properties: {
            z: verticalSeparation * (layer.index - 1),
            opacity: temporalOpacity
          },
          delay: (this.children.length - layer.index) / this.children.length,
          curve: animationCurve
        }));
      }
      return results;
    } else if (activated && !_childrenAnimating(this.children)) {
      activated = false;
      this.off(Events.PanStart, _panStart);
      this.off(Events.Pan, _pan);
      this.off(Events.PanEnd, _panEnd);
      rotationNegative = this.rotationZ < 0;
      if (Math.abs(this.rotationZ % 360) > 180) {
        this.originalProps.rotationZ = rotationNegative ? -360 : 360;
      } else {
        this.originalProps.rotationZ = rotationNegative ? -0 : 0;
      }
      this.animate({
        properties: {
          rotationZ: this.originalProps.rotationZ,
          rotationX: this.originalProps.rotationX,
          scaleY: this.originalProps.scaleY,
          y: this.originalProps.y,
          backgroundColor: this.originalProps.backgroundColor
        },
        curve: animationCurve
      });
      ref1 = this.children;
      for (j = 0, len1 = ref1.length; j < len1; j++) {
        layer = ref1[j];
        layer.animate({
          properties: layer.originalProps,
          curve: animationCurve
        });
      }
      return this.once(Events.AnimationEnd, function() {
        var k, len2, ref2, results1;
        this.rotationZ = 0;
        ref2 = this.children;
        results1 = [];
        for (k = 0, len2 = ref2.length; k < len2; k++) {
          layer = ref2[k];
          results1.push(layer.parent = null);
        }
        return results1;
      });
    }
  };

  return PerspectiveView;

})(Layer);


},{}]},{},[])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvZnJhbnAvRHJvcGJveC9Qcm90b3R5cGVzL3BlcnNwZWN0aXZlLXZpZXcvcGVyc3BlY3RpdmUtdmlldy5mcmFtZXIvbW9kdWxlcy9wZXJzcGVjdGl2ZS12aWV3LmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBLElBQUE7OztBQUFNLE9BQU8sQ0FBQztBQUNiLE1BQUE7Ozs7RUFBQSxNQUFNLENBQUMsV0FBUCxHQUFxQjs7RUFDckIsY0FBQSxHQUFpQjs7RUFDakIsU0FBQSxHQUFZOztFQUNaLGVBQUEsR0FBa0I7O0VBRUwseUJBQUE7SUFDWixpREFDQztNQUFBLEtBQUEsRUFBTyxNQUFNLENBQUMsS0FBZDtNQUNBLE1BQUEsRUFBUSxNQUFNLENBQUMsTUFEZjtNQUVBLElBQUEsRUFBTSxLQUZOO01BR0EsZUFBQSxFQUFpQixJQUhqQjtNQUlBLEtBQUEsRUFBTyxDQUpQO0tBREQ7SUFPQSxJQUFJLENBQUMsYUFBTCxHQUFxQixJQUFJLENBQUM7RUFSZDs7RUFVYix5QkFBQSxHQUE0QixTQUFDLE1BQUQ7QUFDM0IsUUFBQTtBQUFBO0FBQUE7U0FBQSxxQ0FBQTs7VUFBb0QsS0FBSyxDQUFDLE1BQU4sS0FBZ0IsSUFBaEIsSUFBeUIsS0FBQSxLQUFXO3FCQUN2RixNQUFNLENBQUMsV0FBUCxDQUFtQixLQUFuQjs7QUFERDs7RUFEMkI7O0VBSTVCLGtCQUFBLEdBQXFCLFNBQUMsV0FBRDtXQUNwQixDQUFDLENBQUMsSUFBRixDQUFPLFdBQVAsRUFBb0IsU0FBQyxLQUFEO2FBQVcsS0FBSyxDQUFDO0lBQWpCLENBQXBCO0VBRG9COztFQUdyQixTQUFBLEdBQVksU0FBQTtXQUNYLGVBQUEsR0FBa0IsSUFBSSxDQUFDO0VBRFo7O0VBR1osSUFBQSxHQUFPLFNBQUMsS0FBRDtXQUNOLElBQUksQ0FBQyxTQUFMLEdBQWlCLGVBQUEsR0FBa0IsQ0FBQyxDQUFD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QSxFQUFPLGNBTlA7T0FERDtBQVNBO0FBQUEsV0FBQSx3Q0FBQTs7UUFDQyxLQUFLLENBQUMsT0FBTixDQUNDO1VBQUEsVUFBQSxFQUFZLEtBQUssQ0FBQyxhQUFsQjtVQUNBLEtBQUEsRUFBTyxjQURQO1NBREQ7QUFERDthQUtBLElBQUksQ0FBQyxJQUFMLENBQVUsTUFBTSxDQUFDLFlBQWpCLEVBQStCLFNBQUE7QUFDOUIsWUFBQTtRQUFBLElBQUksQ0FBQyxTQUFMLEdBQWlCO0FBQ2pCO0FBQUE7YUFBQSx3Q0FBQTs7d0JBQUEsS0FBSyxDQUFDLE1BQU4sR0FBZTtBQUFmOztNQUY4QixDQUEvQixFQWhDSTs7RUFsQ2E7Ozs7R0FoQ2tCIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImNsYXNzIGV4cG9ydHMuUGVyc3BlY3RpdmVWaWV3IGV4dGVuZHMgTGF5ZXJcblx0U2NyZWVuLnBlcnNwZWN0aXZlID0gMFxuXHRhbmltYXRpb25DdXJ2ZSA9IFwic3ByaW5nKDEyMCwgMjAsIDAsIDAuMDcpXCJcblx0YWN0aXZhdGVkID0gZmFsc2Vcblx0aW5pdGlhbFJvdGF0aW9uID0gbnVsbFxuXG5cdGNvbnN0cnVjdG9yOiAtPlxuXHRcdHN1cGVyXG5cdFx0XHR3aWR0aDogU2NyZWVuLndpZHRoXG5cdFx0XHRoZWlnaHQ6IFNjcmVlbi5oZWlnaHRcblx0XHRcdGNsaXA6IGZhbHNlXG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IG51bGxcblx0XHRcdGluZGV4OiAwXG5cblx0XHR0aGlzLm9yaWdpbmFsUHJvcHMgPSB0aGlzLnByb3BzXG5cblx0X3NldEFsbExheWVyc0FzQ2hpbGRyZW5PZiA9IChwYXJlbnQpIC0+XG5cdFx0Zm9yIGxheWVyIGluIEZyYW1lci5DdXJyZW50Q29udGV4dC5nZXRMYXllcnMoKSB3aGVuIGxheWVyLnBhcmVudCBpcyBudWxsIGFuZCBsYXllciBpc250IHBhcmVudFxuXHRcdFx0cGFyZW50LmFkZFN1YkxheWVyKGxheWVyKVxuXG5cdF9jaGlsZHJlbkFuaW1hdGluZyA9IChsYXllcnNBcnJheSkgLT5cblx0XHRfLnNvbWUgbGF5ZXJzQXJyYXksIChsYXllcikgLT4gbGF5ZXIuaXNBbmltYXRpbmdcblxuXHRfcGFuU3RhcnQgPSAtPlxuXHRcdGluaXRpYWxSb3RhdGlvbiA9IHRoaXMucm90YXRpb25aXG5cblx0X3BhbiA9IChldmVudCkgLT5cblx0XHR0aGlzLnJvdGF0aW9uWiA9IGluaXRpYWxSb3RhdGlvbiAtICgoZXZlbnQudG91Y2hDZW50ZXJYIC0gZXZlbnQuc3RhcnRYKSAvIDQpXG5cblx0X3BhbkVuZCA9IC0+XG5cdFx0dGhpcy5yb3RhdGlvblogPSB0aGlzLnJvdGF0aW9uWiAlIDM2MFxuXG5cdHRvZ2dsZVBlcnNwZWN0aXZlOiAodmVydGljYWxTZXBhcmF0aW9uID0gNDAsIHRlbXBvcmFsT3BhY2l0eSA9IDAuOCkgLT5cblxuXHRcdGlmIG5vdCBhY3RpdmF0ZWQgYW5kIG5vdCBfY2hpbGRyZW5BbmltYXRpbmcodGhpcy5jaGlsZHJlbilcblx0XHRcdGFjdGl2YXRlZCA9IHRydWVcblxuXHRcdFx0X3NldEFsbExheWVyc0FzQ2hpbGRyZW5PZih0aGlzKVxuXG5cdFx0XHQjIEV2ZW50c1xuXG5cdFx0XHR0aGlzLm9uIEV2ZW50cy5QYW5TdGFydCwgX3BhblN0YXJ0XG5cdFx0XHR0aGlzLm9uIEV2ZW50cy5QYW4sIF9wYW5cblx0XHRcdHRoaXMub24gRXZlbnRzLlBhbkVuZCwgX3BhbkVuZFxuXG5cdFx0XHQjIEFuaW1hdGlvbnNcblxuXHRcdFx0dGhpcy5hbmltYXRlXG5cdFx0XHRcdHByb3BlcnRpZXM6XG5cdFx0XHRcdFx0cm90YXRpb25aOiA0NVxuXHRcdFx0XHRcdHJvdGF0aW9uWDogNDVcblx0XHRcdFx0XHRzY2FsZVk6IDAuODYwNjJcblx0XHRcdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IFwicmdiYSgxMjgsIDEyOCwgMTI4LCAwLjIpXCJcblx0XHRcdFx0XHR5OiB2ZXJ0aWNhbFNlcGFyYXRpb24gKiAodGhpcy5jaGlsZHJlbi5sZW5ndGggLyAzLjQpXG5cdFx0XHRcdGN1cnZlOiBhbmltYXRpb25DdXJ2ZVxuXG5cdFx0XHRmb3IgbGF5ZXIgaW4gdGhpcy5jaGlsZHJlblxuXHRcdFx0XHRsYXllci5vcmlnaW5hbFByb3BzID0gbGF5ZXIucHJvcHNcblxuXHRcdFx0XHRsYXllci5hbmltYXRlXG5cdFx0XHRcdFx0cHJvcGVydGllczpcblx0XHRcdFx0XHRcdHo6IHZlcnRpY2FsU2VwYXJhdGlvbiAqIChsYXllci5pbmRleCAtIDEpXG5cdFx0XHRcdFx0XHRvcGFjaXR5OiB0ZW1wb3JhbE9wYWNpdHlcblx0XHRcdFx0XHRkZWxheTogKHRoaXMuY2hpbGRyZW4ubGVuZ3RoIC0gbGF5ZXIuaW5kZXgpIC8gdGhpcy5jaGlsZHJlbi5sZW5ndGhcblx0XHRcdFx0XHRjdXJ2ZTogYW5pbWF0aW9uQ3VydmVcblxuXHRcdGVsc2UgaWYgYWN0aXZhdGVkIGFuZCBub3QgX2NoaWxkcmVuQW5pbWF0aW5nKHRoaXMuY2hpbGRyZW4pXG5cdFx0XHRhY3RpdmF0ZWQgPSBmYWxzZVxuXG5cdFx0XHQjIEV2ZW50c1xuXG5cdFx0XHR0aGlzLm9mZiBFdmVudHMuUGFuU3RhcnQsIF9wYW5TdGFydFxuXHRcdFx0dGhpcy5vZmYgRXZlbnRzLlBhbiwgX3BhblxuXHRcdFx0dGhpcy5vZmYgRXZlbnRzLlBhbkVuZCwgX3BhbkVuZFxuXG5cdFx0XHQjIEFuaW1hdGlvbnNcblxuXHRcdFx0cm90YXRpb25OZWdhdGl2ZSA9IHRoaXMucm90YXRpb25aIDwgMFxuXG5cdFx0XHRpZiBNYXRoLmFicyh0aGlzLnJvdGF0aW9uWiAlIDM2MCkgPiAxODBcblx0XHRcdFx0dGhpcy5vcmlnaW5hbFByb3BzLnJvdGF0aW9uWiA9IGlmIHJvdGF0aW9uTmVnYXRpdmUgdGhlbiAtMzYwIGVsc2UgMzYwXG5cdFx0XHRlbHNlXG5cdFx0XHRcdHRoaXMub3JpZ2luYWxQcm9wcy5yb3RhdGlvblogPSBpZiByb3RhdGlvbk5lZ2F0aXZlIHRoZW4gLTAgZWxzZSAwXG5cblx0XHRcdHRoaXMuYW5pbWF0ZVxuXHRcdFx0XHRwcm9wZXJ0aWVzOlxuXHRcdFx0XHRcdHJvdGF0aW9uWjogdGhpcy5vcmlnaW5hbFByb3BzLnJvdGF0aW9uWlxuXHRcdFx0XHRcdHJvdGF0aW9uWDogdGhpcy5vcmlnaW5hbFByb3BzLnJvdGF0aW9uWFxuXHRcdFx0XHRcdHNjYWxlWTogdGhpcy5vcmlnaW5hbFByb3BzLnNjYWxlWVxuXHRcdFx0XHRcdHk6IHRoaXMub3JpZ2luYWxQcm9wcy55XG5cdFx0XHRcdFx0YmFja2dyb3VuZENvbG9yOiB0aGlzLm9yaWdpbmFsUHJvcHMuYmFja2dyb3VuZENvbG9yXG5cdFx0XHRcdGN1cnZlOiBhbmltYXRpb25DdXJ2ZVxuXG5cdFx0XHRmb3IgbGF5ZXIgaW4gdGhpcy5jaGlsZHJlblxuXHRcdFx0XHRsYXllci5hbmltYXRlXG5cdFx0XHRcdFx0cHJvcGVydGllczogbGF5ZXIub3JpZ2luYWxQcm9wc1xuXHRcdFx0XHRcdGN1cnZlOiBhbmltYXRpb25DdXJ2ZVxuXG5cdFx0XHR0aGlzLm9uY2UgRXZlbnRzLkFuaW1hdGlvbkVuZCwgLT5cblx0XHRcdFx0dGhpcy5yb3RhdGlvblogPSAwXG5cdFx0XHRcdGxheWVyLnBhcmVudCA9IG51bGwgZm9yIGxheWVyIGluIHRoaXMuY2hpbGRyZW4iXX0=
