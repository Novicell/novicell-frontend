# Molecules
* Combination of both atoms and molecules
* Like atoms they shouldnt have any dependencies
* Combined UI that the user can interact with
* All actions are mutable

### Examples
```html
<div class="form-field {{ class }}">
    {{ render '@label' label }}
    {{#block "content"}}
        {{ render '@input--text' input }}
    {{/block}}
</div>
```

### Generate
1. To allow generating components write: `npm link` in the root dir. (only have to do it once after 'npm install')
2. Run 
```
createComponent -t m -n my-molecule
```