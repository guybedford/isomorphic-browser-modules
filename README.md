# &lt;script type="module"> Isomorphic browser modules workflow

This project was created as a follow-up to discussions around how to load ES modules
in modern browsers, while providing a fallback for older browsers that only
support scripts.

The approach here is to use a `modules-bootstrap.js` that is first attempted to load
as a module and second as a script.

Custom attributes on the scripts can then be used to point to the correct actual
main entry points to be loaded once we know which loading mechanism to use.

### Demo

Clone the repo and open `app.html` here when running a web server.

In the latest Safari Technology Preview release with ES modules support, it will use
the ES modules code, while in older browsers it will fallback to SystemJS production and
System.register module format loading.

To change the code and run a new build use `npm install && npm run build`.

### Bootstrap Explained

The file `app.html` uses the following HTML for this bootstrap:

```html
<script type="module" src="modules-bootstrap.js" main="dist-esm/main.js"></script>
<script defer src="modules-bootstrap.js" main="dist-system/main.js" systemjs="/path/to/system-production.js"></script>
```

When `<script type="module">` is not supported in the browser, we first load the production
build of SystemJS (from SystemJS 0.20) that just supports System.register module format loading, to match ES module semantics.

The approach is fullly compatible with CSP, and the `modules-bootstrap.js` file is 400 bytes
to load on app startup, resulting in minimal additional bandwidth and only a single round trip
to determine whether to use the ESM or System.register entry point.

The fallback for older browsers loads the 5KB SystemJS production build followed by the System.register module files, which is itself an optimized production workflow.

### Build Process

The build process is then to compile ES modules into two folders - `dist-esm` for ES modules
and `dist-system` for System.register modules. The creation of `dist-system` can be done
with the following Babel code:

```
  npm install babel-cli babel-plugin-transform-es2015-modules-systemjs --save-dev
  babel src --out-dir dist-system --plugins transform-es2015-modules-systemjs
```

SystemJS 0.20 can be installed currently via `npm install systemjs@next`.


_I call this approach an isomorphic modules workflow because by using System.register, we ensure module
semantics are fully replicated between ES module environments and older browsers.
In Mathematics, two spaces are considered isomorphic when they have exactly the same structure,
which is effectly what we're maintaining by matching semantics. It is also partially a joke -
that the frontend community has used the term incorrectly for so long (server and browser are always semantically different, and code that runs between the two will have different behaviours between the two, which is the opposite of isomorphic), so it's nice to have an excuse to use it in the right context!_
