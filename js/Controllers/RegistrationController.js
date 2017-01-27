var app = angular.module('myApp');

app.controller('signupCtrl', ['$scope', '$http', 'signUpService', function($scope, $http, signUpService){
	$scope.details ={};
	$scope.details.username = "";
	$scope.details.emailAddress = "";
	$scope.details.organization = "";
	$scope.details.location = "";
	$scope.details.password = "";
	$scope.details.otp = "";
	
	$scope.submitSignUP = function(){
		
	
		
		var datas = {
			"username":$scope.details.username,
			"password":$scope.details.password,
			"email":$scope.details.emailAddress,
			"location":$scope.details.location,
			"organization":$scope.details.organization
			};
		
		
		
		console.log(datas);	
		signUpService.singupServiceFunction(datas).success(function(response){
			console.log(response);
			alert("Wait until OTP will come to your registered emailId...")
			
		}).error(function(data) {
		
			alert("SignUp Failed...")
			
                });

		
	}
	
	$scope.otpConfirmation = function(){
		
		
		
		var formdata = {
			"username":$scope.details.username,
			"otp":$scope.details.otp
			
			};
		
		
		
		console.log(formdata);	
		signUpService.otpConfirmationServiceFunction(formdata).then(function(response){
			console.log(response);
			$('body').css('overflow', 'auto');
	        document.getElementById('abc').style.display = "none";
				$scope.details.username = "";
	$scope.details.emailAddress = "";
	$scope.details.organization = "";
	$scope.details.location = "";
	$scope.details.password = "";
	$scope.details.otp = "";
			
			alert("Registered Successfully")
			
		
			
		})

		
	};
	
	
	
	
	
	
		
	}]).factory('signUpService',function($http){
	var service = {};	
	
	service.singupServiceFunction = function(datas){
		return $http({
			method : 'POST',
			data : datas,
			url : 'http://ec2-34-248-114-187.eu-west-1.compute.amazonaws.com:5000/api/signup',
			headers : {'Content-Type': 'application/json; charset=utf-8'}
		})
	};
	
	service.otpConfirmationServiceFunction= function(formdata){
		return $http({
			method : 'POST',
			data:formdata,
			url : 'http://ec2-34-248-114-187.eu-west-1.compute.amazonaws.com:5000/api/userConfirmation',
			headers : {'Content-Type': 'application/json; charset=utf-8'}
		})
	};
	
	
	
	
	return service;
	
}); 
	
