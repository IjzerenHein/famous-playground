#famous-playground

General purpose playground repo for famo.us.


# Index
- [Installation](#installation)
- [Building & running](#building--running)
- [Resources](#resources)


# Installation

First make sure you have node.js installed... without that nothing works!
You can either install it with your favorite package manager or with [the installer](http://nodejs.org/download) found on [nodejs.org](http://nodejs.org).

Install grunt & webpack globally *(if not installed already):*

```
npm install -g grunt-cli webpack webpack-dev-server
```

Install the local npm packages *(from the project root folder):*

```
npm install
```

That's it! You should now be able to build & run the project.


# Building & running

To build the project, use:

```
grunt
```

This runs linters & code-style checkers, and builds the webpack output in: `/www`.
You can open the output `www/index.html` file using `grunt open`.

To start a live reload server, use:

```
grunt serve
```

This starts the webpack-dev-server at `http://localhost:8080` and opens the URL in the browser.

To build for production and minify and mangle the output, use:

```
grunt prod
```


# Resources

- [Webpack How-to](https://github.com/petehunt/webpack-howto)



## Contribute

If you like this project and want to support it, show some love
and give it a star.


## Contact
- 	@IjzerenHein
- 	http://www.gloey.nl
- 	hrutjes@gmail.com (for hire)

© 2015 - Hein Rutjes
