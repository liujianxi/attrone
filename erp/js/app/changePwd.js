var app = angular.module('changePwdModule', []);
app.controller('changePwdCtrl', ['$scope', '$http', function($scope, $http) {
	$scope.title = '修改密码';
	//修改密码
	$scope.changePwd = function() {
		//		        	console.info('old:' + $scope.orginPwd + ',newPwd:' + $scope.newPwd);
		var oldPwd = $scope.orginPwd;
		var newPwd = $scope.newPwd;
		var changePwdConfig = {
			method: 'POST',
			url: '/adminjson/SAASChangePwd',
			data: {
				"oldPwd": md5(oldPwd),
				"newPwd": md5(newPwd)
			}
		};
		$http(changePwdConfig).then(function(response) {
			if(response.data.errorCode == 0) {
				alert('密码修改成功!请使用新密码重新登录');
				window.location.href = "/erp/login.html";
			} else {
				alert('密码修改失败!' + response.data.msg);
			}
		});
	}
}]);