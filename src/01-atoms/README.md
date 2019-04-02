# Atoms (Presentational/Dumb)
* Most simple component you can have
* One tag element
* Should *never* have any dependencies

### examples
```html
<!-- blueprint input filed -->
<input class="input {{ modifier }} {{ class }}" type="{{ type }}" name="{{ name }}" id="{{ id }}" placeholder="{{ placeholder }}" {{required}} />
<!-- text input -->
{{> @input type="text" }}

<!-- blueprint link button -->
<a href="{{ url }}" title="{{ title }}" class="link-button  {{ modifier }} {{ class }}" property="url">{{ text }}</a>
<!-- success button -->
{{> @link-button modifer="button--success" }}
```

### generate
1. To allow generating components write: `npm link` in the root dir. (only have to do it once after 'npm install')
2. Run 
```
createComponent -t a -n myAtom
```