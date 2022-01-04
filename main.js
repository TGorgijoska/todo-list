/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _interface_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./interface.js */ \"./src/interface.js\");\n\r\n\r\nconst start = (() => {\r\n    (0,_interface_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])();\r\n})();\n\n//# sourceURL=webpack://github/./src/index.js?");

/***/ }),

/***/ "./src/interface.js":
/*!**************************!*\
  !*** ./src/interface.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ loadPage)\n/* harmony export */ });\n/* harmony import */ var _storage_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./storage.js */ \"./src/storage.js\");\n\r\n\r\n\r\n    function loadPage () {\r\n\r\n        loadProjects();\r\n    }\r\n\r\n    function loadProjects () {\r\n        const projects = (0,_storage_js__WEBPACK_IMPORTED_MODULE_0__.getProjects)();\r\n        projects.forEach((el) => addProjectEl(el.name));\r\n    }\r\n    function loadTodos(){\r\n        const projectName = getCurrentProject();\r\n        const todos = (0,_storage_js__WEBPACK_IMPORTED_MODULE_0__.getTodos)(projectName);\r\n        todos.forEach((el) => {addTodoElement(el.name, el.priority, el.description)});\r\n    }\r\n\r\n    function getCurrentProject(){\r\n        const project = document.querySelector('todo');\r\n        return project.dataset.project;\r\n    }\r\n    \r\n    function addProjectEl (name) {\r\n        const projectsDiv = document.querySelector('.projects');\r\n        // createElements\r\n        let div = document.createElement('div');\r\n        let headerName = document.createElement('h2');\r\n        let delBtn = document.createElement('button');\r\n\r\n        // classList\r\n        div.classList.add('nav-project');\r\n        headerName.classList.add('project-name');\r\n        delBtn.classList.add('project-delbtn');\r\n\r\n        // textContent\r\n        headerName.textContent = name;\r\n        delBtn.textContent = 'delete';\r\n\r\n        // append\r\n        div.appendChild(headerName);\r\n        div.appendChild(delBtn);\r\n        projectsDiv.appendChild(div);\r\n\r\n    }\r\n\r\n    function addTodoElement (name, priority, description) {\r\n        const todoDiv = document.querySelector('.todos');\r\n        //create elements\r\n        let div = document.createElement('div');\r\n        let headerName = document.createElement('h3');\r\n        let parDescr = document.createElement('p');\r\n        let delBtn = document.createElement('button');\r\n        let editBtn = document.createElement('button');\r\n\r\n        // classList\r\n        div.classList.add('todo__item');\r\n        div.classList.add(priority);\r\n        headerName.classList.add('todo__item--title');\r\n        parDescr.className.add('todo__item--descr');\r\n        delBtn.classList.add('todo__item--delBtn');\r\n        editBtn.classList.add('todo__item--editBtn');\r\n\r\n        //textContent\r\n        headerName.textContent = name;\r\n        parDescr.textContent = description;\r\n        delBtn.textContent = 'x';\r\n        editBtn.textContent = 'edit';\r\n\r\n        // event listener\r\n        delBtn.addEventListener('click', () => { deleteTodo() });\r\n        editBtn.addEventListener('click', () => { editTodo() });\r\n\r\n        // appendChild\r\n        div.appendChild(headerName);\r\n        div.appendChild(parDescr);\r\n        div.appendChild(delBtn);\r\n        div.appendChild(editBtn);\r\n        todoDiv.appendChild(div);\r\n\r\n    }\r\n\n\n//# sourceURL=webpack://github/./src/interface.js?");

/***/ }),

/***/ "./src/project.js":
/*!************************!*\
  !*** ./src/project.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Project = (name) => {\r\n\r\n\r\n    return {name};\r\n\r\n});\n\n//# sourceURL=webpack://github/./src/project.js?");

/***/ }),

/***/ "./src/storage.js":
/*!************************!*\
  !*** ./src/storage.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"getProjects\": () => (/* binding */ getProjects),\n/* harmony export */   \"getTodos\": () => (/* binding */ getTodos)\n/* harmony export */ });\n/* harmony import */ var _project_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./project.js */ \"./src/project.js\");\n/* harmony import */ var _todos_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./todos.js */ \"./src/todos.js\");\n\r\n\r\n\r\nfunction setStorage(name, value){\r\n    localStorage.setItem(name, JSON.stringify(value));\r\n}\r\n\r\nfunction getProjects(){\r\n    let projects = JSON.parse(localStorage.getItem('projects'));\r\n    projects.map((el) => { return el=(0,_project_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(el.name) });\r\n    return projects;\r\n}\r\nfunction getTodos(projectName){\r\n    let todos = JSON.parse(localStorage.getItem(projectName));\r\n    todos.map((el) => { return el = (0,_todos_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(el.name, el.priority, el.descr)})\r\n}\r\n\r\n\n\n//# sourceURL=webpack://github/./src/storage.js?");

/***/ }),

/***/ "./src/todos.js":
/*!**********************!*\
  !*** ./src/todos.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Todos = (name, priority, description) => {\r\n\r\n    return {name, priority, description};\r\n    \r\n});\n\n//# sourceURL=webpack://github/./src/todos.js?");

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
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;