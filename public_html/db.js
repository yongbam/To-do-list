/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
// Indexed db
var html5rocks = {};
/* --------------------------------------------------------------- */
// Integreted database connection class
/* --------------------------------------------------------------- */
// global values
/* --------------------------------------------------------------- */
html5rocks.indexedDB = {};
html5rocks.indexedDB.db = null;
/* --------------------------------------------------------------- */
// Functions
/* --------------------------------------------------------------- */
// Open
html5rocks.indexedDB.open = function() {
  var version = 1;
  var request = indexedDB.open("todos", version);

  // We can only create Object stores in a versionchange transaction.
  request.onupgradeneeded = function(e) {
    var db = e.target.result;

    // A versionchange transaction is started automatically.
    e.target.transaction.onerror = html5rocks.indexedDB.onerror;

    if(db.objectStoreNames.contains("todo")) {
      db.deleteObjectStore("todo");
    }

    var store = db.createObjectStore("todo",
      {keyPath: "timeStamp"});
  };

  request.onsuccess = function(e) {
    html5rocks.indexedDB.db = e.target.result;
    html5rocks.indexedDB.getAllTodoItems();
  };

  request.onerror = html5rocks.indexedDB.onerror;
};
// Insert
html5rocks.indexedDB.addTodo = function(todoText) {
    console.log(todoText);
    if(typeof todoText === 'undefined'){
        return false;
    }
    var db = html5rocks.indexedDB.db;
    var trans = db.transaction(["todo"], "readwrite");
    var store = trans.objectStore("todo");
    var request = store.put({
        "text": todoText,
        "timeStamp" : new Date().getTime()
    });

    trans.oncomplete = function(e) {
        // Re-render all the todo's
        // html5rocks.indexedDB.getAllTodoItems();
    };

    request.onerror = function(e) {
      console.log(e.value);
    };
};
// Query
html5rocks.indexedDB.getAllTodoItems = function() {
    var todos = document.getElementById("todoItems");
    todos.innerHTML = "";

    var db = html5rocks.indexedDB.db;
    var trans = db.transaction(["todo"], "readwrite");
    var store = trans.objectStore("todo");

    // Get everything in the store;
    var keyRange = IDBKeyRange.lowerBound(0);
    var cursorRequest = store.openCursor(keyRange);

    cursorRequest.onsuccess = function(e) {
        var result = e.target.result;
        if(result == false || result==null)
            return;
      
        renderTodo(result.value);
        result.continue();
};

  cursorRequest.onerror = html5rocks.indexedDB.onerror;
};
// Delete
html5rocks.indexedDB.deleteTodo = function(id) {
    var db = html5rocks.indexedDB.db;
    var trans = db.transaction(["todo"], "readwrite");
    var store = trans.objectStore("todo");

    var request = store.delete(id);

    trans.oncomplete = function(e) {
        html5rocks.indexedDB.getAllTodoItems();  // Refresh the screen
    };

    request.onerror = function(e) {
        console.log(e);
    };
};
// Delete all
html5rocks.indexedDB.deleteTodo = function() {
    var db = html5rocks.indexedDB.db;
    var trans = db.transaction(["todo"], "readwrite");
    var store = trans.objectStore("todo");

    var request = store.delete(id);

    trans.oncomplete = function(e) {
        html5rocks.indexedDB.getAllTodoItems();  // Refresh the screen
    };

    request.onerror = function(e) {
        console.log(e);
    };
};