/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/interface.js":
/*!**************************!*\
  !*** ./src/interface.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ loadPage)
/* harmony export */ });
/* harmony import */ var _storage_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./storage.js */ "./src/storage.js");



    function loadPage () {

        loadProjects();
        eventListeners();
        
    }
// ========= LOADING FROM LOCAL STORAGE ========= 
    function loadProjects () {
        const projects = (0,_storage_js__WEBPACK_IMPORTED_MODULE_0__.getProjects)();
        if(projects == null) return;
        projects.forEach((el) => addProjectElement(el.name));
    }
    function loadTodos(){
        const projectName = getCurrentProject();
        const todos = (0,_storage_js__WEBPACK_IMPORTED_MODULE_0__.getTodos)(projectName);
        if(todos == null) return;
        todos.forEach((el) => {addTodoElement(el.name, el.priority, el.description)});
    }
    
    function getCurrentProject(){
        const project = document.querySelector('todo');
        return project.dataset.project;
    }
// ========= ADDING EVENT LISTENERS TO BUTTONS =========
    function eventListeners(){
        const addProjectBtn = document.querySelector('#add-project');
        const addTodoBtn = document.querySelector('#add-todo');
        const submitNewProject = document.getElementById('add-project_submit');
        const cancelNewProject = document.getElementById('add-project_cancel');
        const cancelNewTodo = document.getElementById('add-todo_cancel');
        // for project
        addProjectBtn.addEventListener('click', () => {
            showNewProjectDiv(addProjectBtn)
        });
        cancelNewProject.addEventListener('click',() => {
            hideNewProjectDiv(addProjectBtn)
        });
        // for todos
        addTodoBtn.addEventListener('click', () => {
            showNewTodoDiv(addTodoBtn);
        });
        cancelNewTodo.addEventListener('click', () => {
            hideNewTodoDiv(addTodoBtn);
        })


    }
// ======== SHOW/HIDE INPUT+BUTTONS FOR ADDING NEW PROJECT ========
    function hideNewProjectDiv (btn){
        btn.classList.remove('hide');
        const inputDiv = document.querySelector('.nav__group--newproject');
        inputDiv.classList.remove('show');
    }
    function showNewProjectDiv (btn){
        btn.classList.add('hide');
        const inputDiv = document.querySelector('.nav__group--newproject');
        inputDiv.classList.add('show');
    }
    function hideNewTodoDiv (btn){
        btn.classList.remove('hide');
        const inputDiv = document.querySelector('.add-todo_group');
        inputDiv.classList.remove('show');
    }
    function showNewTodoDiv (btn){
        btn.classList.add('hide');
        const inputDiv = document.querySelector('.add-todo_group');
        inputDiv.classList.add('show');
    }
// ========= ADD INDIVIDUAL ELEMENTS ============
    function addProjectElement (name) {
        const projectsDiv = document.querySelector('.projects');
        // createElements
        let div = document.createElement('div');
        let headerName = document.createElement('h2');
        let delBtn = document.createElement('button');
        let icon = document.createElement('i');

        // classList
        div.classList.add('nav-project');
        headerName.classList.add('project-name');
        delBtn.classList.add('project-delbtn');
        i.classList.add('fas');
        i.classList.add('fa-trash');
        i.classList.add('fa-lg');

        div.setAttribute('data-project', name.replace(' ', '-'));
        headerName.textContent = name;

        // events
        div.addEventListener('click', () => {loadTodos()}) ;

        // append
        delBtn.appendChild(icon);
        div.appendChild(headerName);
        div.appendChild(delBtn);
        projectsDiv.appendChild(div);

    }

    function addTodoElement (name, priority, description) {
        const todoDiv = document.querySelector('.todos');
        //create elements
        let div = document.createElement('div');
        let headerName = document.createElement('h3');
        let parDescr = document.createElement('p');
        let delBtn = document.createElement('button');
        let editBtn = document.createElement('button');

        // classList
        div.classList.add('todo__item');
        div.classList.add(priority);
        headerName.classList.add('todo__item--title');
        parDescr.className.add('todo__item--descr');
        delBtn.classList.add('todo__item--delBtn');
        editBtn.classList.add('todo__item--editBtn');

        //textContent
        headerName.textContent = name;
        parDescr.textContent = description;
        delBtn.textContent = 'x';
        editBtn.textContent = 'edit';

        // event listener
        delBtn.addEventListener('click', () => { deleteTodo() });
        editBtn.addEventListener('click', () => { editTodo() });

        // appendChild
        div.appendChild(headerName);
        div.appendChild(parDescr);
        div.appendChild(delBtn);
        div.appendChild(editBtn);
        todoDiv.appendChild(div);

    }


