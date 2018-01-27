
# nodes v0.0.1

```js
const noad = require('noad')

// The created node is used for cloning only.
const node = noad('span').text('hello ').children(noad => {
  noad('b').text('world')
}).class('my-class')
```
