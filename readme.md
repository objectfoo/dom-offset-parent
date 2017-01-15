# dom offset parent

Explore how to calculate target offset to fix react-joyride.

```sh
# Build lib
$ npm run build
```

```sh
# Run test in browser
$ npm test
```

```sh
# To develop
# run the server
$ npm test
# in another terminal run dev task to recompile
$ npm run dev
```

```json
"scripts": {
	"build": "browserify src/domOffsetParent.js -o lib/domOffsetParent.js",
	"test": "cd test && live-server --wait=3000",
	"pretest": "npm run build && npm run build:test && npm run copy:domOffsetParent",
	"build:test": "browserify ./test/tests/index.js -o test/test.bundle.js",
	"copy:domOffsetParent": "copy ./lib/domOffsetParent.js ./test/",
	"dev": "nodemon --exec 'npm run pretest'"
},
```

## the issue

react-joyride calculates tip position relative to body

```
body < offset parent
+------------------------+
| <Joyride />            |
|                        |
|                        |
|                        |
| tip pos:absolute       |
| +--------------+       |
| |target        |       |
| +--------------+       |
+------------------------+
```

We need to calculate tip position based on an offset parent common to both joyride and our target.

```
body
+-------------------------+
|  #wm997 < offset parent |
| +-------------------+   |
| | <Joyride />       |   |
| |                   |   |
| | tip pos: absolute |   |
| | +--------------+  |   |
| | |target        |  |   |
| | +--------------+  |   |
| +-------------------+   |
+-------------------------+
```

## future stuff

It should be able to handle scrollable divs between the tip and the common offset parent.
