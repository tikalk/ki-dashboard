var tcProps = {};
var optionalPlugins = [];
var optionalReporters = [];
// var browsers = ['Chrome'];
var browsers = ['PhantomJS'];
try {
  tcProps = require('teamcity-properties');
} catch (err) {
  tcProps = false;
}
if (tcProps) {
	optionalPlugins.push('karma-teamcity-reporter');
	optionalReporters.push('teamcity');
	browsers = ['PhantomJS'];
}
module.exports = function(config) {
	config.set({
		basePath: './src/client',
		browsers: browsers,
		frameworks: ['jasmine'],
		files: [
			//3rd party
			'vendors.js',
			'templates.mdl.js',
			
			'bower_components/angular-mocks/angular-mocks.js',
			//app-specific
			'app/**/*.html',
			'common/**/*.html',
			'bundle**.js',
			'app/**/*spec.js',
			'common/**/*spec.js',
			'../server/**/*mock.json'
	    ],
	    autoWatch: true,
        preprocessors: {
	        'app/**/*.html': ['ng-html2js'],
	        'common/**/*.html': ['ng-html2js'],
	        '../server/**/*mock.json': ['json_fixtures']
	    },
	    ngHtml2JsPreprocessor: {
	        moduleName: 'templates'
	    },
	    jsonFixturesPreprocessor: {
	      // strip this from the file path \ fixture name
	      stripPrefix: '.+mocks/',
	      // strip this to the file path \ fixture name
	      // prependPrefix: 'mock/',
	      // change the global fixtures variable name
	      variableName: 'mocks'
	    },
	    plugins : [
	        'karma-phantomjs-launcher',
	        'karma-chrome-launcher',
	        'karma-jasmine',
	        'karma-ng-html2js-preprocessor',
	        'karma-html2js-preprocessor',
	        'karma-mocha-reporter',
	        'karma-json-fixtures-preprocessor'
	    ].concat(optionalPlugins),
	    reporters: ['mocha'].concat(optionalReporters)
  });
};
