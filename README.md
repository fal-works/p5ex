# p5ex.js
An extension of p5.js.

Note: The development of this library has been started just for personal use and everything may change in future.

---

## Usage

### Install
```
npm install p5ex --save
```

### Load

Both ES6 module and UMD (and also their minified versions) are available.
Note: p5.js must be loaded before loading p5ex.

```javascript
// Example: loading in ES6 or TypeScript

import * as p5ex from 'p5ex';
```

```html
<!-- Example: loading in HTML -->
<!-- This will define a new namespace 'p5ex' in the global namespace. -->

<script src="(your directory path)/p5ex.min.js"></script>
```

### Create

Create a p5ex instance by `new p5exClass();` instead of `new p5();`.  
For details, refer to documents about instance mode of p5.js.
```javascript
new p5ex.p5exClass([sketch[, node[, sync]]]);
// or
new p5ex.p5exClass([sketch[, sync]]);

// sketch function:
sketch(p5exInstance);

// node: any HTMLElement or its ID attribute
// sync: boolean
```


## Reference

See doc/index.html (very rough for now)

This document includes works that are distributed under the Apache License 2.0.
