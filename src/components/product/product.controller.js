'use strict',
(function(){
	angular.module('app.products',[])
	.controller('ProductController',productController);

	productController.$inject=['$scope','productDetailsServ'];

	function productController($scope,productDetailsServ){

		$scope.TblSelected='toggleTblChartBtnColor';

		$scope.createOrders=createOrders;
        $scope.refresh=getLatestData;
        $scope.showChart=showChart;
        $scope.showTabular=showTabular;
        $scope.toggleGridChart=true;
		function createOrders(){
			productDetailsServ.addNewOrders($scope.nuOfOrders);
		}

		function getLatestData(){
			$scope.tradedData=productDetailsServ.getProductOrders();
		}

		function showChart(){
			$scope.toggleGridChart=false;
			$scope.TblSelected='';
			$scope.ChartSelected='toggleTblChartBtnColor';
		}

		function showTabular(){
			$scope.toggleGridChart=true;
			$scope.TblSelected='toggleTblChartBtnColor';
			$scope.ChartSelected='';			
		}
	}
})();