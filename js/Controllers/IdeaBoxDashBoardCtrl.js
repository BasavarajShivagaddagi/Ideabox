//var app = angular.module('myApp');
app.controller('IdeaBoxDAshBoardCtrl',function($scope, IdeaBoxDAshBoardServices){
	$scope.scrollIndexs = [];
	
	IdeaBoxDAshBoardServices.getAllDashBoardIdeas().then(function(response){
		console.log(response.data.data);
		$scope.populateIdeas = response.data.data;
		$scope.scrollIndexs = response.data.data;
	});
	
	IdeaBoxDAshBoardServices.getIncompleteIdeasService().then(function(response){
		console.log('coming',response.data);
		$scope.incompleteIdeas = response.data.data;
	});
	
	IdeaBoxDAshBoardServices.getCompleteIdeasService().then(function(response){
		console.log('coming',response.data);
		$scope.completeIdeas = response.data.data;
	});
	
	$scope.gridDetails = [0,1,2,3,4]; //dummy variable
	
	$scope.dummy = [1,2];
		
	$scope.NoofClicks = Math.floor($scope.scrollIndexs.length / 3);
			
	var innerwidthOfscroll = $(angular.element(document.querySelectorAll('.outer-div'))).innerWidth();
	var innerWidthScr = $(angular.element(document.querySelectorAll('.sliding-container'))).innerWidth() - 15;
	$scope.isEnable = true;
	$scope.isEnableLeft = false;
	
	$scope.scrollingWidth = 0;
	$scope.currentClick = 0;
	$scope.clickRight = function(){
		if($scope.scrollIndexs.length <= 3){ 
			$scope.isEnable = false;
			$scope.isEnableLeft = false;			
		}
		else {
			$scope.scrollingWidth += innerWidthScr;
			$(angular.element(document.querySelectorAll('.outer-div'))).animate({right: $scope.scrollingWidth+'px'});
			$scope.isEnableLeft = true;
			$scope.currentClick += 1;
			if(($scope.currentClick == $scope.NoofClicks) || ($scope.scrollIndexs.length % 3 == 0)){
					$scope.isEnable = false;		
			}			
		}		
	}
	
	$scope.clickPrevious = function(){
		if($scope.scrollIndexs.length <= 3){ 
			$scope.isEnable = false;
			$scope.isEnableLeft = false;			
		}
		else {
			$scope.scrollingWidth -= innerWidthScr;
			$(angular.element(document.querySelectorAll('.outer-div'))).animate({right: $scope.scrollingWidth+'px'});
			$scope.currentClick -= 1;
			$scope.isEnable = true;	
			if($scope.currentClick == 0){
					$scope.isEnableLeft = false; 
			}
		}
		
	}
	
	$scope.showThisList = true;
	
	$scope.changestoList = function(){	
		$scope.showThisList = true;
	}
	
	$scope.changestoGrid = function(){
		$scope.showThisList = false;	
	}
	
	$scope.likeIt = function(likedThis){
		var data1 = likedThis;
		console.log(data1);
		IdeaBoxDAshBoardServices.likeItService(data1).then(function(response){
			console.log(response.data);
			
		});
	}

	$scope.showDetails = function(ideaItem){
		console.log(ideaItem);		
		IdeaBoxDAshBoardServices.getIdeasDetails(ideaItem).then(function(response){
			console.log(response.data.data);
			$scope.showIndividualDetails = response.data.data;
		});	
	}	
	
});

app.factory('IdeaBoxDAshBoardServices', function($http){
	
	var service = {};
	
	var filterdata = {"status":"inprogress"};
	
	service.getAllDashBoardIdeas = function(){
		return $http({
			method : 'GET',
			url : 'http://ec2-34-248-114-187.eu-west-1.compute.amazonaws.com:5000/api/getAllIdeas'
		})
	}
	
	service.likeItService = function(datas){
		var datas1 = {"_id":datas};
		return $http({
			method : 'PUT',
			data : datas1,
			url : 'http://ec2-34-248-114-187.eu-west-1.compute.amazonaws.com:5000/api/likes'
		})
	};

	service.getIncompleteIdeasService = function(){	
		console.log('wqefefw');
		return $http({
			method : 'POST',
			data : filterdata,
			url : 'http://ec2-34-248-114-187.eu-west-1.compute.amazonaws.com:5000/api/filterIdeas'
		})
		
	};
	var filterdatacomplete = {"status":"completed"};
	service.getCompleteIdeasService = function(){	
		console.log('wqefefw');
		return $http({
			method : 'POST',
			data : filterdatacomplete,
			url : 'http://ec2-34-248-114-187.eu-west-1.compute.amazonaws.com:5000/api/filterIdeas'
		})
		
	};
	
	service.getIdeasDetails = function(ideaItem){
		return $http({
			method : 'GET',
			url : 'http://ec2-34-248-114-187.eu-west-1.compute.amazonaws.com:5000/api/getIdea/'+ideaItem
		})
	}
	
	
	return service;
});
app.directive('showMoreDetails', function(){	
	return {
		restrict : 'EA',
		templateUrl : 'partials/IdeaDetail.html',
		controller : 'IdeaBoxDAshBoardCtrl'
	}	
});