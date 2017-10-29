var app = angular.module('crudApp',['ui.router','ngStorage']);

app.constant('urls', {
    BASE: 'http://localhost:8080/ToDoAppApplication',
    USER_SERVICE_API : 'http://localhost:8087/ToDoAppApplication/api/getAllToDo/',
    USER_SERVICE_API1:'http://localhost:8087/ToDoAppApplication/api/InsertToDoDetails/',
    USER_SERVICE_API2:'http://localhost:8087/ToDoAppApplication/api/updateToDoSatus/',
    USER_SERVICE_API3:'http://localhost:8087/ToDoAppApplication/api/deleteToDo/'
});

app.config(['$stateProvider', '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {

        $stateProvider
            .state('home', {
                url: '/',
                templateUrl: 'partials/list',
                controller:'ToDoController',
                controllerAs:'ctrl',
                resolve: {
                    users: function ($q, ToDoService) {
                        console.log('Load all todos');
                        var deferred = $q.defer();
                        ToDoService.loadAllToDos().then(deferred.resolve, deferred.resolve);
                        return deferred.promise;
                    }
                }
            });
        $urlRouterProvider.otherwise('/');
    }]);

