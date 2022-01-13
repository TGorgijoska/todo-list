import * as Storage from './storage.js';
import Project from './project.js';
import Todos from './todos.js';
import { remove } from "lodash";
import { format } from 'date-fns'
// TODO: edit todo
// TODO: add today's tasks
// TODO: sort todos? maybe


const addProjectBtn = document.querySelector('#add-project');
const submitNewProject = document.getElementById('add-project_submit');
const cancelNewProject = document.getElementById('add-project_cancel');
const delProjectBtn = document.querySelectorAll('.project-delbtn');

const addTodoBtn = document.querySelector('#add-todo');
const submitNewTodo = document.querySelector('#add-todo_submit');
const cancelNewTodo = document.getElementById('add-todo_cancel');
const doneTodo = document.querySelectorAll('.todo__item--done');
const delTodoBtn = document.querySelectorAll('.todo__item__buttons--delbtn');
const editTodoBtn = document.querySelectorAll('.todo__item__buttons--editbtn');

    export default function loadPage () {

        loadProjects();
        eventListeners();     
        
    }
// ========= LOADING FROM LOCAL STORAGE ========= 
    function loadProjects () {
        const projects = Storage.getProjects();
        if(projects == null) return;
        projects.forEach((el) => addProjectElement(el.name));
    }
    function loadTodos(projectName){
        // clear current todo-list, set data name of selected project
        clearTodos();
        setOpenedProject(projectName);
        // get from storage and load each one
        const todos = Storage.getTodos(projectName);
        if(todos == null) return;
        todos.forEach((el) => {addTodoElement(el.name, el.priority, el.date, el.done)});
    }  
    
// ========= ADDING EVENT LISTENERS TO BUTTONS =========
    function eventListeners(){

        // for project
        addProjectBtn.addEventListener('click', () => {
            showNewProjectDiv(addProjectBtn)
        });
        cancelNewProject.addEventListener('click',() => {
            hideNewProjectDiv(addProjectBtn)
        });
        submitNewProject.addEventListener('click', () => newProject() )
        delProjectBtn.forEach(el => {
            el.addEventListener('click', () => deleteProject(el));
        })

        // for todos
        addTodoBtn.addEventListener('click', () => {
            showNewTodoDiv(addTodoBtn);
        });
        submitNewTodo.addEventListener('click', newTodo);
        cancelNewTodo.addEventListener('click', () => {
            hideNewTodoDiv(addTodoBtn);
        })
        doneTodo.forEach(el => {
            el.addEventListener('change',() => todoDone(el));
        })
        
        delTodoBtn.forEach(el => {
            el.addEventListener('click', () => deleteTodo(el.dataset.todo));
        }) 
        editTodoBtn.forEach(el => {
            el.addEventListener('click', () => editTodo(el.dataset.todo));
        }) 


    }
// ======== SHOW/HIDE INPUT+BUTTONS FOR ADDING NEW PROJECT ========
    function hideNewProjectDiv (btn){
        btn.classList.remove('hide');
        const inputDiv = document.querySelector('.nav__group--newproject');
        inputDiv.classList.remove('show');
    }
    function showNewProjectDiv (btn){
        const inputDiv = document.querySelector('.nav__group--newproject');
        // hide 'add' btn, show inputs
        hideNameWarrning();
        clearInput('project-name');
        btn.classList.add('hide');
        inputDiv.classList.add('show');
    }
    function hideNewTodoDiv (btn){
        btn.classList.remove('hide');
        const inputDiv = document.querySelector('.add-todo_group');
        inputDiv.classList.remove('show');
    }
    function showNewTodoDiv (btn){
        const inputDiv = document.querySelector('.add-todo_group');
        const date = document.querySelector('[name="todo-date"]');
        // clear input value, set input-date to todays, hide 'add-new' btn, show inputs
        clearInput('todo-name');
        date.value = format(Date.now(), 'yyyy-MM-dd');
        btn.classList.add('hide');
        inputDiv.classList.add('show');
    }
    function showNameWarrning(){
        const p = document.getElementById('unique');
        p.classList.remove('hide');
    }
    function hideNameWarrning(){
        const p = document.getElementById('unique');
        p.classList.add('hide');
    }
// ========= CROSS OUT A TODO =========
    function todoDone(todoEl){
        const todoName = todoEl.dataset.todo;
        const elementTodo = document.querySelector(`div[data-todo="${todoName}"]`);
        const parentProject = elementTodo.parentNode.getAttribute('data-project');

        if(todoEl.checked) {
            elementTodo.classList.add('done');
            Storage.updateDoneTodo(parentProject, todoName, true);
        } else {
            elementTodo.classList.remove('done');
            Storage.updateDoneTodo(parentProject, todoName, false);
        }   
    }
// ========= NEW PROJECT =========
    function newProject () {
        const value = document.querySelector('[name="project-name"]').value;
        const project = Project(value);
        const projectsArr = Storage.getProjects();      
        if(project.uniqueName(projectsArr)){
            showNameWarrning(); 
            return;
        }
        Storage.addProjectStorage(project);   
        addProjectElement(project.name);
        hideNewProjectDiv(addProjectBtn);
    }
