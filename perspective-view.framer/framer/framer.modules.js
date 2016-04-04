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
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvZnJhbnAvRHJvcGJveC9Qcm90b3R5cGVzL3BlcnNwZWN0aXZlLXZpZXcvcGVyc3BlY3RpdmUtdmlldy5mcmFtZXIvbW9kdWxlcy9wZXJzcGVjdGl2ZS12aWV3LmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBLElBQUE7OztBQUFNLE9BQU8sQ0FBQztBQUNiLE1BQUE7Ozs7RUFBQSxNQUFNLENBQUMsV0FBUCxHQUFxQjs7RUFDckIsY0FBQSxHQUFpQjs7RUFDakIsU0FBQSxHQUFZOztFQUNaLGVBQUEsR0FBa0I7O0VBRUwsMEJBQUE7SUFDWixrREFDQztNQUFBLEtBQUEsRUFBTyxNQUFNLENBQUMsS0FBZDtNQUNBLE1BQUEsRUFBUSxNQUFNLENBQUMsTUFEZjtNQUVBLElBQUEsRUFBTSxLQUZOO01BR0EsZUFBQSxFQUFpQixJQUhqQjtNQUlBLEtBQUEsRUFBTyxDQUpQO0tBREQ7SUFPQSxJQUFJLENBQUMsYUFBTCxHQUFxQixJQUFJLENBQUM7SUFJMUIsSUFBSSxDQUFDLEVBQUwsQ0FBUSxNQUFNLENBQUMsUUFBZixFQUF5QixTQUFBO2FBQUcsZUFBQSxHQUFrQixJQUFJLENBQUM7SUFBMUIsQ0FBekI7SUFDQSxJQUFJLENBQUMsRUFBTCxDQUFRLE1BQU0sQ0FBQyxHQUFmLEVBQW9CLFNBQUMsS0FBRDthQUFXLElBQUksQ0FBQyxTQUFMLEdBQWlCLGVBQUEsR0FBa0IsQ0FBQyxDQUFDLEtBQUssQ0FBQyxZQUFOLEdBQXFCLEtBQUssQ0FBQyxNQUE1QixDQUFBLEdBQXNDLENBQXZDO0lBQTlDLENBQXBCO0VBYlk7OzZCQWViLGlCQUFBLEdBQW1CLFNBQUMsa0JBQUQsRUFBMEIsZUFBMUI7QUFFbEIsUUFBQTs7TUFGbUIscUJBQXFCOzs7TUFBSSxrQkFBa0I7O0lBRTlELElBQUcsQ0FBSSxTQUFKLElBQWtCLENBQUksa0JBQUEsQ0FBbUIsSUFBSSxDQUFDLFFBQXhCLENBQXpCO01BQ0UsU0FBQSxHQUFZO01BRVoseUJBQUEsQ0FBMEIsSUFBMUI7TUFFQSxJQUFJLENBQUMsT0FBTCxDQUNDO1FBQUEsVUFBQSxFQUNDO1VBQUEsU0FBQSxFQUFXLEVBQVg7VUFDQSxTQUFBLEVBQVcsRUFEWDtVQUVBLE1BQUEsRUFBUSxPQUZSO1VBR0EsZUFBQSxFQUFpQiwwQkFIakI7VUFJQSxDQUFBLEVBQUcsa0JBQUEsR0FBcUIsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQWQsR0FBdUIsR0FBeEIsQ0FKeEI7U0FERDtRQU1BLEtBQUEsRUFBTyxjQU5QO09BREQ7QUFTQTtBQUFBO1dBQUEscUNBQUE7O1FBQ0MsS0FBSyxDQUFDLGFBQU4sR0FBc0IsS0FBSyxDQUFDO3FCQUU1QixLQUFLLENBQUMsT0FBTixDQUNDO1VBQUEsVUFBQSxFQUNDO1lBQUEsQ0FBQSxFQUFHLGtCQUFBLEdBQXFCLENBQUMsS0FBSyxDQUFDLEtBQU4sR0FBYyxDQUFmLENBQXhCO1lBQ0EsT0FBQSxFQUFTLGVBRFQ7V0FERDtVQUdBLEtBQUEsRUFBTyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBZCxHQUF1QixLQUFLLENBQUMsS0FBOUIsQ0FBQSxHQUF1QyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BSDVEO1VBSUEsS0FBQSxFQUFPLGNBSlA7U0FERDtBQUhEO3FCQWRGO0tBQUEsTUF3Qk0sSUFBRyxTQUFBLElBQWMsQ0FBSSxrQkFBQSxDQUFtQixJQUFJLENBQUMsUUFBeEIsQ0FBckI7TUFDSixTQUFBLEdBQVk7TUFFWixJQUFJLENBQUMsT0FBTCxDQUNDO1FBQUEsVUFBQSxFQUFZLElBQUksQ0FBQyxhQUFqQjtRQUNBLEtBQUEsRUFBTyxjQURQO09BREQ7QUFJQTtBQUFBLFdBQUEsd0NBQUE7O1FBQ0MsS0FBSyxDQUFDLE9BQU4sQ0FDQztVQUFBLFVBQUEsRUFBWSxLQUFLLENBQUMsYUFBbEI7VUFDQSxLQUFBLEVBQU8sY0FEUDtTQUREO0FBREQ7YUFLQSxJQUFJLENBQUMsSUFBTCxDQUFVLE1BQU0sQ0FBQyxZQUFqQixFQUErQixTQUFBO0FBQzlCLFlBQUE7QUFBQTtBQUFBO2FBQUEsd0NBQUE7O3dCQUFBLEtBQUssQ0FBQyxNQUFOLEdBQWU7QUFBZjs7TUFEOEIsQ0FBL0IsRUFaSTs7RUExQlk7O0VBeUNuQix5QkFBQSxHQUE0QixTQUFDLE1BQUQ7QUFFM0IsUUFBQTtBQUFBO0FBQUE7U0FBQSxxQ0FBQTs7VUFBb0QsS0FBSyxDQUFDLE1BQU4sS0FBZ0IsSUFBaEIsSUFBeUIsS0FBQSxLQUFXO3FCQUN2RixNQUFNLENBQUMsV0FBUCxDQUFtQixLQUFuQjs7QUFERDs7RUFGMkI7O0VBSzVCLGtCQUFBLEdBQXFCLFNBQUMsV0FBRDtXQUNwQixDQUFDLENBQUMsSUFBRixDQUFPLFdBQVAsRUFBb0IsU0FBQyxLQUFEO2FBQVcsS0FBSyxDQUFDO0lBQWpCLENBQXBCO0VBRG9COzs7O0dBbkVpQiIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJjbGFzcyBleHBvcnRzLlBlcnNwZWN0aXZlTGF5ZXIgZXh0ZW5kcyBMYXllclxuXHRTY3JlZW4ucGVyc3BlY3RpdmUgPSAwXG5cdGFuaW1hdGlvbkN1cnZlID0gXCJzcHJpbmcoMTIwLCAyMCwgMCwgMC4wNylcIlxuXHRhY3RpdmF0ZWQgPSBmYWxzZVxuXHRpbml0aWFsUm90YXRpb24gPSBudWxsXG5cblx0Y29uc3RydWN0b3I6IC0+XG5cdFx0c3VwZXJcblx0XHRcdHdpZHRoOiBTY3JlZW4ud2lkdGhcblx0XHRcdGhlaWdodDogU2NyZWVuLmhlaWdodFxuXHRcdFx0Y2xpcDogZmFsc2Vcblx0XHRcdGJhY2tncm91bmRDb2xvcjogbnVsbFxuXHRcdFx0aW5kZXg6IDBcblxuXHRcdHRoaXMub3JpZ2luYWxQcm9wcyA9IHRoaXMucHJvcHNcblxuXHRcdCMgRXZlbnRzXG5cblx0XHR0aGlzLm9uIEV2ZW50cy5QYW5TdGFydCwgLT4gaW5pdGlhbFJvdGF0aW9uID0gdGhpcy5yb3RhdGlvblpcblx0XHR0aGlzLm9uIEV2ZW50cy5QYW4sIChldmVudCkgLT4gdGhpcy5yb3RhdGlvblogPSBpbml0aWFsUm90YXRpb24gLSAoKGV2ZW50LnRvdWNoQ2VudGVyWCAtIGV2ZW50LnN0YXJ0WCkgLyA0KVxuXG5cdHRvZ2dsZVBlcnNwZWN0aXZlOiAodmVydGljYWxTZXBhcmF0aW9uID0gNDAsIHRlbXBvcmFsT3BhY2l0eSA9IDAuOCkgLT5cblxuXHRcdGlmIG5vdCBhY3RpdmF0ZWQgYW5kIG5vdCBfY2hpbGRyZW5BbmltYXRpbmcodGhpcy5jaGlsZHJlbilcblx0XHRcdFx0YWN0aXZhdGVkID0gdHJ1ZVxuXG5cdFx0XHRcdF9zZXRBbGxMYXllcnNBc0NoaWxkcmVuT2YodGhpcylcblxuXHRcdFx0XHR0aGlzLmFuaW1hdGVcblx0XHRcdFx0XHRwcm9wZXJ0aWVzOlxuXHRcdFx0XHRcdFx0cm90YXRpb25aOiA0NVxuXHRcdFx0XHRcdFx0cm90YXRpb25YOiA0NVxuXHRcdFx0XHRcdFx0c2NhbGVZOiAwLjg2MDYyXG5cdFx0XHRcdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IFwicmdiYSgxMjgsIDEyOCwgMTI4LCAwLjIpXCJcblx0XHRcdFx0XHRcdHk6IHZlcnRpY2FsU2VwYXJhdGlvbiAqICh0aGlzLmNoaWxkcmVuLmxlbmd0aCAvIDMuNClcblx0XHRcdFx0XHRjdXJ2ZTogYW5pbWF0aW9uQ3VydmVcblxuXHRcdFx0XHRmb3IgbGF5ZXIgaW4gdGhpcy5jaGlsZHJlblxuXHRcdFx0XHRcdGxheWVyLm9yaWdpbmFsUHJvcHMgPSBsYXllci5wcm9wc1xuXG5cdFx0XHRcdFx0bGF5ZXIuYW5pbWF0ZVxuXHRcdFx0XHRcdFx0cHJvcGVydGllczpcblx0XHRcdFx0XHRcdFx0ejogdmVydGljYWxTZXBhcmF0aW9uICogKGxheWVyLmluZGV4IC0gMSlcblx0XHRcdFx0XHRcdFx0b3BhY2l0eTogdGVtcG9yYWxPcGFjaXR5XG5cdFx0XHRcdFx0XHRkZWxheTogKHRoaXMuY2hpbGRyZW4ubGVuZ3RoIC0gbGF5ZXIuaW5kZXgpIC8gdGhpcy5jaGlsZHJlbi5sZW5ndGhcblx0XHRcdFx0XHRcdGN1cnZlOiBhbmltYXRpb25DdXJ2ZVxuXG5cdFx0XHRlbHNlIGlmIGFjdGl2YXRlZCBhbmQgbm90IF9jaGlsZHJlbkFuaW1hdGluZyh0aGlzLmNoaWxkcmVuKVxuXHRcdFx0XHRhY3RpdmF0ZWQgPSBmYWxzZVxuXG5cdFx0XHRcdHRoaXMuYW5pbWF0ZVxuXHRcdFx0XHRcdHByb3BlcnRpZXM6IHRoaXMub3JpZ2luYWxQcm9wc1xuXHRcdFx0XHRcdGN1cnZlOiBhbmltYXRpb25DdXJ2ZVxuXG5cdFx0XHRcdGZvciBsYXllciBpbiB0aGlzLmNoaWxkcmVuXG5cdFx0XHRcdFx0bGF5ZXIuYW5pbWF0ZVxuXHRcdFx0XHRcdFx0cHJvcGVydGllczogbGF5ZXIub3JpZ2luYWxQcm9wc1xuXHRcdFx0XHRcdFx0Y3VydmU6IGFuaW1hdGlvbkN1cnZlXG5cblx0XHRcdFx0dGhpcy5vbmNlIEV2ZW50cy5BbmltYXRpb25FbmQsIC0+XG5cdFx0XHRcdFx0bGF5ZXIucGFyZW50ID0gbnVsbCBmb3IgbGF5ZXIgaW4gdGhpcy5jaGlsZHJlblxuXG5cdF9zZXRBbGxMYXllcnNBc0NoaWxkcmVuT2YgPSAocGFyZW50KSAtPlxuXG5cdFx0Zm9yIGxheWVyIGluIEZyYW1lci5DdXJyZW50Q29udGV4dC5nZXRMYXllcnMoKSB3aGVuIGxheWVyLnBhcmVudCBpcyBudWxsIGFuZCBsYXllciBpc250IHBhcmVudFxuXHRcdFx0cGFyZW50LmFkZFN1YkxheWVyKGxheWVyKVxuXG5cdF9jaGlsZHJlbkFuaW1hdGluZyA9IChsYXllcnNBcnJheSkgLT5cblx0XHRfLnNvbWUgbGF5ZXJzQXJyYXksIChsYXllcikgLT4gbGF5ZXIuaXNBbmltYXRpbmdcbiJdfQ==
