angular.module('ki', [
	'ui.router',
	'ui.bootstrap',
	'http-auth-interceptor',
	'login',
	'sidebar',
  'map',
	'ki.directives',
	'htmlTemplates',
	'ki.resources',
	'angular-jwt',
	'angular-storage',
  'ngSanitize',
  'openlayers-directive'
])

.run(function(){
	// initialize providers here 
})

.config(function($stateProvider, $urlRouterProvider){
	// $urlRouterProvider.otherwise('/campaign/list');

	// $stateProvider
	// 	.state('dashboard', {
	// 		url: '/home',
	// 		controller: 'CampaignCtrl',
	// 		controllerAs: 'vm',
	// 		templateUrl: 'app/campaign/campaign.tpl.html',
	// 	})

});