// ========= DELETE PROJECT =========
    function deleteProject(btn){
        const parent = btn.parentNode;
        const name = parent.getAttribute('data-project');
        parent.remove();
        Storage.removeProjectStorage(name);
    }

// ========= NEW TODO =========
    function newTodo(){
        const name = document.querySelector('input[name="todo-name"]').value;
        const date = document.querySelector('[name="todo-date"]').value;
        const priority = document.querySelector('[name="todo-priority"]');
        const selected = priority.options[priority.selectedIndex].text;
        addTodoElement(name, selected, format(new Date(date), 'dd/MMM/yyyy'), false);

        const todo = Todos(name, selected,format(new Date(date), 'dd/MMM/yyyy'), false);
        Storage.addTodoStorage(todo);

        hideNewTodoDiv(addTodoBtn);
    }
// ========= DELETE TODO ITEM =========
    function deleteTodo(name){
        const elementTodo = document.querySelector(`div[data-todo='${name}']`);
        elementTodo.remove();
        Storage.removeTodoStorage(name);
    }
// ========= EDIT TODO ITEM =========
    function editTodo(name){

    }
// ========= HELPERs =========
    export const getOpenedProject= () => {
        return document.querySelector('.todo').dataset.project;
    }
    const setOpenedProject = (name) => {
        const div = document.querySelector('.todo');
        div.dataset.project = name;
    }
    const clearInput = (input) => {
        document.querySelector(`input[name='${input}']`).value = '';
    }
    const clearTodos = () => {
        document.querySelector('.todo').innerHTML = "";
    }

// ========= ADD INDIVIDUAL ELEMENTS TO PAGE============
    function addProjectElement (name) {
        const projectsDiv = document.querySelector('.project');
        // createElements
        let div = document.createElement('div');
        let headerName = document.createElement('h2');
        let delBtn = document.createElement('button');
        let icon = document.createElement('i');
        
        // classList
        div.classList.add('nav-project');
        headerName.classList.add('project-name');
        delBtn.classList.add('project--delbtn');
        icon.classList.add('fas');
        icon.classList.add('fa-trash');
        icon.classList.add('fa-lg');
        
        div.dataset.project = name;
        headerName.textContent = name;
        
        // events
        div.addEventListener('click', () => {loadTodos(name)});
        delBtn.addEventListener('click',() => {deleteProject(delBtn)})
        
        // append
        delBtn.appendChild(icon);
        div.appendChild(headerName);
        div.appendChild(delBtn);
        projectsDiv.appendChild(div);
        
    }
    
    function addTodoElement (name, priority, date, done) {
        const todoDiv = document.querySelector('.todo');
        //create elements
        let div = document.createElement('div');
        let divBtns = document.createElement('div');
        let divGroup1 = document.createElement('div');
        let divGroup2 = document.createElement('div');
        let headerName = document.createElement('h3');
        let parDate = document.createElement('p');
        let doneCheckbox = document.createElement('input');
        let delBtn = document.createElement('button');
        let editBtn = document.createElement('button');
        let iconDel = document.createElement('i');
        let iconEdit = document.createElement('i');
        
        
        div.classList.add('todo__item');
        div.classList.add(priority.toLowerCase());
        div.dataset.todo = name;
        if(done) div.classList.add('done');
        
        divBtns.classList.add('todo__item__buttons');
        divGroup1.classList.add('todo__item_group');
        divGroup2.classList.add('todo__item_group');

        headerName.classList.add('todo__item--title');
        headerName.textContent = name;
        
        parDate.classList.add('todo__item--date');
        parDate.textContent = date;
        
        doneCheckbox.classList.add('todo__item--done');
        doneCheckbox.setAttribute('type', 'checkbox');
        doneCheckbox.dataset.todo = name;
        doneCheckbox.checked = done;
        
        delBtn.classList.add('todo__item__buttons--delbtn');
        delBtn.dataset.todo = name;
        iconDel.classList.add('fas');
        iconDel.classList.add('fa-trash');
        iconDel.classList.add('fa-lg');
        
        editBtn.classList.add('todo__item__buttons--editbtn');
        editBtn.dataset.todo = name;
        iconEdit.classList.add('fas');
        iconEdit.classList.add('fa-pen');
        iconEdit.classList.add('fa-lg');
        
        // event listener
        delBtn.addEventListener('click', () => { deleteTodo(name) });
        doneCheckbox.addEventListener('change',() => todoDone(doneCheckbox))
        editBtn.addEventListener('click', () => { editTodo(name) });

        // appendChild
        divGroup1.appendChild(doneCheckbox);
        divGroup1.appendChild(headerName);
        div.appendChild(divGroup1);

        delBtn.appendChild(iconDel);
        editBtn.appendChild(iconEdit);

        divBtns.appendChild(delBtn);
        divBtns.appendChild(editBtn);
        divGroup2.appendChild(parDate);
        divGroup2.appendChild(divBtns);
        div.appendChild(divGroup2);
        
        todoDiv.appendChild(div);

    }