/***/ }),

/***/ "./src/project.js":
/*!************************!*\
  !*** ./src/project.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Project)
/* harmony export */ });
function Project (name) {
    return name;
}

/***/ }),

/***/ "./src/storage.js":
/*!************************!*\
  !*** ./src/storage.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "projectsStorage": () => (/* binding */ projectsStorage),
/* harmony export */   "getProjects": () => (/* binding */ getProjects),
/* harmony export */   "getTodos": () => (/* binding */ getTodos)
/* harmony export */ });
/* harmony import */ var _project_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./project.js */ "./src/project.js");
/* harmony import */ var _todos_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./todos.js */ "./src/todos.js");



function setStorage(name, value){
    localStorage.setItem(name, JSON.stringify(value));
}

function getProjects(){
    let projects = JSON.parse(localStorage.getItem('projects'));
    if(projects == null) return;
    projects.map((el) => { return el = (0,_project_js__WEBPACK_IMPORTED_MODULE_0__["default"])(el.name) });
    return projects;
}
function getTodos(projectName){
    let todos = JSON.parse(localStorage.getItem(projectName));
    if(todos == null) return;
    todos.map((el) => { return el = (0,_todos_js__WEBPACK_IMPORTED_MODULE_1__["default"])(el.name, el.priority, el.descr)})
    return todos;
}
function projectsStorage(...projects){
    setStorage('projects', projects);
}



/***/ }),

/***/ "./src/todos.js":
/*!**********************!*\
  !*** ./src/todos.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Todos)
/* harmony export */ });
function Todos (name, priority, description) {

    return {name, priority, description};
    
}

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _interface_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./interface.js */ "./src/interface.js");


