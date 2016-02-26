(function () {
	'use strict';

	angular.module('jackblog.resources')
		.factory('User', function($resource,ServerUrl){
			var userResource = $resource(ServerUrl + '/users/:id/:controller', {
					id: '@_id'
				},
				{
					getUserList:{
						method:'GET',
						params:{
							id:'getUserList'
						}
					},
					addUser:{
						method:'POST',
						params:{
							id:'addUser'
						}
					},
					updateUser:{
						method:'PUT',
						params:{
							controller:'updateUser'
						}
					},
					//前台数据
					getCaptcha:{
						method: 'GET',
						params: {
						  id:'getCaptcha'
						}
					},
					get: {
						method: 'GET',
						params: {
							id:'me'
						}
					},
					mdUser:{
						method:'PUT',
						params:{
							id:'mdUser'
						}
					},
					getUserProvider:{
						method:'GET',
						params:{
							id:'getUserProvider'
						}
					},
					snsLogins:{
						method:'GET',
						params:{
							id:'snsLogins'
						}
					}
				});

			return {
				getUserList:function (data,callback) {
				  var cb = callback || angular.noop;
				  return userResource.getUserList(function(result) {
				    return cb(result);
				  }, function(err) {
				    return cb(err);
				  }).$promise;
				},
				addUser:function (data,callback) {
				  var cb = callback || angular.noop;
				  return userResource.addUser(data,function(result) {
				    return cb(result);
				  }, function(err) {
				    return cb(err);
				  }).$promise;
				},
				deleteUser:function(data,callback){
				  var cb = callback || angular.noop;
				  return userResource.remove(data,function(result) {
				    return cb(result);
				  }, function(err) {
				    return cb(err);
				  }).$promise;
				},
				updateUser:function (id,data,callback) {
				  var cb = callback || angular.noop;
				  return userResource.updateUser({id:id},data,function(result) {
				    return cb(result);
				  }, function(err) {
				    return cb(err);
				  }).$promise;
				},
				get:userResource.get,
			  getCaptcha: function(callback){
			    var cb = callback || angular.noop;
			    return userResource.getCaptcha(function(result) {
			      return cb(result);
			    }, function(err) {
			      return cb(err);
			    }).$promise;
			  },
			  mdUser:function (data,callback) {
			    var cb = callback || angular.noop;
			    return userResource.mdUser(data,function(result) {
			      return cb(result);
			    }, function(err) {
			      return cb(err);
			    }).$promise;
			  },
			  getUserProvider:function (callback) {
			    var cb = callback || angular.noop;
			    return userResource.getUserProvider(function(result) {
			      return cb(result);
			    }, function(err) {
			      return cb(err);
			    }).$promise;
			  },
			  getLogins:function (callback) {
			    var cb = callback || angular.noop;
			    return userResource.snsLogins(function(result) {
			      return cb(result);
			    }, function(err) {
			      return cb(err);
			    }).$promise;
			  }
			};
		});
})();
