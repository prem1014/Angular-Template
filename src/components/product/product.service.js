'use strict';
(function () {
    angular.module('app.products')
    .factory('productDetailsServ', productDetailsServ);

    productDetailsServ.$inject = ['$http'];

    function productDetailsServ($http) {
        var service = {};
        var orderMade=[];
        var instruments=[];
        //send new orders to server
        service.addNewOrders = function (noOfOrders) {
             var response = $http({
                url: 'http://localhost:8080/orders',
                method: "POST",
                data:{"side": "Buy","symbol": "AAPL","quantity": 10000, "limitPrice": 426.24,"traderId": "AM"},
                dataType: "json",
                contentType: 'application/json',
                async: false,
            })
            var response=getInstruments();
            if(isArray(response)){
                instruments=response;
                return createNewOrders(noOfOrders);
            }
            else{
                response.success(function(data){
                     instruments=data;
                     return createNewOrders(noOfOrders);
                })
            }
        };

        //get all orders from server
        service.getProductOrders = function () {
            var socket = io.connect('http://localhost:8080');
              socket.on('orderCreatedEvent', function (data) {
                  console.log(data);
                  orderMade=data;
            });
            return orderMade;
        };

        //delete all trades from server
        service.deleAllTrades = function () { 
            return response;
        };

        //creates new orders depending on user input
        function createNewOrders(noOfOrders) {
            var creationtime=new Date(),
            side,
            symbol,
            creationtime=creationtime.getMonth()+1+'-'+creationtime.getDate()+'-'+creationtime.getFullYear()+' '+creationtime.getHours()+':'+creationtime.getMinutes()+':'+creationtime.getSeconds();
                for (var i = 0; i < noOfOrders; i++) {
                    if(i!==0){
                        side=orderMade[i-1].side;
                        side=getSide(side);                        
                    }
                    else{
                        side='Sell'
                    }
                    symbol=instruments[i].symbol;
                    orderMade.push({
                        id:orderMade.length+1,creationtime:creationtime,'side': side, 'symbol': symbol, 'quantity': Math.floor(Math.random() * 1000 + 1),
                        quantityPlaced:Math.floor(Math.random() * 100 + 1),quantityExecuted:Math.floor(Math.random() * 100+ 1),
                        'limitPrice': Math.random() * 100,priority:50,status:'New', traderId: 'AM'
                    });
                }
            return orderMade;
        };

        function getSide(prevValue){
            var side='Buy';
            if(prevValue==='Sell'||undefined){
                return side;
            }
            else {
                return side='Sell';
            }
        }

        function getInstruments(){
            if(!instruments.length>0){
                 var response = $http({
                 url: 'http://localhost:8080/instruments',
                 method: "GET",
                 dataType: "json",
                 contentType: 'application/json',
                 async: false,
                 });
                return response;
            }
            else{
                return instruments
            }
        }

        function isArray(arr) {
            return arr.constructor.toString().indexOf("Array") > -1;
        }  

        return service;
    };

})();