window.onload = (0,_interface_js__WEBPACK_IMPORTED_MODULE_0__["default"])();
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBb0U7QUFDcEU7QUFDQTtBQUNBLElBQW1CO0FBQ25CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUJBQXlCLHdEQUFXO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQkFBc0IscURBQVE7QUFDOUI7QUFDQSwrQkFBK0IscURBQXFEO0FBQ3BGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkNBQTZDLFlBQVk7QUFDekQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaURBQWlELGNBQWM7QUFDL0Qsa0RBQWtELFlBQVk7QUFDOUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7QUN4SWU7QUFDZjtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNGbUM7QUFDSjtBQUMvQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkJBQTJCLFlBQVksdURBQU8sV0FBVztBQUN6RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLFlBQVkscURBQUssaUNBQWlDO0FBQzFFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FDdEJlO0FBQ2Y7QUFDQSxZQUFZO0FBQ1o7QUFDQTs7Ozs7O1VDSkE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7OztBQ05zQztBQUN0QztBQUNBLGdCQUFnQix5REFBUSxHIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vZ2l0aHViLy4vc3JjL2ludGVyZmFjZS5qcyIsIndlYnBhY2s6Ly9naXRodWIvLi9zcmMvcHJvamVjdC5qcyIsIndlYnBhY2s6Ly9naXRodWIvLi9zcmMvc3RvcmFnZS5qcyIsIndlYnBhY2s6Ly9naXRodWIvLi9zcmMvdG9kb3MuanMiLCJ3ZWJwYWNrOi8vZ2l0aHViL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2dpdGh1Yi93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vZ2l0aHViL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vZ2l0aHViL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vZ2l0aHViLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7cHJvamVjdHNTdG9yYWdlLCBnZXRQcm9qZWN0cywgZ2V0VG9kb3N9IGZyb20gJy4vc3RvcmFnZS5qcyc7XHJcblxyXG5cclxuICAgIGV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGxvYWRQYWdlICgpIHtcclxuXHJcbiAgICAgICAgbG9hZFByb2plY3RzKCk7XHJcbiAgICAgICAgZXZlbnRMaXN0ZW5lcnMoKTtcclxuICAgICAgICBcclxuICAgIH1cclxuLy8gPT09PT09PT09IExPQURJTkcgRlJPTSBMT0NBTCBTVE9SQUdFID09PT09PT09PSBcclxuICAgIGZ1bmN0aW9uIGxvYWRQcm9qZWN0cyAoKSB7XHJcbiAgICAgICAgY29uc3QgcHJvamVjdHMgPSBnZXRQcm9qZWN0cygpO1xyXG4gICAgICAgIGlmKHByb2plY3RzID09IG51bGwpIHJldHVybjtcclxuICAgICAgICBwcm9qZWN0cy5mb3JFYWNoKChlbCkgPT4gYWRkUHJvamVjdEVsZW1lbnQoZWwubmFtZSkpO1xyXG4gICAgfVxyXG4gICAgZnVuY3Rpb24gbG9hZFRvZG9zKCl7XHJcbiAgICAgICAgY29uc3QgcHJvamVjdE5hbWUgPSBnZXRDdXJyZW50UHJvamVjdCgpO1xyXG4gICAgICAgIGNvbnN0IHRvZG9zID0gZ2V0VG9kb3MocHJvamVjdE5hbWUpO1xyXG4gICAgICAgIGlmKHRvZG9zID09IG51bGwpIHJldHVybjtcclxuICAgICAgICB0b2Rvcy5mb3JFYWNoKChlbCkgPT4ge2FkZFRvZG9FbGVtZW50KGVsLm5hbWUsIGVsLnByaW9yaXR5LCBlbC5kZXNjcmlwdGlvbil9KTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgZnVuY3Rpb24gZ2V0Q3VycmVudFByb2plY3QoKXtcclxuICAgICAgICBjb25zdCBwcm9qZWN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcigndG9kbycpO1xyXG4gICAgICAgIHJldHVybiBwcm9qZWN0LmRhdGFzZXQucHJvamVjdDtcclxuICAgIH1cclxuLy8gPT09PT09PT09IEFERElORyBFVkVOVCBMSVNURU5FUlMgVE8gQlVUVE9OUyA9PT09PT09PT1cclxuICAgIGZ1bmN0aW9uIGV2ZW50TGlzdGVuZXJzKCl7XHJcbiAgICAgICAgY29uc3QgYWRkUHJvamVjdEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNhZGQtcHJvamVjdCcpO1xyXG4gICAgICAgIGNvbnN0IGFkZFRvZG9CdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjYWRkLXRvZG8nKTtcclxuICAgICAgICBjb25zdCBzdWJtaXROZXdQcm9qZWN0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2FkZC1wcm9qZWN0X3N1Ym1pdCcpO1xyXG4gICAgICAgIGNvbnN0IGNhbmNlbE5ld1Byb2plY3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYWRkLXByb2plY3RfY2FuY2VsJyk7XHJcbiAgICAgICAgY29uc3QgY2FuY2VsTmV3VG9kbyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhZGQtdG9kb19jYW5jZWwnKTtcclxuICAgICAgICAvLyBmb3IgcHJvamVjdFxyXG4gICAgICAgIGFkZFByb2plY3RCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIHNob3dOZXdQcm9qZWN0RGl2KGFkZFByb2plY3RCdG4pXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgY2FuY2VsTmV3UHJvamVjdC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsKCkgPT4ge1xyXG4gICAgICAgICAgICBoaWRlTmV3UHJvamVjdERpdihhZGRQcm9qZWN0QnRuKVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIC8vIGZvciB0b2Rvc1xyXG4gICAgICAgIGFkZFRvZG9CdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIHNob3dOZXdUb2RvRGl2KGFkZFRvZG9CdG4pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGNhbmNlbE5ld1RvZG8uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGhpZGVOZXdUb2RvRGl2KGFkZFRvZG9CdG4pO1xyXG4gICAgICAgIH0pXHJcblxyXG5cclxuICAgIH1cclxuLy8gPT09PT09PT0gU0hPVy9ISURFIElOUFVUK0JVVFRPTlMgRk9SIEFERElORyBORVcgUFJPSkVDVCA9PT09PT09PVxyXG4gICAgZnVuY3Rpb24gaGlkZU5ld1Byb2plY3REaXYgKGJ0bil7XHJcbiAgICAgICAgYnRuLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGUnKTtcclxuICAgICAgICBjb25zdCBpbnB1dERpdiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5uYXZfX2dyb3VwLS1uZXdwcm9qZWN0Jyk7XHJcbiAgICAgICAgaW5wdXREaXYuY2xhc3NMaXN0LnJlbW92ZSgnc2hvdycpO1xyXG4gICAgfVxyXG4gICAgZnVuY3Rpb24gc2hvd05ld1Byb2plY3REaXYgKGJ0bil7XHJcbiAgICAgICAgYnRuLmNsYXNzTGlzdC5hZGQoJ2hpZGUnKTtcclxuICAgICAgICBjb25zdCBpbnB1dERpdiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5uYXZfX2dyb3VwLS1uZXdwcm9qZWN0Jyk7XHJcbiAgICAgICAgaW5wdXREaXYuY2xhc3NMaXN0LmFkZCgnc2hvdycpO1xyXG4gICAgfVxyXG4gICAgZnVuY3Rpb24gaGlkZU5ld1RvZG9EaXYgKGJ0bil7XHJcbiAgICAgICAgYnRuLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGUnKTtcclxuICAgICAgICBjb25zdCBpbnB1dERpdiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5hZGQtdG9kb19ncm91cCcpO1xyXG4gICAgICAgIGlucHV0RGl2LmNsYXNzTGlzdC5yZW1vdmUoJ3Nob3cnKTtcclxuICAgIH1cclxuICAgIGZ1bmN0aW9uIHNob3dOZXdUb2RvRGl2IChidG4pe1xyXG4gICAgICAgIGJ0bi5jbGFzc0xpc3QuYWRkKCdoaWRlJyk7XHJcbiAgICAgICAgY29uc3QgaW5wdXREaXYgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYWRkLXRvZG9fZ3JvdXAnKTtcclxuICAgICAgICBpbnB1dERpdi5jbGFzc0xpc3QuYWRkKCdzaG93Jyk7XHJcbiAgICB9XHJcbi8vID09PT09PT09PSBBREQgSU5ESVZJRFVBTCBFTEVNRU5UUyA9PT09PT09PT09PT1cclxuICAgIGZ1bmN0aW9uIGFkZFByb2plY3RFbGVtZW50IChuYW1lKSB7XHJcbiAgICAgICAgY29uc3QgcHJvamVjdHNEaXYgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucHJvamVjdHMnKTtcclxuICAgICAgICAvLyBjcmVhdGVFbGVtZW50c1xyXG4gICAgICAgIGxldCBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICBsZXQgaGVhZGVyTmFtZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2gyJyk7XHJcbiAgICAgICAgbGV0IGRlbEJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xyXG4gICAgICAgIGxldCBpY29uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaScpO1xyXG5cclxuICAgICAgICAvLyBjbGFzc0xpc3RcclxuICAgICAgICBkaXYuY2xhc3NMaXN0LmFkZCgnbmF2LXByb2plY3QnKTtcclxuICAgICAgICBoZWFkZXJOYW1lLmNsYXNzTGlzdC5hZGQoJ3Byb2plY3QtbmFtZScpO1xyXG4gICAgICAgIGRlbEJ0bi5jbGFzc0xpc3QuYWRkKCdwcm9qZWN0LWRlbGJ0bicpO1xyXG4gICAgICAgIGkuY2xhc3NMaXN0LmFkZCgnZmFzJyk7XHJcbiAgICAgICAgaS5jbGFzc0xpc3QuYWRkKCdmYS10cmFzaCcpO1xyXG4gICAgICAgIGkuY2xhc3NMaXN0LmFkZCgnZmEtbGcnKTtcclxuXHJcbiAgICAgICAgZGl2LnNldEF0dHJpYnV0ZSgnZGF0YS1wcm9qZWN0JywgbmFtZS5yZXBsYWNlKCcgJywgJy0nKSk7XHJcbiAgICAgICAgaGVhZGVyTmFtZS50ZXh0Q29udGVudCA9IG5hbWU7XHJcblxyXG4gICAgICAgIC8vIGV2ZW50c1xyXG4gICAgICAgIGRpdi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtsb2FkVG9kb3MoKX0pIDtcclxuXHJcbiAgICAgICAgLy8gYXBwZW5kXHJcbiAgICAgICAgZGVsQnRuLmFwcGVuZENoaWxkKGljb24pO1xyXG4gICAgICAgIGRpdi5hcHBlbmRDaGlsZChoZWFkZXJOYW1lKTtcclxuICAgICAgICBkaXYuYXBwZW5kQ2hpbGQoZGVsQnRuKTtcclxuICAgICAgICBwcm9qZWN0c0Rpdi5hcHBlbmRDaGlsZChkaXYpO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBhZGRUb2RvRWxlbWVudCAobmFtZSwgcHJpb3JpdHksIGRlc2NyaXB0aW9uKSB7XHJcbiAgICAgICAgY29uc3QgdG9kb0RpdiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50b2RvcycpO1xyXG4gICAgICAgIC8vY3JlYXRlIGVsZW1lbnRzXHJcbiAgICAgICAgbGV0IGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICAgIGxldCBoZWFkZXJOYW1lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaDMnKTtcclxuICAgICAgICBsZXQgcGFyRGVzY3IgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XHJcbiAgICAgICAgbGV0IGRlbEJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xyXG4gICAgICAgIGxldCBlZGl0QnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XHJcblxyXG4gICAgICAgIC8vIGNsYXNzTGlzdFxyXG4gICAgICAgIGRpdi5jbGFzc0xpc3QuYWRkKCd0b2RvX19pdGVtJyk7XHJcbiAgICAgICAgZGl2LmNsYXNzTGlzdC5hZGQocHJpb3JpdHkpO1xyXG4gICAgICAgIGhlYWRlck5hbWUuY2xhc3NMaXN0LmFkZCgndG9kb19faXRlbS0tdGl0bGUnKTtcclxuICAgICAgICBwYXJEZXNjci5jbGFzc05hbWUuYWRkKCd0b2RvX19pdGVtLS1kZXNjcicpO1xyXG4gICAgICAgIGRlbEJ0bi5jbGFzc0xpc3QuYWRkKCd0b2RvX19pdGVtLS1kZWxCdG4nKTtcclxuICAgICAgICBlZGl0QnRuLmNsYXNzTGlzdC5hZGQoJ3RvZG9fX2l0ZW0tLWVkaXRCdG4nKTtcclxuXHJcbiAgICAgICAgLy90ZXh0Q29udGVudFxyXG4gICAgICAgIGhlYWRlck5hbWUudGV4dENvbnRlbnQgPSBuYW1lO1xyXG4gICAgICAgIHBhckRlc2NyLnRleHRDb250ZW50ID0gZGVzY3JpcHRpb247XHJcbiAgICAgICAgZGVsQnRuLnRleHRDb250ZW50ID0gJ3gnO1xyXG4gICAgICAgIGVkaXRCdG4udGV4dENvbnRlbnQgPSAnZWRpdCc7XHJcblxyXG4gICAgICAgIC8vIGV2ZW50IGxpc3RlbmVyXHJcbiAgICAgICAgZGVsQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4geyBkZWxldGVUb2RvKCkgfSk7XHJcbiAgICAgICAgZWRpdEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHsgZWRpdFRvZG8oKSB9KTtcclxuXHJcbiAgICAgICAgLy8gYXBwZW5kQ2hpbGRcclxuICAgICAgICBkaXYuYXBwZW5kQ2hpbGQoaGVhZGVyTmFtZSk7XHJcbiAgICAgICAgZGl2LmFwcGVuZENoaWxkKHBhckRlc2NyKTtcclxuICAgICAgICBkaXYuYXBwZW5kQ2hpbGQoZGVsQnRuKTtcclxuICAgICAgICBkaXYuYXBwZW5kQ2hpbGQoZWRpdEJ0bik7XHJcbiAgICAgICAgdG9kb0Rpdi5hcHBlbmRDaGlsZChkaXYpO1xyXG5cclxuICAgIH1cclxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gUHJvamVjdCAobmFtZSkge1xyXG4gICAgcmV0dXJuIG5hbWU7XHJcbn0iLCJpbXBvcnQgUHJvamVjdCBmcm9tICcuL3Byb2plY3QuanMnO1xyXG5pbXBvcnQgVG9kb3MgZnJvbSAnLi90b2Rvcy5qcyc7XHJcblxyXG5mdW5jdGlvbiBzZXRTdG9yYWdlKG5hbWUsIHZhbHVlKXtcclxuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKG5hbWUsIEpTT04uc3RyaW5naWZ5KHZhbHVlKSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGdldFByb2plY3RzKCl7XHJcbiAgICBsZXQgcHJvamVjdHMgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdwcm9qZWN0cycpKTtcclxuICAgIGlmKHByb2plY3RzID09IG51bGwpIHJldHVybjtcclxuICAgIHByb2plY3RzLm1hcCgoZWwpID0+IHsgcmV0dXJuIGVsID0gUHJvamVjdChlbC5uYW1lKSB9KTtcclxuICAgIHJldHVybiBwcm9qZWN0cztcclxufVxyXG5mdW5jdGlvbiBnZXRUb2Rvcyhwcm9qZWN0TmFtZSl7XHJcbiAgICBsZXQgdG9kb3MgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKHByb2plY3ROYW1lKSk7XHJcbiAgICBpZih0b2RvcyA9PSBudWxsKSByZXR1cm47XHJcbiAgICB0b2Rvcy5tYXAoKGVsKSA9PiB7IHJldHVybiBlbCA9IFRvZG9zKGVsLm5hbWUsIGVsLnByaW9yaXR5LCBlbC5kZXNjcil9KVxyXG4gICAgcmV0dXJuIHRvZG9zO1xyXG59XHJcbmZ1bmN0aW9uIHByb2plY3RzU3RvcmFnZSguLi5wcm9qZWN0cyl7XHJcbiAgICBzZXRTdG9yYWdlKCdwcm9qZWN0cycsIHByb2plY3RzKTtcclxufVxyXG5cclxuZXhwb3J0IHtwcm9qZWN0c1N0b3JhZ2UsIGdldFByb2plY3RzLCBnZXRUb2Rvc307IiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gVG9kb3MgKG5hbWUsIHByaW9yaXR5LCBkZXNjcmlwdGlvbikge1xyXG5cclxuICAgIHJldHVybiB7bmFtZSwgcHJpb3JpdHksIGRlc2NyaXB0aW9ufTtcclxuICAgIFxyXG59IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgbG9hZFBhZ2UgZnJvbSAnLi9pbnRlcmZhY2UuanMnO1xyXG5cclxud2luZG93Lm9ubG9hZCA9IGxvYWRQYWdlKCk7Il0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9