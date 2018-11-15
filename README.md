# Project: "E-Starter kit"
### Webpack 4 + Bootstrap 4 example

Creation date: 24 Nov 2016  
Autor: Camilo Ruiz  
Last Update: 9 NOV 2018

#### Targets
1. Speed up the process of making websites.
 	* Get practise building websites from scratch.
 	* Be faster writing code.
2. Have control and organization with the projects.
3. Build a development process.
4. Work up tasks in gulp and integrating with webpack.
5. Develop a starter theme.

#### Secundary Targets
1. Practise git.
2. Practise vin.

#### Golden Rules:

- The [KISS](https://en.wikipedia.org/wiki/KISS_principle) principle(Keep It Simple Stupid)
- [DRY](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself)

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
- Running `webpack` build assets and place in public_html folder.
___

#### To-do's
1. Things to add:
	- [hot reload to use whit vue.js](https://stackoverflow.com/questions/24581873/what-exactly-is-hot-module-replacement-in-webpack)
		- [webpack-starter-kit](https://github.com/ADCI/webpack-starter-kit)
		- [webpack-for-testing-web](https://manavsehgal.com/browsersync-and-webpack-for-testing-web-apps-across-multiple-devices-64e7f7fa62f2)
		- [Making React, Webpack, BrowserSync & Gulp play nice and hot reload](https://words.mxbry.com/making-react-webpack-browsersync-gulp-play-nice-and-hot-reload-b2c1e01522e3)
		- [webpack-css](https://github.com/MattHsiung/webpack-css)
		- https://gist.github.com/martinherweg/64ac8f3123044cb2777d6a9fcd9f6fdf
		- Implement HMR [https://github.com/PascalAOMS/gulp4-webpack/tree/hmr](https://github.com/PascalAOMS/gulp4-webpack/tree/hmr)
	- Webpack Manifest
		- [webpack-manifest-plugin](https://www.npmjs.com/package/webpack-manifest-plugin)
		- https://developers.google.com/web/fundamentals/performance/webpack/use-long-term-caching
	- Optimize images in webpack
		- [https://survivejs.com](https://survivejs.com/webpack/loading/images/)
		- srcset [resize-image-loader](https://www.npmjs.com/package/resize-image-loader)
	- Cache Busting
		- [PHP backend code](https://www.alainschlesser.com/bust-cache-content-hash/)
		- [Make use of long-term caching](https://developers.google.com/web/fundamentals/performance/webpack/use-long-term-caching)
		- [Caching best practices & max-age gotchas](https://jakearchibald.com/2016/caching-best-practices/)
		- [gomakethings.com](https://gomakethings.com/automating-css-and-js-cache-busting-with-gulp-and-wordpress/)
	- [Resource Hints](https://www.w3.org/TR/resource-hints/)
		- https://github.com/jantimon/resource-hints-webpack-plugin
	- 'async', 'preload', 'prefetch', 'defer', 'module'
		- [script-ext-html-webpack-plugin](https://github.com/numical/script-ext-html-webpack-plugin)
		- [https://github.com/numical/style-ext-html-webpack-plugin](https://github.com/numical/style-ext-html-webpack-plugin)
		- [Async CSS ans JS with pug.](https://extri.co/2017/05/23/using-htmlwebpackplugin-and-pug/)
		- [preload-webpack-plugin](https://github.com/GoogleChromeLabs/preload-webpack-plugin)

2. look into
	- [Important](https://survivejs.com/webpack/foreword/)
	- [Put Your Webpack Bundle On A Diet](https://www.contentful.com/blog/2017/10/10/put-your-webpack-on-a-diet-part-1/)
	- If it's necessary a complex pipe with gulp [webpack-stream](https://github.com/shama/webpack-stream)
	- [Tree Shaking Webpack](https://webpack.js.org/guides/tree-shaking/)
	- Framework using bootsteap 4 and Wordpress [Understrap](https://github.com/understrap/understrap)
	

3. Implement [stylelint](http://www.creativenightly.com/2016/02/How-to-lint-your-css-with-stylelint) in postcss.

4. Try to use browserSync.stream({match: '**/*.css'}) with webpack.

5. Phpserver need, a reload feature.

6. Implement vendor chunk. [developers.google](https://developers.google.com/web/fundamentals/performance/webpack/use-long-term-caching#dependencies)

7. Implement webfotn from svg files [https://github.com/jeerbl/webfonts-loader](https://github.com/jeerbl/webfonts-loader)

8. Implement sprites [https://www.npmjs.com/package/webpack-spritesmith](https://www.npmjs.com/package/webpack-spritesmith)


####  Notes
- Webpack command line [-p flag](https://webpack.js.org/api/cli/#shortcuts) and [-p flag behind the scenes](https://webpack.js.org/guides/production/#cli-alternatives)
- gulfile.js = File were we'll write all the config for run gulp.
- package.json = File were we'll write all our necessary pakages.

#### Done

1. Eslint implemented through webpack.
2. Environment divided in [Production](https://webpack.js.org/guides/production/#source-mapping) and [Development](https://webpack.js.org/guides/development/)
3. Add inline source maps in production [Source Mapping](https://webpack.js.org/guides/production/#source-mapping) and [Webpack Merge](https://www.npmjs.com/package/webpack-merge)
4. [Specify the Environment](https://webpack.js.org/guides/production/#specify-the-environment)

##### Tools Used:
- Gulp
- Webpack
- Browser-sync
- Pug
- Sass
- Postcss

## Credits
This repo includes some references of differents demos:

- Gulp.js tutorial series by [Stefan Imhoff](https://github.com/kogakure) in [stefanimhoff.de](https://stefanimhoff.de/series/gulp/) here the [Github Repo](https://github.com/kogakure/gulp-tutorial) and [here my fork](https://github.com/Camiloruiiz/gulp-tutorial).
- Gulp 4 with Webpack by [Pascal Klau](http://www.artofmyself.com) in [CSS Tricks article](https://css-tricks.com/combine-webpack-gulp-4) here the [Github Repo](https://github.com/PascalAOMS/gulp4-webpack).
- Use ES6 in webpack config [stackoverflow](https://stackoverflow.com/questions/31903692/how-can-i-use-es6-in-webpack-config-js).
- Webpack 3 + Bootstrap 4 beta example by [xdvarpunen](https://github.com/xdvarpunen) here the [Github Repo](https://github.com/xdvarpunen/webpackboot).
- Reload Browser when webpack bundle is complete [BrowserSync/recipes](https://github.com/Browsersync/recipes/tree/master/recipes/webpack.babel)
