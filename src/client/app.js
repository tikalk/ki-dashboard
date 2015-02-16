angular.module('ki', [
	'ui.router',
	'ui.bootstrap',
	'http-auth-interceptor',
	'login',
	'sidebar',
	'ki.directives',
	'htmlTemplates',
	'ki.resources',
	'angular-jwt',
	'angular-storage'
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
