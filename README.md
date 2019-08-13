# spectre-auto-complete
Autocomplete library for spectre css framework https://picturepan2.github.io/spectre/

### Instalation:

#### Requirement:

- JQuery 3.x
- Spectre 0.5.x

#### CDN:

```
https://cdn.jsdelivr.net/npm/spectre-auto-complete@1.0.1/spectre-auto-complete.min.css
https://cdn.jsdelivr.net/npm/spectre-auto-complete@1.0.1/spectre-auto-complete.min.js
```

#### Example:

```html
<html>
    <header>
        <!-- spectre -->
        <link rel="stylesheet" href="spectre.min.css">
        <link rel="stylesheet" href="spectre-exp.min.css">
        <link rel="stylesheet" href="spectre-icons.min.css">

        <!-- spectre-auto-complete CSS -->
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/spectre-auto-complete@1.0.1/spectre-auto-complete.min.css">
    </header>
    <body>
        <!-- JQuery -->
        <script src="jquery-3.x.min.js"></script>
        
        <!-- spectre-auto-complete JS -->
        <script src="https://cdn.jsdelivr.net/npm/spectre-auto-complete@1.0.1/spectre-auto-complete.min.js"></script>
    </body>
</html>
```

### Usage:

**HTML**

```html
<div class="form-group">
  <div class="form-autocomplete">
    <input class="form-input form-autocomplete-input"/>
  </div>
</div>
```

**Javascript**
```javascript
$(".form-autocomplete").autoComplete({
  source: function(inputValue, callback){
    // Do something like fetch data with xhr
    var data= ["apple", "banana", "guava"];
    
    callback(data, null) // If error, you can use callback(null, error); . Error will passed as argument to error handler
  }
});
```
### Options arguments:

- `source`:
  - `Function`:
    - `value`: Value of input.
    - `callback`: `Function`, Ex: `callback(data, error)`
  - `Array`: Ex: `["banana", "guava", "mango", "orange"]`
  - Default: `[]`
  
- `render`:
  - `Function`:
    - `value`
    - `source`: Return from `source` option.
    - `$input`: JQuery element of input.
    - `$menu`: JQuery element of container for auto-complete, see: [Autocomplete](https://picturepan2.github.io/spectre/experimentals/autocomplete.html#autocomplete).
    - `options`: Instance of `options`.
    - Default: `defaultRender` from lib.
