---
title: Fractal guidelines
---

## Pattern structure
Foreach pattern we need to declare three files.
* yxz.config.json
* yxz.css
* yxz.hbs

### yxz.config.json
The config file is where we declare information and content about the pattern. 

We __don't__ use the config for creating modifiers. If a modifier is needed a new variant handlebars file should always be created. This way we can keep track of modifiers both by looking in fractal but also in our file tree.

```javascript
{
    "title": "Button",
    "status": "prototype",
    "context": {
        "text": "Button"
    },
    "variants": [
        {
            "name": "ghost",
            "context": {
                "text": "Ghost Button"
            }
        },
        {
            "name": "large",
            "context": {
                "text": "Large Button"
            }
        },
        {
            "name": "link",
            "context": {
                "text": "Link Button",
                "linkUrl":"http://www.novicell.dk",
                "linkTitle":"Novicell"
            }
        }
    ]
}
```

### yxz.css
It contains pattern specific styling. Any variabels should be declared in here we a pattern prefix like `--button-`
```css
:root {
    --button-color-primary: var(--color-primary, red);
    --button-color-text: var(--color-white, yellow);
    --button-base-font-family: var(--base-font-family, blue);
}


/* Default button*/
.button {
    cursor: pointer;
    background-image: none; /* Reset unusual Firefox-on-Android default style; see https://github.com/necolas/normalize.css/issues/214*/
    background-color: var(--button-color-primary);
    position: relative;
    font-weight: 600;
    font-family: var(--button-base-font-family);
    font-size: 14px;
    color: var(--button-color-text);
    border: 1px solid transparent;
    text-decoration: none;
    border-radius: 4px;
    height: 40px;
    line-height: 40px;
    padding: 0 20px;
    display: inline-block;
    white-space: nowrap;
    text-align: center;


    /* Ghost button*/
    &--ghost {
        color: var(--button-color-primary);
        border: solid 1px var(--button-color-primary);
        background-color: transparent;

        &:hover,
        &:focus {
            color: var(--button-color-text);
            background-color: var(--button-color-primary);
        }
    }

    &--large {
        height: 50px;
        padding: 0 40px;
        font-size: 24px;
    }
}
```

### yxz.hbs
The handlebars file is where the templating is happening. You can print out content directly from the context, or you can pass the a property from your context into a pattern

```html
<article class="box-image">
	<div class="box-image__inner" style="background-image: url(\{{ boxImage.url }});">
		<div class="box-image__content">
            \{{ render '@heading--column' header }}
			<p>\{{ boxImage.content }}</p>
		</div>
	</div>
</article>
```


## Folder structure
* _base
* _partials
* 01-atoms
* 02-molecules
* 03-organisms
* 04-pages
* helpers

### _base
Here all the global style should be places. E.g base and variables. _dont place component styling in here_

### _partials
In this folder is the file _preview.hbs, this is the equivalent of a master file.

### 01-atoms
Atoms are the most basic form of a pattern. E.g a Title. Each atom can have multiple variants, that modifies the layout.

__The context inside .config.json should contain fallback/default values.__

### 02-molecules
Molecules can be a combination of multiple atoms or other molecules. E.g Box. It should only contain styling about the molecule, not about the atoms. If a special atom styling is needed a new pattern should be created (or a variant of an existing one).

__The context inside .config.json should component specific values, so the molecules can be rendered without any specific context.__

### 03-organisms
Organisms can be a combination of multiple atoms or molecules. Organisms are used to declare specific layouts. Styling of orgasnisms should rarely be used.

__The context inside .config.json should layout specific values. It could be be a specific list of links due to the layout__

### 04-pages
Page can be a combination of multiple atoms, molecules and organisms. Pages doesnt not contain styling. Only use this to layout pages, not style them.

__The context inside .config.json should not contain any values. Try to keep the context inside the orgasnisms.__

### helpers
(Do not confuse this with handlebars helpers: http://handlebarsjs.com/#helpers)

The helper folder contains stuff that is not really a block (BEM), but is a helper for creating the layout. Stuff you need to reuse, but the content can't come from a property in json - like grids and main.

**Example: grid container**

The handlebars file could look like this:

```html
<div class="grid-container">
    {{#block "grid-container-content"}}
    {{/block}}
</div>
```

The #block means "content goes here"

When you want to use the grid-container helper, use it like this:

```html
<div class="hero">
    {{#embed "@grid-container"}}
        {{#content "grid-container-content"}}
            content goes here...
        {{/content}}
    {{/embed}}
</div>
```

The #embed means you want to use the grid-container helper and the #content means that stuff inside is the content that is going to be rendered inside the #block in the first example

## Render functions

### `\{{> @pattern-name }}`
This renders the pattern
NOTE: If the context of the current pattern match the context of the rendered pattern. The rendered pattern will inherit.

### `\{{> @pattern-name property=property }}`
This renders the pattern and overrides a specific property a specific property:
NOTE: If the context of the current pattern match the context of the rendered pattern. The rendered pattern will inherit.

```html
<!-- The pattern -->
<p class="paragraph \{{ modifier }} \{{ class }}">\{{ text }}</p>

<!-- Override of the pattern -->
\{{> @paragraph modifier = "paragraph--hero" }}

<!-- Output -->
<p class="paragraph paragraph--hero} \{{ class }}">\{{ text }}</p>
```

### `\{{ render '@pattern-name' }}`
This renders the pattern with the inherit context

### `\{{ render '@pattern-name' property }}`
This renders the pattern with a context specified in the current pattern.

### `\{{ #embed @pattern-name }}`
This embeds a pattern. By using the \#block functionality you have the possibility to override default-content. Eg. 
```html
<!-- The pattern -->
<div class="grid-column">
    \{{#block "grid-column-content"}}
    \{{/block}}
</div>

<!-- Embed of the pattern -->
\{{#embed '@grid-column'}}
    \{{#content 'grid-column-content'}}
        Test
    \{{/content}}
\{{/embed}}

<!-- Output -->
<div class="grid-column">
    Test
</div>
```

### `\{{ #extend @pattern-name }}`
You can use this if you want to create a variant of a more complex pattern. Lets say the grid. 

```html
<!-- The pattern -->
<div class="grid-container \{{ containerClass }}">
    \{{#block "grid-container-content"}}
    \{{/block}}
</div>

<!-- Extend of the pattern -->
\{{#extend "@grid-container" containerClass="grid-container--site-width"}}
	\{{#content "grid-container-content"}}
		\{{#block "content"}}
		\{{/block}}
	\{{/content}}
\{{/extend}}

```