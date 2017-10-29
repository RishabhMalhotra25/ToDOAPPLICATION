'use strict';

angular.module('crudApp').controller('ToDoController',
    ['ToDoService', '$scope',  function( ToDoService, $scope) {

        var self = this;
        self.toDo = {};
        self.toDos=[];

        self.submit = submit;
        self.getAllToDos = getAllToDos;
        self.createToDo = createToDo;
        self.updateToDo = updateToDo;
        self.removeToDo = removeToDo;
        self.editToDo = editToDo;
        self.reset = reset;

        self.successMessage = '';
        self.errorMessage = '';
        self.done = false;

        self.onlyIntegers = /^\d+$/;
        self.onlyNumbers = /^\d+([,.]\d+)?$/;

        function submit() {
            console.log('Submitting');
            //if (self.toDo.id === undefined || self.toDo.id === null) {
                console.log('Saving New ToDo', self.toDo);
                createToDo(self.toDo);
           // } /*else {
                //updateToDo(self.toDo, self.toDo.id);
                //console.log('ToDo updated with id ', self.toDo.id);
            //}*/
        }

        function createToDo(toDo) {
            console.log('About to create toDo');
            ToDoService.createToDo(toDo)
                .then(
                    function (response) {
                        console.log('ToDo created successfully');
                        self.successMessage = 'ToDo created successfully';
                        self.errorMessage='';
                        self.done = true;
                        self.toDo={};
                        $scope.myForm.$setPristine();
                    },
                    function (errResponse) {
                        console.error('Error while creating ToDo');
                        self.errorMessage = 'Error while creating ToDo: ' + errResponse.data.errorMessage;
                        self.successMessage='';
                    }
                );
        }


        function updateToDo(id){
            console.log('About to update toDo');
            ToDoService.updateToDo(id)
                .then(
                    function (response){
                        console.log('ToDo updated successfully');
                        self.successMessage='ToDo updated successfully';
                        self.errorMessage='';
                        self.done = true;
                        $scope.myForm.$setPristine();
                    },
                    function(errResponse){
                        console.error('Error while updating ToDo');
                        self.errorMessage='Error while updating ToDo '+errResponse.data;
                        self.successMessage='';
                    }
                );
        }


        function removeToDo(id){
            console.log('About to remove ToDo with id '+id);
            ToDoService.removeToDo(id)
                .then(
                    function(){
                        console.log('ToDo '+id + ' removed successfully');
                    },
                    function(errResponse){
                        console.error('Error while removing toDo '+id +', Error :'+errResponse.data);
                    }
                );
        }


        function getAllToDos(){
            return ToDoService.getAllToDos();
        }

        function editToDo(id) {
            self.successMessage='';
            self.errorMessage='';
            ToDoService.getToDo(id).then(
                function (toDo) {
                    self.toDo = toDo;
                },
                function (errResponse) {
                    console.error('Error while removing toDo ' + id + ', Error :' + errResponse.data);
                }
            );
        }
        function reset(){
            self.successMessage='';
            self.errorMessage='';
            self.toDo={};
            $scope.myForm.$setPristine(); //reset Form
        }
    }


    ]);