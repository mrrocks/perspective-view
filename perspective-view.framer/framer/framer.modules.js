require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"perspective-view":[function(require,module,exports){
var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

exports.PerspectiveLayer = (function(superClass) {
  var _childrenAnimating, _setAllLayersAsChildrenOf, activated, animationCurve, initialRotation;

  extend(PerspectiveLayer, superClass);

  Screen.perspective = 0;

  animationCurve = "spring(120, 20, 0, 0.07)";

  activated = false;

  initialRotation = null;

  function PerspectiveLayer() {
    PerspectiveLayer.__super__.constructor.call(this, {
      width: Screen.width,
      height: Screen.height,
      clip: false,
      backgroundColor: null,
      index: 0
    });
    this.originalProps = this.props;
    this.on(Events.PanStart, function() {
      return initialRotation = this.rotationZ;
    });
    this.on(Events.Pan, function(event) {
      return this.rotationZ = initialRotation - ((event.touchCenterX - event.startX) / 4);
    });
    this.on(Events.PanEnd, function() {
      return this.rotationZ = this.rotationZ % 360;
    });
  }

  PerspectiveLayer.prototype.togglePerspective = function(verticalSeparation, temporalOpacity) {
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
      rotationNegative = this.rotationZ < 0;
      if (Math.abs(this.rotationZ) > 180) {
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

  return PerspectiveLayer;

})(Layer);


},{}]},{},[])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvZnJhbnAvRHJvcGJveC9Qcm90b3R5cGVzL3BlcnNwZWN0aXZlLXZpZXcvcGVyc3BlY3RpdmUtdmlldy5mcmFtZXIvbW9kdWxlcy9wZXJzcGVjdGl2ZS12aWV3LmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBLElBQUE7OztBQUFNLE9BQU8sQ0FBQztBQUNiLE1BQUE7Ozs7RUFBQSxNQUFNLENBQUMsV0FBUCxHQUFxQjs7RUFDckIsY0FBQSxHQUFpQjs7RUFDakIsU0FBQSxHQUFZOztFQUNaLGVBQUEsR0FBa0I7O0VBRUwsMEJBQUE7SUFDWixrREFDQztNQUFBLEtBQUEsRUFBTyxNQUFNLENBQUMsS0FBZDtNQUNBLE1BQUEsRUFBUSxNQUFNLENBQUMsTUFEZjtNQUVBLElBQUEsRUFBTSxLQUZOO01BR0EsZUFBQSxFQUFpQixJQUhqQjtNQUlBLEtBQUEsRUFBTyxDQUpQO0tBREQ7SUFPQSxJQUFJLENBQUMsYUFBTCxHQUFxQixJQUFJLENBQUM7SUFJMUIsSUFBSSxDQUFDLEVBQUwsQ0FBUSxNQUFNLENBQUMsUUFBZixFQUF5QixTQUFBO2FBQUcsZUFBQSxHQUFrQixJQUFJLENBQUM7SUFBMUIsQ0FBekI7SUFDQSxJQUFJLENBQUMsRUFBTCxDQUFRLE1BQU0sQ0FBQyxHQUFmLEVBQW9CLFNBQUMsS0FBRDthQUFXLElBQUksQ0FBQyxTQUFMLEdBQWlCLGVBQUEsR0FBa0IsQ0FBQyxDQUFDLEtBQUssQ0FBQyxZQUFOLEdBQXFCLEtBQUssQ0FBQyxNQUE1QixDQUFBLEdBQXNDLENBQXZDO0lBQTlDLENBQXBCO0lBQ0EsSUFBSSxDQUFDLEVBQUwsQ0FBUSxNQUFNLENBQUMsTUFBZixFQUF1QixTQUFBO2FBQUcsSUFBSSxDQUFDLFNBQUwsR0FBaUIsSUFBSSxDQUFDLFNBQUwsR0FBaUI7SUFBckMsQ0FBdkI7RUFkWTs7NkJBZ0JiLGlCQUFBLEdBQW1CLFNB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Q3BCLENBQUMsQ0FBQyxJQUFGLENBQU8sV0FBUCxFQUFvQixTQUFDLEtBQUQ7YUFBVyxLQUFLLENBQUM7SUFBakIsQ0FBcEI7RUFEb0I7Ozs7R0FoRmlCIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImNsYXNzIGV4cG9ydHMuUGVyc3BlY3RpdmVMYXllciBleHRlbmRzIExheWVyXG5cdFNjcmVlbi5wZXJzcGVjdGl2ZSA9IDBcblx0YW5pbWF0aW9uQ3VydmUgPSBcInNwcmluZygxMjAsIDIwLCAwLCAwLjA3KVwiXG5cdGFjdGl2YXRlZCA9IGZhbHNlXG5cdGluaXRpYWxSb3RhdGlvbiA9IG51bGxcblxuXHRjb25zdHJ1Y3RvcjogLT5cblx0XHRzdXBlclxuXHRcdFx0d2lkdGg6IFNjcmVlbi53aWR0aFxuXHRcdFx0aGVpZ2h0OiBTY3JlZW4uaGVpZ2h0XG5cdFx0XHRjbGlwOiBmYWxzZVxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiBudWxsXG5cdFx0XHRpbmRleDogMFxuXG5cdFx0dGhpcy5vcmlnaW5hbFByb3BzID0gdGhpcy5wcm9wc1xuXG5cdFx0IyBFdmVudHNcblxuXHRcdHRoaXMub24gRXZlbnRzLlBhblN0YXJ0LCAtPiBpbml0aWFsUm90YXRpb24gPSB0aGlzLnJvdGF0aW9uWlxuXHRcdHRoaXMub24gRXZlbnRzLlBhbiwgKGV2ZW50KSAtPiB0aGlzLnJvdGF0aW9uWiA9IGluaXRpYWxSb3RhdGlvbiAtICgoZXZlbnQudG91Y2hDZW50ZXJYIC0gZXZlbnQuc3RhcnRYKSAvIDQpXG5cdFx0dGhpcy5vbiBFdmVudHMuUGFuRW5kLCAtPiB0aGlzLnJvdGF0aW9uWiA9IHRoaXMucm90YXRpb25aICUgMzYwXG5cblx0dG9nZ2xlUGVyc3BlY3RpdmU6ICh2ZXJ0aWNhbFNlcGFyYXRpb24gPSA0MCwgdGVtcG9yYWxPcGFjaXR5ID0gMC44KSAtPlxuXG5cdFx0aWYgbm90IGFjdGl2YXRlZCBhbmQgbm90IF9jaGlsZHJlbkFuaW1hdGluZyh0aGlzLmNoaWxkcmVuKVxuXHRcdFx0XHRhY3RpdmF0ZWQgPSB0cnVlXG5cblx0XHRcdFx0X3NldEFsbExheWVyc0FzQ2hpbGRyZW5PZih0aGlzKVxuXG5cdFx0XHRcdHRoaXMuYW5pbWF0ZVxuXHRcdFx0XHRcdHByb3BlcnRpZXM6XG5cdFx0XHRcdFx0XHRyb3RhdGlvblo6IDQ1XG5cdFx0XHRcdFx0XHRyb3RhdGlvblg6IDQ1XG5cdFx0XHRcdFx0XHRzY2FsZVk6IDAuODYwNjJcblx0XHRcdFx0XHRcdGJhY2tncm91bmRDb2xvcjogXCJyZ2JhKDEyOCwgMTI4LCAxMjgsIDAuMilcIlxuXHRcdFx0XHRcdFx0eTogdmVydGljYWxTZXBhcmF0aW9uICogKHRoaXMuY2hpbGRyZW4ubGVuZ3RoIC8gMy40KVxuXHRcdFx0XHRcdGN1cnZlOiBhbmltYXRpb25DdXJ2ZVxuXG5cdFx0XHRcdGZvciBsYXllciBpbiB0aGlzLmNoaWxkcmVuXG5cdFx0XHRcdFx0bGF5ZXIub3JpZ2luYWxQcm9wcyA9IGxheWVyLnByb3BzXG5cblx0XHRcdFx0XHRsYXllci5hbmltYXRlXG5cdFx0XHRcdFx0XHRwcm9wZXJ0aWVzOlxuXHRcdFx0XHRcdFx0XHR6OiB2ZXJ0aWNhbFNlcGFyYXRpb24gKiAobGF5ZXIuaW5kZXggLSAxKVxuXHRcdFx0XHRcdFx0XHRvcGFjaXR5OiB0ZW1wb3JhbE9wYWNpdHlcblx0XHRcdFx0XHRcdGRlbGF5OiAodGhpcy5jaGlsZHJlbi5sZW5ndGggLSBsYXllci5pbmRleCkgLyB0aGlzLmNoaWxkcmVuLmxlbmd0aFxuXHRcdFx0XHRcdFx0Y3VydmU6IGFuaW1hdGlvbkN1cnZlXG5cblx0XHRcdGVsc2UgaWYgYWN0aXZhdGVkIGFuZCBub3QgX2NoaWxkcmVuQW5pbWF0aW5nKHRoaXMuY2hpbGRyZW4pXG5cdFx0XHRcdGFjdGl2YXRlZCA9IGZhbHNlXG5cblx0XHRcdFx0cm90YXRpb25OZWdhdGl2ZSA9IHRoaXMucm90YXRpb25aIDwgMFxuXG5cdFx0XHRcdGlmIE1hdGguYWJzKHRoaXMucm90YXRpb25aKSA+IDE4MFxuXHRcdFx0XHRcdHRoaXMub3JpZ2luYWxQcm9wcy5yb3RhdGlvblogPSBpZiByb3RhdGlvbk5lZ2F0aXZlIHRoZW4gLTM2MCBlbHNlIDM2MFxuXHRcdFx0XHRlbHNlXG5cdFx0XHRcdFx0dGhpcy5vcmlnaW5hbFByb3BzLnJvdGF0aW9uWiA9IGlmIHJvdGF0aW9uTmVnYXRpdmUgdGhlbiAtMCBlbHNlIDBcblxuXHRcdFx0XHR0aGlzLmFuaW1hdGVcblx0XHRcdFx0XHRwcm9wZXJ0aWVzOlxuXHRcdFx0XHRcdFx0cm90YXRpb25aOiB0aGlzLm9yaWdpbmFsUHJvcHMucm90YXRpb25aXG5cdFx0XHRcdFx0XHRyb3RhdGlvblg6IHRoaXMub3JpZ2luYWxQcm9wcy5yb3RhdGlvblhcblx0XHRcdFx0XHRcdHNjYWxlWTogdGhpcy5vcmlnaW5hbFByb3BzLnNjYWxlWVxuXHRcdFx0XHRcdFx0eTogdGhpcy5vcmlnaW5hbFByb3BzLnlcblx0XHRcdFx0XHRcdGJhY2tncm91bmRDb2xvcjogdGhpcy5vcmlnaW5hbFByb3BzLmJhY2tncm91bmRDb2xvclxuXHRcdFx0XHRcdGN1cnZlOiBhbmltYXRpb25DdXJ2ZVxuXG5cdFx0XHRcdGZvciBsYXllciBpbiB0aGlzLmNoaWxkcmVuXG5cdFx0XHRcdFx0bGF5ZXIuYW5pbWF0ZVxuXHRcdFx0XHRcdFx0cHJvcGVydGllczogbGF5ZXIub3JpZ2luYWxQcm9wc1xuXHRcdFx0XHRcdFx0Y3VydmU6IGFuaW1hdGlvbkN1cnZlXG5cblx0XHRcdFx0dGhpcy5vbmNlIEV2ZW50cy5BbmltYXRpb25FbmQsIC0+XG5cdFx0XHRcdFx0dGhpcy5yb3RhdGlvblogPSAwXG5cdFx0XHRcdFx0bGF5ZXIucGFyZW50ID0gbnVsbCBmb3IgbGF5ZXIgaW4gdGhpcy5jaGlsZHJlblxuXG5cdF9zZXRBbGxMYXllcnNBc0NoaWxkcmVuT2YgPSAocGFyZW50KSAtPlxuXHRcdGZvciBsYXllciBpbiBGcmFtZXIuQ3VycmVudENvbnRleHQuZ2V0TGF5ZXJzKCkgd2hlbiBsYXllci5wYXJlbnQgaXMgbnVsbCBhbmQgbGF5ZXIgaXNudCBwYXJlbnRcblx0XHRcdHBhcmVudC5hZGRTdWJMYXllcihsYXllcilcblxuXHRfY2hpbGRyZW5BbmltYXRpbmcgPSAobGF5ZXJzQXJyYXkpIC0+XG5cdFx0Xy5zb21lIGxheWVyc0FycmF5LCAobGF5ZXIpIC0+IGxheWVyLmlzQW5pbWF0aW5nIl19
