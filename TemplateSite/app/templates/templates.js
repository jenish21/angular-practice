angular.module('templateSite.templates', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/templates', {
                templateUrl: 'templates/templates.html',
                controller: 'TemplatesCtrl'
            }).when('/templates/:templateId', {
            templateUrl: 'templates/template-details.html',
            controller: 'TemplateDetailsCtrl'
        })
    }])

    .controller('TemplatesCtrl', ['$scope','$http', function ($scope,$http) {
        $http.get('json/templates.json').success(function(data){
            $scope.templates = data;
        });
    }])


    .controller('TemplateDetailsCtrl', ['$scope','$routeParams','$http','$filter', function ($scope, $routParams, $http ,$filter) {
        var templateId = $routeParams.templateId;
        $http.get('json/templates.json').success(function(data) {
            $scope.templates = $filter('filter')(data,function(d){
                return d.id = templateId;
            })[0];
            $scope.mainImage = $scope.template.images[0].name;
        });
    }]);