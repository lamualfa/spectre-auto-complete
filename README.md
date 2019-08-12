# spectre-auto-complete
Autocomplete library for spectre css framework https://picturepan2.github.io/spectre/

### Example Usage:

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
