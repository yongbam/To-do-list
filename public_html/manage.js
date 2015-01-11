/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
// Show contents to HTML
function renderTodo(row) {
    var todos = document.getElementById("todoItems");
    var li = document.createElement("li");
    var a = document.createElement("a");
    var t = document.createTextNode(row.text);
    
    // Delete when click
    a.addEventListener("click", function(e) {
      html5rocks.indexedDB.deleteTodo(row.timeStamp);
    });

    a.textContent = " [Delete]";
    li.appendChild(t);
    li.appendChild(a);
    todos.appendChild(li);
}
// Initialize
function init() {
    html5rocks.indexedDB.open(); // open displays the data previously saved
}
// Add
function addTodo(val) {
    html5rocks.indexedDB.addTodo(val);
}
function deleteAllTodo(){
    html5rocks.indexedDB.deleteAllTodo();
}
// Input form
var app = angular.module("myToDoListApp", []);
app.controller("myToDoCtrl", function($scope) {
    $scope.message = "";
    $scope.left  = function() {return 100 - $scope.message.length;};
    $scope.clear = function() {$scope.message = "";};
    $scope.save  = function() {
        console.log($scope.message);
        addTodo($scope.message);
    };
    $scope.clearAll = function(){
        deleteAllTodo();
    };
});