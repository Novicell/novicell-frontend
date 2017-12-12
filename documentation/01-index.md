---
title: Novicell Pattern Library
---

# Novicell Pattern Library
You can edit this file at `documentation/01-index.hbs`

## Project: [Project Name]
### Authors:
- Author Name 1
- Author Name 2

## CSS
We use [postCss](http://postcss.org/) and [CSSNext](http://cssnext.io/features/). For a complete feature list, please refer to their documentation.


### Variables
Variables are native [CSS custom properties](http://cssnext.io/features/#custom-properties-var). All variable names should be in `camelCase`, just like in Javascript.

You can use it like this:

**Setting**
```css
:root {
    --myFirstVar: bold;
}
```
**Getting**
```css
.some-class {
    font-weight: var(--myFirstVar);
}
```

### Colors
See the complete list of [color manipulation features here](http://cssnext.io/features/#color-function).

**RGBA**
```css
.some-class {
    color: color( var(--color-primary) alpha(90%));
}
```

### Media queries
It is not possible to use a CSS custom property (variable) in media queries. Media queries are declared in the `variables/settings`-file. This is how you use it:

**Setting**
```css
@custom-media --viewport-sm-min (min-width: 768px);
```
**Getting**
```css
.some-class {
    color: blue;
    
    @media(--viewport-sm-min){
        & {
            color:red;
        }
    }
}
```
