# Atoms
* Most simple component you can have
* One tag element
* Should *never* have any dependencies

### Examples
```html
<!-- create blueprint and invoke -->
<input class="input {{ modifier }} {{ class }}" type="{{ type }}" name="{{ name }}" id="{{ id }}" placeholder="{{ placeholder }}" {{required}} />

{{> @input type="text" }}

<!-- create blueprint and invoke -->
<a href="{{ url }}" title="{{ title }}" class="link-button  {{ modifier }} {{ class }}" property="url">{{ text }}</a>

{{> @link-button modifer="button--success" }}
```

### Generate
1. To allow generating components write: `npm link` in the root dir. (only have to do it once after 'npm install')
2. Run 
```
createComponent -t a -n my-atom
```