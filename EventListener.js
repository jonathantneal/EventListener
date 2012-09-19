// EventListener | @jon_neal | MIT/GPL2
!window.addEventListener && Element.prototype && (function () {
	function addToPrototype(name, method) {
		Window.prototype[name] = HTMLDocument.prototype[name] = Element.prototype[name] = method;
	}

	var registry = [];

	addToPrototype("addEventListener", function (type, listener) {
		var target = this;

		registry.unshift({
			__listener: function (event) {
				event.currentTarget = target;
				event.preventDefault = function () { event.returnValue = false };
				event.stopPropagation = function () { event.cancelBubble = true };
				event.target = event.srcElement || target;

				listener.call(target, event);
			},
			listener: listener,
			target: target,
			type: type
		});

		this.attachEvent("on" + type, registry[0].__listener);
	});

	addToPrototype("removeEventListener", function (type, listener) {
		for (var index = 0; registry[index]; ++index) {
			if (registry[index].target == this && registry[index].type == type && registry[index].listener == listener) {
				return this.detachEvent("on" + type, registry.splice(index, 1)[0].__listener);
			}
		}
	});

	addToPrototype("dispatchEvent", function (eventObject) {
		return this.fireEvent("on" + eventObject.type, eventObject);
	});
})();