# spectre-auto-complete

Autocomplete library for spectre css framework https://picturepan2.github.io/spectre/

### Instalation:

#### Requirement:

- JQuery 3.x
- Spectre 0.5.x

#### CDN:

[![](https://data.jsdelivr.com/v1/package/npm/spectre-auto-complete/badge)](https://www.jsdelivr.com/package/npm/spectre-auto-complete)

```
https://cdn.jsdelivr.net/npm/spectre-auto-complete@latest/spectre-auto-complete.min.css
https://cdn.jsdelivr.net/npm/spectre-auto-complete@latest/spectre-auto-complete.min.js
```

#### Example:

```html
<html>
  <header>
    <!-- spectre -->
    <link rel="stylesheet" href="spectre.min.css" />
    <link rel="stylesheet" href="spectre-exp.min.css" />
    <link rel="stylesheet" href="spectre-icons.min.css" />

    <!-- spectre-auto-complete CSS -->
    <link
      rel="stylesheet"
      href="https://cdn.jsdelivr.net/npm/spectre-auto-complete@latest/spectre-auto-complete.min.css"
    />
  </header>
  <body>
    <!-- JQuery -->
    <script src="jquery-3.x.min.js"></script>

    <!-- spectre-auto-complete JS -->
    <script src="https://cdn.jsdelivr.net/npm/spectre-auto-complete@latest/spectre-auto-complete.min.js"></script>
  </body>
</html>
```

### Usage:

**HTML**

```html
<div class="form-group">
  <div class="form-autocomplete">
    <input class="form-input form-autocomplete-input" />
  </div>
</div>
```

**Javascript**

```javascript
$(".form-autocomplete").autoComplete({
  source: function(inputValue, callback) {
    // Do something like fetch data with xhr
    var data = ["apple", "banana", "guava"];

    callback(data, null); // If error, you can use callback(null, error); . Error will passed as argument to error handler
  }
});
```

### Options arguments:

```javascript
options["source"] = options.source || [];
options["render"] = options.render || defaultRender;
options["error"] = options.error || console.error;

options["delay"] = options.delay || 0;
options["minChar"] = options.minChar || 0;
options["menuClass"] = options.menuClass || "";
options["menuItemClass"] = options.menuItemClass || "";

options["empty"] = options.empty || "Not Found";

options["cache"] = options.cache || false;
options["clearCacheInterval"] = options.clearCacheInterval || 1000 * 60 * 10;

options["runOnFocus"] = options.runOnFocus || true;
```

### HANDLER

- `source(value, callback, $container, $inpt, opts)` :

  - `value` : The value of `$inpt` element.
  - `callback(data, error)` :
    - `data` : Data will process to `render` handler.
    - `error` : Error
  - `$container` : JQuery element of the first initialize with `$container.autoComplete(opts)`.
  - `$inpt` : JQuery element of the input element inside `$container`.
  - `opts` : Options

- `render(value, data, $inpt, $menu, opts)` :
  - `data` : Data from `callback(data)` in `source`.
  - `$menu` : JQuery element from container of autocomplete.
