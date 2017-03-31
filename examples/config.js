/*
*   EXAMPLES FOR CONFIG
*
*   Author: Danni Larsen - DLA
*
*/

// Icon bundle with multiple colors
// eg. flags icons
// add this to your bundles:
{
    name: "colored-icons",
    keepColors: true,
    icons: [ projectPath + "icons/colored icons/*.svg" ]
}

// Multiple style themes
// see examples/less/themes/theme.blue.less for less theme example
// add this to your bundles:
styles: [
    projectPath + "less/master.less",
    projectPath + "less/themes/theme.blue.less"
]