'use strict';

angular.module('crudApp').factory('ToDoService',
    ['$localStorage', '$http', '$q', 'urls',
        function ($localStorage, $http, $q, urls) {

            var factory = {
                loadAllToDos: loadAllToDos,
                getAllToDos: getAllToDos,
                getToDo: getToDo,
                createToDo: createToDo,
                updateToDo: updateToDo,
                removeToDo: removeToDo
            };

            return factory;

            function loadAllToDos() {
                console.log('Fetching all toDos');
                var deferred = $q.defer();
                $http.get(urls.USER_SERVICE_API)
                    .then(
                        function (response) {
                            console.log('Fetched successfully all toDos');
                            $localStorage.toDos = response.data;
                            deferred.resolve(response);
                        },
                        function (errResponse) {
                            console.error('Error while loading toDos');
                            deferred.reject(errResponse);
                        }
                    );
                return deferred.promise;
            }

            function getAllToDos(){
                return $localStorage.toDos;
            }

            function getToDo(id) {
                console.log('Fetching ToDo with id :'+id);
                var deferred = $q.defer();
                $http.get(urls.USER_SERVICE_API + id)
                    .then(
                        function (response) {
                            console.log('Fetched successfully ToDo with id :'+id);
                            deferred.resolve(response.data);
                        },
                        function (errResponse) {
                            console.error('Error while loading toDo with id :'+id);
                            deferred.reject(errResponse);
                        }
                    );
                return deferred.promise;
            }

            function createToDo(toDo) {
                console.log('Creating ToDo');
                var deferred = $q.defer();
                $http.post(urls.USER_SERVICE_API1, toDo)
                    .then(
                        function (response) {
                            loadAllToDos();
                            deferred.resolve(response.data);
                        },
                        function (errResponse) {
                           console.error('Error while creating ToDo : '+errResponse.data.errorMessage);
                           deferred.reject(errResponse);
                        }
                    );
                return deferred.promise;
            }

            function updateToDo(id) {
                console.log('Updating ToDo with id '+id);
                var deferred = $q.defer();
                $http.put(urls.USER_SERVICE_API2 + id)
                    .then(
                        function (response) {
                            loadAllToDos();
                            deferred.resolve(response.data);
                        },
                        function (errResponse) {
                            console.error('Error while updating ToDo with id :'+id);
                            deferred.reject(errResponse);
                        }
                    );
                return deferred.promise;
            }

            function removeToDo(id) {
                console.log('Removing ToDo with id '+id);
                var deferred = $q.defer();
                $http.put(urls.USER_SERVICE_API3 + id)
                    .then(
                        function (response) {
                            loadAllToDos();
                            deferred.resolve(response.data);
                        },
                        function (errResponse) {
                            console.error('Error while removing ToDo with id :'+id);
                            deferred.reject(errResponse);
                        }
                    );
                return deferred.promise;
            }

        }
    ]);