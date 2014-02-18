nodejs DOM rendering
================
This is not a lib yet, however will be part of the framework, will see, at the moment basically a proof of concept.

I've pulled out all of browser functionality from JSDOM and also get rid of all Contextify dependency. With `window`/`document` augmentation we can easly render the page using client libs, such as d3 on the server side.

```
npm install
```

usage:
```
node main.js 3,1,4,6,2,6
```

or (with defaults)

```
node main.js
```

