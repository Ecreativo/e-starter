# Project: "E-Starter kit"
### Webpack 3 + Bootstrap 4 beta 2 example
This is the repo to start web projects in ECreativo

Creation date: 24 Nov 2016  
Autor: Camilo Ruiz  
Last Update: 24 Nov 2017

#### Targets
1.	Speed up the process of making websites.
 	* Practise to build websites from scratch.
 	* Be faster by writing more.
2. Have more control and organization with the projects.
3. Build my own development process.
4. Work up tasks in gulp and integrating with webpack.
5. Develop my own starter theme.

#### Secundary Targets
1. Practise git.
2. Practise vin.
3. Retake the programing world.

#### Golden Rules:

- Keep simple, do not use more than you need.

### Try out

###### Setup

Open `tasks/config.js` and change settings if needed.

Clone the repository on your computer and change into the projects folder.
Run:
```powershell
npm install # Install nodejs dependencies
```
**Hint**: If you get errors while installing `gulp-imagemin` it may help to execute this command before running `npm install`:

###### Running Gulp.js & Webpack.js
Commands available:
```powershell
npm run dev
```
- Running `gulp` and  `webpack` in development environment, it will start a server, open the browser and start a `watch` task.

```powershell
npm run build
```
- Running `webpack` build assets ans place in public_html folder.
___

#### To-do's
1. [Specify the Environment](https://webpack.js.org/guides/production/#specify-the-environment)

2. Divide the environment in [Production](https://webpack.js.org/guides/production/#source-mapping) and [Development](https://webpack.js.org/guides/development/)

3. Add inline source maps in production [Source Mapping](https://webpack.js.org/guides/production/#source-mapping) and [Webpack Merge](https://www.npmjs.com/package/webpack-merge)

4. [Optimize css](https://github.com/NMFR/optimize-css-assets-webpack-plugin)

5. look into
	- If it's necessary a complex pipe with gulp [webpack-stream](https://github.com/shama/webpack-stream)
	- [Fixing our local environment with Browsersync](https://gist.github.com/robinrendle/0bb0b9e55fafa1cc0c64ff4b5776df05)
	- [browser-sync-config.js](https://gist.github.com/christopher4lis/3358d92395d686375c50f7ebb218f1dc)
	- [browser-sync-webpack-plugin](https://www.npmjs.com/package/browser-sync-webpack-plugin)
	- [Tree Shaking Webpack](https://webpack.js.org/guides/tree-shaking/)
	- [hot reload to use whit vue.js](https://stackoverflow.com/questions/24581873/what-exactly-is-hot-module-replacement-in-webpack)

6. Implement [stylelint](http://www.creativenightly.com/2016/02/How-to-lint-your-css-with-stylelint) in postcss.

7. Try to use browserSync.stream({match: '**/*.css'}) with webpack.
####  Notes
- Webpack command line [-p flag](https://webpack.js.org/api/cli/#shortcuts) and [-p flag behind the scenes](https://webpack.js.org/guides/production/#cli-alternatives)
- gulfile.js = File were we'll write all the config for run gulp.
- package.json = File were we'll write all our necessary pakages.

#### Done

1. Eslint implemented through webpack.


##### DevDependecies

- Require-dir
	- For more control I will use the package "require-dir", This allows me to split the code for task in diferents folder and have all the config in only one file.
- Gulp
- Browser-sync

##### Tools Used:
- Gulp
- Sass
- Webpack
- Postcss

## Credits
This repo includes some references of differents demos:

- Gulp.js tutorial series by [Stefan Imhoff](https://github.com/kogakure) in [stefanimhoff.de](https://stefanimhoff.de/series/gulp/) here the [Github Repo](https://github.com/kogakure/gulp-tutorial) and [here my fork](https://github.com/Camiloruiiz/gulp-tutorial).
- Gulp 4 with Webpack by [Pascal Klau](http://www.artofmyself.com) in [CSS Tricks article](https://css-tricks.com/combine-webpack-gulp-4) here the [Github Repo](https://github.com/PascalAOMS/gulp4-webpack) and [here my fork](https://github.com/Camiloruiiz/gulp4-webpack).
- Use ES6 in webpack config [stackoverflow](https://stackoverflow.com/questions/31903692/how-can-i-use-es6-in-webpack-config-js).
- Webpack 3 + Bootstrap 4 beta example by [xdvarpunen](https://github.com/xdvarpunen) here the [Github Repo](https://github.com/xdvarpunen/webpackboot) and [here my fork](https://github.com/Camiloruiiz/webpackboot).
- Reload Browser when webpack bundle is complete [BrowserSync/recipes](https://github.com/Browsersync/recipes/tree/master/recipes/webpack.babel)
