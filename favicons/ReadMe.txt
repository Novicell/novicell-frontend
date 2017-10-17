How to generate favions:

GULP: 

Generate:
1. Edit the gulp/tasks/favicons.js file change "backgroundColor" and "appName"
2. Run the "favicons" task
3. Favicons are placed in dist/favicons
4. Update manifest

Inject:
1. Run the "favicons-inject" task
2. Markup will be injected in index.html at root
--------------

NPM: 

Generate:
1. RUN: "npm install -g cli-real-favicon"
2. edit: favicons/faviconDescription.json change backgroundColor, themeColor and name
3. RUN: "real-favicon generate favicons/faviconDescription.json favicons/faviconData.json dist/favicons"
4. Favicons are placed in dist/favicons
5. Update manifest