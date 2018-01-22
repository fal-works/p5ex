# p5ex.js
An extension of p5.js.

---

## Usage

### Install
```
npm install p5ex --save
```

### Load

Both ES6 module and UMD (and also their minified versions) are available.

```javascript
// Example: loading in ES6 or TypeScript

import p5ex from 'p5ex';
```

```html
<!-- Example: loading in HTML -->
<!-- This will define 'p5ex' in the global namespace. -->

<script src="(your directory path)/p5ex.min.js"></script>
```

### Create

Create a p5ex instance by `new p5ex();` instead of `new p5();`.  
For details, refer to documents about instance mode of p5.js.
```javascript
new p5ex([sketch[, node[, sync]]]);
// or
new p5ex([sketch[, sync]]);

// sketch function:
sketch(p5exInstance);

// node: any HTMLElement or its ID attribute
// sync: boolean
```


## Reference

See doc/index.html (very rough for now)
