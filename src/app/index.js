(function () {
	'use strict';

	angular.module('jackblog', [
			'ngAnimate',
			'ngCookies',
			'ngTouch',
			'ngSanitize',
			'ui.router', 
			'ui.bootstrap',
			'ngLodash',
			'ngProgress',
			'toaster',
			'ngFileUpload',
			'jackblog.resources',
			'jackblog.service',
			'jackblog.filter',
			'jackblog.directives',
			'jackblog.manage',
			'jackblog.article',
			'jackblog.settings'
		])
	.config(function ($logProvider,$stateProvider, $urlRouterProvider, $locationProvider, $httpProvider, IsDebug) {
	  $locationProvider.html5Mode(true);
	  $httpProvider.defaults.timeout = 500000;
	  $httpProvider.defaults.withCredentials = true;
	  $httpProvider.interceptors.push('AuthInterceptor');
	  // Enable log
	  $logProvider.debugEnabled(IsDebug);
	  $urlRouterProvider.otherwise('/blog_list');
	})
	  .run(function ($rootScope, ngProgressFactory, $state, lodash, Auth, Blog, $cookies, CustomModalService, toaster,CookieConfig) {
			//默认头像
			$rootScope.default_avatar = '/assets/images/avatar.png';

			//登录模块.
			$rootScope.opneSnsModal = function () {
				CustomModalService.open('SnsSignInCtrl','app/settings/sns_sign_in.html');
			};
			//加载进度
			$rootScope.progressbar = ngProgressFactory.createInstance();
			//登录之后不可进入页面.
			var routesThatForLogins  = ['/signin','/signup'];
			var routeLogin  = function (route) {
				return lodash.find(routesThatForLogins,
					function (noAuthRoute) {
						return lodash.startsWith(route, noAuthRoute);
					});
			};

	    // 页面权限判断
	    $rootScope.$on('$stateChangeStart', function (event, toState) {
	    	$rootScope.progressbar.setColor('green');
				$rootScope.progressbar.reset(); // Required to handle all edge cases.
				$rootScope.progressbar.start();
				//已登录就需要跳转的页面
				Auth.isLoggedInAsync(function(loggedIn) {
				  if (routeLogin(toState.url) && loggedIn) {
				    event.preventDefault();
				    $state.go('blogList');
				  }
				  if(!routeLogin(toState.url) && !Auth.isAdmin()){
				  	event.preventDefault();
				  	Auth.logout();
				  	$state.go('signin');
				  }
				});

	    });

			// When route successfully changed.
			$rootScope.$on('$stateChangeSuccess', function(ev,toState,toParams,fromState,fromParams) {
				$rootScope.progressbar.complete();
				$rootScope.previousState = fromState;
				$rootScope.previousParams = fromParams;
			});
			//sns signin 拦截
			$rootScope.$on('$locationChangeSuccess', function(ev, url, oldUrl){
				$rootScope.currentUrl = url;
			  $rootScope.previousUrl = oldUrl;
			  var snsmsg = $cookies.get('snsmsg');
			  if(snsmsg){
			  	snsmsg = JSON.parse(snsmsg);
			  	toaster.pop(snsmsg.msgtype,'',snsmsg.msg);
			  	$cookies.remove('snsmsg',CookieConfig);
			  }

			});
			// When some error occured.
			$rootScope.$on('$stateChangeError', function() {
				$rootScope.progressbar.reset();
			});

	  });
})();
