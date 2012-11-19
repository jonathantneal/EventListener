// EventListener | MIT/GPL2 | github.com/jonathantneal/EventListener

!this.addEventListener && this.Element && (function () {
	function addToPrototype(name, method) {
		Window.prototype[name] = HTMLDocument.prototype[name] = Element.prototype[name] = method;
	}

	var registry = [];

	// add
	addToPrototype("addEventListener", function (type, listener) {
		var target = this;

		registry.unshift({
			__listener: function (event) {
				event.currentTarget = target;
				event.pageX = event.clientX + document.documentElement.scrollLeft;
				event.pageY = event.clientY + document.documentElement.scrollTop;
				event.preventDefault = function () { event.returnValue = false };
				event.relatedTarget = event.fromElement || null;
				event.stopPropagation = function () { event.cancelBubble = true };
				event.relatedTarget = event.fromElement || null;
				event.target = event.srcElement || target;
				event.timeStamp = +new Date;

				listener.call(target, event);
			},
			listener: listener,
			target: target,
			type: type
		});

		this.attachEvent("on" + type, registry[0].__listener);
	});

	// remove
	addToPrototype("removeEventListener", function (type, listener) {
		for (var index = 0, length = registry.length; index < length; ++index) {
			if (registry[index].target == this && registry[index].type == type && registry[index].listener == listener) {
				return this.detachEvent("on" + type, registry.splice(index, 1)[0].__listener);
			}
		}
	});

	// dispatch
	addToPrototype("dispatchEvent", function (eventObject) {
		try {
			return this.fireEvent("on" + eventObject.type, eventObject);
		} catch (error) {
			for (var index = 0, length = registry.length; index < length; ++index) {
				if (registry[index].target == this && registry[index].type == eventObject.type) {
					registry[index].__listener.call(this, eventObject);
				}
			}
		}
	});
})();