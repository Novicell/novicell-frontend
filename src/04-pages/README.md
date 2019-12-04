# Pages
* Collection of organisms
* Complete result of whole hierarchy

### Examples
```html
{{ render '@header' }}
<section>
    {{ render '@pageheader-slider' }}
</section>

{{ render '@icon-boxes' }}

<section>
    <div class="container">
        <div class="row">
            <div class="col-xs-12">
                {{ render '@primary-boxes' }}
            </div>
        </div>
    </div>
</section>

<section>
    <div class="container">
        <div class="row">
            <div class="col-xs-12">
                {{ render '@about-boxes' }}
            </div>
        </div>
    </div>
</section>

{{ render '@footer' }}

{{ render '@cookie-info' }}
```

### Generate
1. To allow generating components write: `npm link` in the root dir. (only have to do it once after 'npm install')
2. Run 
```
createComponent -t p -n my-page
```