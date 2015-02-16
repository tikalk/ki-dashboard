# Gandalf

## Code Styleguides

### AngularJs Code Styleguides
1. Following the angularjs [blog post](http://blog.angularjs.org/2014/02/an-angularjs-style-guide-and-best.html), follow these [Best Practices Recommendations by the angular team](https://docs.google.com/document/d/1XXMvReO8-Awi1EZXAXS4PzDzdNvV6pGcuaF4Q9821Es/pub)
2. [angularjs development style guide](https://github.com/johnpapa/angularjs-styleguide)
3. [angularjs style guide for teams](https://github.com/toddmotto/angularjs-styleguide) (with a slight diverses in app structure)

### Javascript Code Styleguide
1. js code styleguide should follow [google's js code styleguide](http://google-styleguide.googlecode.com/svn/trunk/javascriptguide.xml)
2. nodejs code stytelguide should follow the [common best practices of nodejs styleguide](http://stackoverflow.com/a/5497467)

### Javascript Linter
1. using jshint as global nodejs service: ```npm install -g jshint```
2. The project follows '.jshintrc' as the best practices [of node.js styleguide](https://github.com/felixge/node-style-guide)
3. [Instructions for setting jshint with sublime linter plugin for sublimetext](https://github.com/SublimeLinter/SublimeLinter-jshint)

## Prerequisites
1. Install NodeJS - http://nodejs.org/ or via [command line](https://github.com/joyent/node/wiki/installing-node.js-via-package-manager)
2. Gupljs: ```npm install -g gulp```
3. Bower: ```npm install -g bower```
4. Phantomjs (client testing): ```npm install phantomjs```
5. Karma (client test runner): ```npm install -g karma```
6. for Node Debugging using [node inspector](https://github.com/node-inspector/node-inspector): ```npm install -g node-inspector```
(? install less ```npm install -g less```)

## Steps to run the app
* Run npm to install dependencies
```npm install```
* Build project (will run bower install, compile less and concat js)
``` gulp build ```
* **Run** the app
``` gulp ```

Open <http://localhost:8080>

### Other available operations
* Test project
 ``` gulp test ```
* Create distribution zip
 ``` gulp dist ```

This command create "distribution zip" file in the "dist" folder.

## Development environment
### Automation
#### dev-mode
Process code, raising the server and then activating the project watcher (client side)  
``` gulp ```  
The project is available at <http://localhost:8080>.

#### Debug Node.js
you should run this after running dev-mode:  
```node-inspector --web-port=8081```  
open in chrome <http://127.0.0.1:8081/debug?port=5858>
Please note that you must invoke the build command before invoking dev-mode (one time only).
``` gulp build ```

## Teamcity Integration

## Issues Tracking


## Git & Github Guidelines
The guideline is to work in a feature branch flow as described well in [Github's Scott's blog post](http://scottchacon.com/2011/08/31/github-flow.html)

### Naming Convention for Feature Branch
Each feature branch should be named with a prefix of "**feature-**", so that the automation won't run any tests, build etc.. on these branches.

i.e., a branch for feature of date picker should be named:
**feature-date-picker**

### Merge Process for Feature Branch
A Feature branch should be merged to dev, master or other desired branch by using github's Pull Request Feature. 
Pull Request should promote code review before the merge is done.

This should allow safe merge process and prevent merge with conflicts.

### Steps after Merge
After a branch has been merged to dev or master AND it's purpose is done, it should be deleted. 
In github, a **"Delete Branch"** button is available right after the merge process is done.

If the merge is a midway integration merge, then you can still work on your branch and open another pull request.
