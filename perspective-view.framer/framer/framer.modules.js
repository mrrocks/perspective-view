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
      return this.rotationZ = initialRotation - ((event.x - event.startX) / 4);
    });
  }

  PerspectiveLayer.prototype.togglePerspective = function(verticalSeparation, temporalOpacity) {
    var i, j, layer, len, len1, ref, ref1, results;
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
      this.animate({
        properties: this.originalProps,
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
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvZnJhbnAvRHJvcGJveC9Qcm90b3R5cGVzL3BlcnNwZWN0aXZlLXZpZXcvcGVyc3BlY3RpdmUtdmlldy5mcmFtZXIvbW9kdWxlcy9wZXJzcGVjdGl2ZS12aWV3LmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBLElBQUE7OztBQUFNLE9BQU8sQ0FBQztBQUNiLE1BQUE7Ozs7RUFBQSxNQUFNLENBQUMsV0FBUCxHQUFxQjs7RUFDckIsY0FBQSxHQUFpQjs7RUFDakIsU0FBQSxHQUFZOztFQUNaLGVBQUEsR0FBa0I7O0VBRUwsMEJBQUE7SUFDWixrREFDQztNQUFBLEtBQUEsRUFBTyxNQUFNLENBQUMsS0FBZDtNQUNBLE1BQUEsRUFBUSxNQUFNLENBQUMsTUFEZjtNQUVBLElBQUEsRUFBTSxLQUZOO01BR0EsZUFBQSxFQUFpQixJQUhqQjtNQUlBLEtBQUEsRUFBTyxDQUpQO0tBREQ7SUFPQSxJQUFJLENBQUMsYUFBTCxHQUFxQixJQUFJLENBQUM7SUFJMUIsSUFBSSxDQUFDLEVBQUwsQ0FBUSxNQUFNLENBQUMsUUFBZixFQUF5QixTQUFBO2FBQUcsZUFBQSxHQUFrQixJQUFJLENBQUM7SUFBMUIsQ0FBekI7SUFDQSxJQUFJLENBQUMsRUFBTCxDQUFRLE1BQU0sQ0FBQyxHQUFmLEVBQW9CLFNBQUMsS0FBRDthQUFXLElBQUksQ0FBQyxTQUFMLEdBQWlCLGVBQUEsR0FBa0IsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFOLEdBQVUsS0FBSyxDQUFDLE1BQWpCLENBQUEsR0FBMkIsQ0FBNUI7SUFBOUMsQ0FBcEI7RUFiWTs7NkJBZWIsaUJBQUEsR0FBbUIsU0FBQyxrQkFBRCxFQUEwQixlQUExQjtBQUVsQixRQUFBOztNQUZtQixxQkFBcUI7OztNQUFJLGtCQUFrQjs7SUFFOUQsSUFBRyxDQUFJLFNBQUosSUFBa0IsQ0FBSSxrQkFBQSxDQUFtQixJQUFJLENBQUMsUUFBeEIsQ0FBekI7TUFDRSxTQUFBLEdBQVk7TUFFWix5QkFBQSxDQUEwQixJQUExQjtNQUVBLElBQUksQ0FBQyxPQUFMLENBQ0M7UUFBQSxVQUFBLEVBQ0M7VUFBQSxTQUFBLEVBQVcsRUFBWDtVQUNBLFNBQUEsRUFBVyxFQURYO1VBRUEsTUFBQSxFQUFRLE9BRlI7VUFHQSxlQUFBLEVBQWlCLDBCQUhqQjtVQUlBLENBQUEsRUFBRyxrQkFBQSxHQUFxQixDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBZCxHQUF1QixHQUF4QixDQUp4QjtTQUREO1FBTUEsS0FBQSxFQUFPLGNBTlA7T0FERDtBQVNBO0FBQUE7V0FBQSxxQ0FBQTs7UUFDQyxLQUFLLENBQUMsYUFBTixHQUFzQixLQUFLLENBQUM7cUJBRTVCLEtBQUssQ0FBQyxPQUFOLENBQ0M7VUFBQSxVQUFBLEVBQ0M7WUFBQSxDQUFBLEVBQUcsa0JBQUEsR0FBcUIsQ0FBQyxLQUFLLENBQUMsS0FBTixHQUFjLENBQWYsQ0FBeEI7WUFDQSxPQUFBLEVBQVMsZUFEVDtXQUREO1VBR0EsS0FBQSxFQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFkLEdBQXVCLEtBQUssQ0FBQyxLQUE5QixDQUFBLEdBQXVDLElBQUksQ0FBQyxRQUFRLENBQUMsTUFINUQ7VUFJQSxLQUFBLEVBQU8sY0FKUDtTQUREO0FBSEQ7cUJBZEY7S0FBQSxNQXdCTSxJQUFHLFNBQUEsSUFBYyxDQUFJLGtCQUFBLENBQW1CLElBQUksQ0FBQyxRQUF4QixDQUFyQjtNQUNKLFNBQUEsR0FBWTtNQUVaLElBQUksQ0FBQyxPQUFMLENBQ0M7UUFBQSxVQUFBLEVBQVksSUFBSSxDQUFDLGFBQWpCO1FBQ0EsS0FBQSxFQUFPLGNBRFA7T0FERDtBQUlBO0FBQUEsV0FBQSx3Q0FBQTs7UUFDQyxLQUFLLENBQUMsT0FBTixDQUNDO1VBQUEsVUFBQSxFQUFZLEtBQUssQ0FBQyxhQUFsQjtVQUNBLEtBQUEsRUFBTyxjQURQO1NBREQ7QUFERDthQUtBLElBQUksQ0FBQyxJQUFMLENBQVUsTUFBTSxDQUFDLFlBQWpCLEVBQStCLFNBQUE7QUFDOUIsWUFBQTtBQUFBO0FBQUE7YUFBQSx3Q0FBQTs7d0JBQUEsS0FBSyxDQUFDLE1BQU4sR0FBZTtBQUFmOztNQUQ4QixDQUEvQixFQVpJOztFQTFCWTs7RUF5Q25CLHlCQUFBLEdBQTRCLFNBQUMsTUFBRDtBQUUzQixRQUFBO0FBQUE7QUFBQTtTQUFBLHFDQUFBOztVQUFvRCxLQUFLLENBQUMsTUFBTixLQUFnQixJQUFoQixJQUF5QixLQUFBLEtBQVc7cUJBQ3ZGLE1BQU0sQ0FBQyxXQUFQLENBQW1CLEtBQW5COztBQUREOztFQUYyQjs7RUFLNUIsa0JBQUEsR0FBcUIsU0FBQyxXQUFEO1dBQ3BCLENBQUMsQ0FBQyxJQUFGLENBQU8sV0FBUCxFQUFvQixTQUFDLEtBQUQ7YUFBVyxLQUFLLENBQUM7SUFBakIsQ0FBcEI7RUFEb0I7Ozs7R0FuRWlCIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImNsYXNzIGV4cG9ydHMuUGVyc3BlY3RpdmVMYXllciBleHRlbmRzIExheWVyXG5cdFNjcmVlbi5wZXJzcGVjdGl2ZSA9IDBcblx0YW5pbWF0aW9uQ3VydmUgPSBcInNwcmluZygxMjAsIDIwLCAwLCAwLjA3KVwiXG5cdGFjdGl2YXRlZCA9IGZhbHNlXG5cdGluaXRpYWxSb3RhdGlvbiA9IG51bGxcblxuXHRjb25zdHJ1Y3RvcjogLT5cblx0XHRzdXBlclxuXHRcdFx0d2lkdGg6IFNjcmVlbi53aWR0aFxuXHRcdFx0aGVpZ2h0OiBTY3JlZW4uaGVpZ2h0XG5cdFx0XHRjbGlwOiBmYWxzZVxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiBudWxsXG5cdFx0XHRpbmRleDogMFxuXG5cdFx0dGhpcy5vcmlnaW5hbFByb3BzID0gdGhpcy5wcm9wc1xuXG5cdFx0IyBFdmVudHNcblxuXHRcdHRoaXMub24gRXZlbnRzLlBhblN0YXJ0LCAtPiBpbml0aWFsUm90YXRpb24gPSB0aGlzLnJvdGF0aW9uWlxuXHRcdHRoaXMub24gRXZlbnRzLlBhbiwgKGV2ZW50KSAtPiB0aGlzLnJvdGF0aW9uWiA9IGluaXRpYWxSb3RhdGlvbiAtICgoZXZlbnQueCAtIGV2ZW50LnN0YXJ0WCkgLyA0KVxuXG5cdHRvZ2dsZVBlcnNwZWN0aXZlOiAodmVydGljYWxTZXBhcmF0aW9uID0gNDAsIHRlbXBvcmFsT3BhY2l0eSA9IDAuOCkgLT5cblxuXHRcdGlmIG5vdCBhY3RpdmF0ZWQgYW5kIG5vdCBfY2hpbGRyZW5BbmltYXRpbmcodGhpcy5jaGlsZHJlbilcblx0XHRcdFx0YWN0aXZhdGVkID0gdHJ1ZVxuXG5cdFx0XHRcdF9zZXRBbGxMYXllcnNBc0NoaWxkcmVuT2YodGhpcylcblxuXHRcdFx0XHR0aGlzLmFuaW1hdGVcblx0XHRcdFx0XHRwcm9wZXJ0aWVzOlxuXHRcdFx0XHRcdFx0cm90YXRpb25aOiA0NVxuXHRcdFx0XHRcdFx0cm90YXRpb25YOiA0NVxuXHRcdFx0XHRcdFx0c2NhbGVZOiAwLjg2MDYyXG5cdFx0XHRcdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IFwicmdiYSgxMjgsIDEyOCwgMTI4LCAwLjIpXCJcblx0XHRcdFx0XHRcdHk6IHZlcnRpY2FsU2VwYXJhdGlvbiAqICh0aGlzLmNoaWxkcmVuLmxlbmd0aCAvIDMuNClcblx0XHRcdFx0XHRjdXJ2ZTogYW5pbWF0aW9uQ3VydmVcblxuXHRcdFx0XHRmb3IgbGF5ZXIgaW4gdGhpcy5jaGlsZHJlblxuXHRcdFx0XHRcdGxheWVyLm9yaWdpbmFsUHJvcHMgPSBsYXllci5wcm9wc1xuXG5cdFx0XHRcdFx0bGF5ZXIuYW5pbWF0ZVxuXHRcdFx0XHRcdFx0cHJvcGVydGllczpcblx0XHRcdFx0XHRcdFx0ejogdmVydGljYWxTZXBhcmF0aW9uICogKGxheWVyLmluZGV4IC0gMSlcblx0XHRcdFx0XHRcdFx0b3BhY2l0eTogdGVtcG9yYWxPcGFjaXR5XG5cdFx0XHRcdFx0XHRkZWxheTogKHRoaXMuY2hpbGRyZW4ubGVuZ3RoIC0gbGF5ZXIuaW5kZXgpIC8gdGhpcy5jaGlsZHJlbi5sZW5ndGhcblx0XHRcdFx0XHRcdGN1cnZlOiBhbmltYXRpb25DdXJ2ZVxuXG5cdFx0XHRlbHNlIGlmIGFjdGl2YXRlZCBhbmQgbm90IF9jaGlsZHJlbkFuaW1hdGluZyh0aGlzLmNoaWxkcmVuKVxuXHRcdFx0XHRhY3RpdmF0ZWQgPSBmYWxzZVxuXG5cdFx0XHRcdHRoaXMuYW5pbWF0ZVxuXHRcdFx0XHRcdHByb3BlcnRpZXM6IHRoaXMub3JpZ2luYWxQcm9wc1xuXHRcdFx0XHRcdGN1cnZlOiBhbmltYXRpb25DdXJ2ZVxuXG5cdFx0XHRcdGZvciBsYXllciBpbiB0aGlzLmNoaWxkcmVuXG5cdFx0XHRcdFx0bGF5ZXIuYW5pbWF0ZVxuXHRcdFx0XHRcdFx0cHJvcGVydGllczogbGF5ZXIub3JpZ2luYWxQcm9wc1xuXHRcdFx0XHRcdFx0Y3VydmU6IGFuaW1hdGlvbkN1cnZlXG5cblx0XHRcdFx0dGhpcy5vbmNlIEV2ZW50cy5BbmltYXRpb25FbmQsIC0+XG5cdFx0XHRcdFx0bGF5ZXIucGFyZW50ID0gbnVsbCBmb3IgbGF5ZXIgaW4gdGhpcy5jaGlsZHJlblxuXG5cdF9zZXRBbGxMYXllcnNBc0NoaWxkcmVuT2YgPSAocGFyZW50KSAtPlxuXG5cdFx0Zm9yIGxheWVyIGluIEZyYW1lci5DdXJyZW50Q29udGV4dC5nZXRMYXllcnMoKSB3aGVuIGxheWVyLnBhcmVudCBpcyBudWxsIGFuZCBsYXllciBpc250IHBhcmVudFxuXHRcdFx0cGFyZW50LmFkZFN1YkxheWVyKGxheWVyKVxuXG5cdF9jaGlsZHJlbkFuaW1hdGluZyA9IChsYXllcnNBcnJheSkgLT5cblx0XHRfLnNvbWUgbGF5ZXJzQXJyYXksIChsYXllcikgLT4gbGF5ZXIuaXNBbmltYXRpbmdcbiJdfQ==
