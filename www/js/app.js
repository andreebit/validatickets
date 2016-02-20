var exampleApp = angular.module('starter', ['ionic', 'ngCordova'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
});


exampleApp.controller("ExampleController", function($scope, $cordovaBarcodeScanner, $http, $ionicPopup) {
    $scope.scanBarcode = function() {
        $cordovaBarcodeScanner.scan().then(function(imageData) {
            var code = imageData.text;
            var api_key = "a3240ae77dcb1308e094e24c16698d96";

            var req = 
            {
                method: 'GET',
                url: "http://paselibre.info/api/v1/tickets/validar?api_key=" + api_key + "&code=" + code
            }

            $http(req).
            success(function(data, status, headers, config) 
            {
                if (data.status == "success") {
                    var alertPopup = $ionicPopup.alert({
                        title: 'Pase Libre',
                        template: "Ticket válido:" + "<br>Evento: " + data.data.event + "<br>Tipo: " + data.data.description + "<br>Cantidad: " + data.data.quantity,
                        okText: "Aceptar"
                    }).then();

                } else {
                    var alertPopup = $ionicPopup.alert({
                        title: 'Pase Libre',
                        template: "Error: " + data.message,
                        okText: "Aceptar"
                    }).then();                  
                }                
            }).
            error(function(data, status, headers, config) 
            {
                
            });

        }, function(error) {
            
        });
        
    };
 
});
