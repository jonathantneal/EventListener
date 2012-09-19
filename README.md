# EventListener Polyfill

Is IE8 your new IE6? Level the playing field with polyfills.

This script polyfills **addEventListener**, **removeEventListener**, and **dispatchEvent**. It is less than half a kilobyte minified and gzipped.

## addEventListener

addEventListener registers a single event listener on a single target.

### Syntax

```js
target.addEventListener(type, listener);
```

**type**: A string representing the event type to listen for.

**listener**: The object that receives a notification when an event of the specified type occurs. This must be an object implementing the EventListener interface, or simply a JavaScript function.

It should be noted that **useCapture** has not been polyfilled.

## removeEventListener

removeEventListener unregisters a single event listener on a single target.

### Syntax

```js
target.removeEventListener(type, listener);
```

**type**: A string representing the event type being removed.

**listener**: The EventListener object or function to be removed.

It should be noted that **useCapture** has not been polyfilled.

## dispatchEvent

Dispatches an event into the event system. The event is subject to the same capturing and bubbling behavior as directly dispatched events.

### Syntax

```js
bool = target.dispatchEvent(event);
```

**event**: An event object to be dispatched.

It should be noted that **`document.createEvent`** has not been polyfilled.