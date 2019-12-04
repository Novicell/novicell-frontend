# Organisms
* Either one molecule or a collection of molecules
* It can contain molecules and independant atoms

### Examples
```html
<section class="image-text-section">
    <div class="container">
        <div class="row">
            <div class="col-xs-12 col-sm-6">
                {{ render '@image' image}}
            </div>
            <div class="col-xs-12 col-sm-6">
                {{ render '@text-box' textbox }}
                {{ render '@link-button' button}}
            </div>
        </div>
    </div>
</section>
```

### Generate
1. To allow generating components write: `npm link` in the root dir. (only have to do it once after 'npm install')
2. Run 
```
createComponent -t o -n my-organism
```