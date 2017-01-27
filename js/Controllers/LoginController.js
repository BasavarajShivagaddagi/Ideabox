var app = angular.module('myApp');

app.controller('loginCtrl', ['$scope', '$http', '$location', function($scope, $http, $location){
	$scope.login_details ={};
	$scope.login_details.username = "";
	$scope.login_details.emailAddress = "";
	$scope.login_details.password = "";
	
	
	
	
	$scope.login = function(){
		
		
		
		var formdata = {
			"username":$scope.login_details.username,
			"password":$scope.login_details.password
			
			};
		
		
		
		console.log(formdata);	
		
		
		$http({							
				method : "POST",
				 url : 'http://ec2-34-248-114-187.eu-west-1.compute.amazonaws.com:5000/api/signin',
				data : formdata,	
				dataType: "json",
				headers : {'Content-Type': 'application/json'}	
			})
			.success(function(data){
			console.log("SUCCESS");	
				// LoaderService.hide();
					
				 $location.path('partials/introduction.html');
			$('body').css('overflow', 'auto');
	document.getElementById('loginId').style.display = "none";
				$scope.login_details.username = "";
	$scope.login_details.emailAddress = "";
	$scope.login_details.password = "";
			alert("Logged in Successfully...");
				
			
			})
			.error(function(error){
			console.log("ERROR!!!");	
			$scope.login_details.username = "";
	$scope.login_details.emailAddress = "";
	$scope.login_details.password = "";
				alert("Login failed...")
			});		 
		
	};
	
	
		
	}]);

