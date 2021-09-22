# Web frontend for Exploring Blackfoot language

This site supports exploring the Blackfoot language through telling a story and playing audio clips for Blackfoot translations.

## Technology notes

This is a React-based application. Components are in the `/src` folder.

For styling, we're using [CSS Modules](https://github.com/css-modules/css-modules) which allow you to independently style React components. Each React component also has a corresponding `.module.css` file. For global styling across whole site, see `/public/index.css`.

## How to setup locally

You need to have Node.js installed. This also installs the `npm` package manager. Here are some options:

* [MacOS install](https://nodejs.org/tr/download/package-manager/#macos)
* [Windows Node.js tutorial from Microsoft](https://docs.microsoft.com/en-us/windows/dev-environment/javascript/nodejs-on-windows)
* [Windows install](https://nodejs.org/tr/download/package-manager/#windows)

Once Node.js is installed:

    cd frontend     # go to the frontend folder in this repo
    npm install

For your editor, please install the `Prettier` plugin. You can then run this on a file to keep it nicely indented and formatted.

## How to run it locally

    npm start

which should then pop up a browser window pointing at `http://localhost:8080`

Support for hot reloading has been added as well, which means when you save a change, you'll instantly see it change in the browser without having to refresh!
