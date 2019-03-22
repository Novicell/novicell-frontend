# Box Image Duotone

### How it works

The image has a SVG filter applied via CSS. The filter specifies that the image should first be converted to grayscale, and afterwards the grayscale's colors are replaced (using the feComponentTransfer) with the colors specified in the config file.

### Calculating the colors

In order to have the light and dark colors specified in the config, we have to convert the colors from HEX to RGB, and afterwards convert the RGB values to a decimal value between 0 and 1. In the Fractal setup, this is done with JS, however this would be done serverside, so the values are ready when the HTML is loaded.

### Support

SVG filter are not supported in IE11, but since we are using the CSS filter property, the image will just be displayed without any of the filters on older browsers.
