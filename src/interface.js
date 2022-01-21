import * as Storage from './storage.js';
import Project from './project.js';
import Todos from './todos.js';
import { format } from 'date-fns'


const addProjectBtn = document.getElementById('add-project');
const submitNewProject = document.getElementById('add-project_submit');
const cancelNewProject = document.getElementById('add-project_cancel');
const delProjectBtn = document.querySelectorAll('.project-delbtn');

const addTodoBtn = document.getElementById('add-todo');
const submitNewTodo = document.getElementById('add-todo_submit');
const cancelNewTodo = document.getElementById('add-todo_cancel');

    export default function loadPage () {

        loadProjects();
        eventListeners();     
        
    }
// ========= LOADING FROM LOCAL STORAGE ========= 
    function loadProjects () {      
        const projects = Storage.getProjects();
        projects.forEach((el) => renderProjectElement(el.name));
    }
    function loadTodos(projectName){
        hideNewProjectDiv();
        hideNewTodoDiv();
        // clear current todo-list, set data name of selected project
        clearTodos();
        setOpenedProject(projectName);
        // get from storage and load each one
        const todos = Storage.getAllTodos(projectName);
        todos.forEach((el) => {renderTodoElement(el.name, el.priority, el.date, el.done)});
    }  
    function loadTodayTodos(){
        setOpenedProject('today'); 
        clearTodos();
        const todoArr = Storage.todaysTodos();
        console.log(todoArr);
        for(let project in todoArr){
            todoArr[project].forEach(todo => {renderTodoElement(todo.name, todo.priority, todo.date, todo.done, project)})
        }
       }
// ========= ADDING EVENT LISTENERS TO BUTTONS =========
    function eventListeners(){
        // for responsive navigation
        const openNavBtn = document.querySelector('.open-nav');
        openNavBtn.addEventListener('click', () => openNav());
        const closeNavBtn = document.querySelector('.close-nav')
        closeNavBtn.addEventListener('click', () => closeNav());

        const today = document.getElementById('today');
        today.addEventListener('click', loadTodayTodos )
        // for project
        addProjectBtn.addEventListener('click', showNewProjectDiv );
        cancelNewProject.addEventListener('click',hideNewProjectDiv );
        submitNewProject.addEventListener('click', newProject )
        delProjectBtn.forEach(el => {
            el.addEventListener('click', () => deleteProject(el));
        })

        // for todos
        addTodoBtn.addEventListener('click', showNewTodoDiv);
        submitNewTodo.addEventListener('click', newTodo);
        cancelNewTodo.addEventListener('click', hideNewTodoDiv)
      

    }
// ======== SHOW/HIDE INPUT+BUTTONS FOR ADDING NEW PROJECT ========
    function hideNewProjectDiv (){
        addProjectBtn.classList.remove('hide');
        const inputDiv = document.querySelector('.nav__group--newproject');
        inputDiv.classList.remove('show');
    }
    function showNewProjectDiv (){
        const inputDiv = document.querySelector('.nav__group--newproject');
        // hide 'add' btn, show inputs
        hideNameWarrning();
        clearInput('project-name');
        addProjectBtn.classList.add('hide');
        inputDiv.classList.add('show');
    }
    function hideNewTodoDiv (){
        addTodoBtn.classList.remove('hide');
        const inputDiv = document.querySelector('.add-todo_group');
        inputDiv.classList.remove('show');
    }
    function showNewTodoDiv (){
        const inputDiv = document.querySelector('.add-todo_group');
        const date = document.querySelector('[name="todo-date"]');
        // clear input value, set input-date to todays, hide 'add-new' btn, show inputs
        clearInput('todo-name');
        date.value = format(Date.now(), 'yyyy-MM-dd');
        addTodoBtn.classList.add('hide');
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

    function hideEditTodoDiv(name){ 
        const divEdit = document.querySelector('.edit-todo');
        const parent = document.querySelector(`[data-todo='${name}']`);
        parent.firstChild.classList.remove('hide');
        divEdit.remove();
    }
    function hideTodo(name){
        const parent = document.querySelector(`[data-todo='${name}']`);
        parent.firstChild.classList.add('hide');
    }
// ========= CROSS OUT A TODO =========
    function todoDone(todoEl, project){
        const todoName = todoEl.dataset.todo;
        const elementTodo = document.querySelector(`div[data-todo="${todoName}"]`);
        let parentProject;
        if(!project){
            parentProject = elementTodo.parentNode.getAttribute('data-project');
        } else {
            parentProject = project;
        }

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
        renderProjectElement(project.name);
        hideNewProjectDiv();
    }
// ========= DELETE PROJECT =========
    function deleteProject(btn){
        const parent = btn.parentNode;
        const name = parent.getAttribute('data-project');
        parent.remove();
        Storage.removeProjectStorage(name);
        loadTodayTodos();
    }

// ========= NEW TODO =========
    function newTodo(){
        const name = document.querySelector('input[name="todo-name"]').value;
        const date = document.querySelector('[name="todo-date"]').value;
        const priority = document.querySelector('[name="todo-priority"]');
        const selected = priority.options[priority.selectedIndex].text;
        renderTodoElement(name, selected, format(new Date(date), 'dd/MMM/yyyy'), false);

        const todo = Todos(name, selected,format(new Date(date), 'dd/MMM/yyyy'), false);
        Storage.addTodoStorage(todo, getOpenedProject());

        hideNewTodoDiv();
    }
// ========= DELETE TODO ITEM =========
    function deleteTodo(name, project){
        let projectName;
        const elementTodo = document.querySelector(`div[data-todo='${name}']`);
        elementTodo.remove();
        !project ? projectName = getOpenedProject() : projectName = project;
        Storage.removeTodoStorage(name, projectName);
    }
// ========= EDIT TODO ITEM =========
    function handleEdit(name, project){
        let projectName;
        !project ? projectName = getOpenedProject() : projectName = project;
        const todo = Storage.getTodo(projectName, name);
            createEditTodoDiv(todo.name, todo.priority, todo.date, todo.done, project);
    
        hideTodo(name);
    }
    function editTodo(oldName, done, project){
        const name = document.querySelector('input[name="edit-todo-name"]').value;
        const date = document.querySelector('[name="edit-todo-date"]').value;
        const priority = document.querySelector('[name="edit-todo-priority"]');
        const selected = priority.options[priority.selectedIndex].text;

        const todo = Todos(name, selected, format(new Date(date), 'dd/MMM/yyyy'), done);
        updateTodoDiv(oldName, todo);
    // do we have todays projects opened
        if(!project){
            Storage.editTodoStorage(getOpenedProject(),oldName, todo);
            hideEditTodoDiv(todo.name); 
        }
        else {
            Storage.editTodoStorage(project,oldName, todo);
            loadTodayTodos();
        }    
        
    }
// ========= HELPERs =========
    const getOpenedProject= () => {
        return document.querySelector('.todo').dataset.project;
    }
    const setOpenedProject = (name) => {
        setActive(name);
        const div = document.querySelector('.todo');
        div.dataset.project = name;
    }
    const clearInput = (input) => {
        document.querySelector(`input[name='${input}']`).value = '';
    }
    const clearTodos = () => {
        document.querySelector('.todo').innerHTML = "";
    }
    const updateTodoDiv= (oldName, todo) =>{
        const div = document.querySelector(`[data-todo='${oldName}']`);
        div.setAttribute('data-todo', todo.name);
        div.classList.remove(div.classList.item(1));
        div.classList.add(todo.priority.toLowerCase());
        div.querySelector('.todo__item--title').textContent = todo.name;
        div.querySelector('.todo__item--date').textContent = todo.date;
        div.querySelector('.todo__item--done').setAttribute('data-todo', todo.name);
        div.querySelector('.todo__item__buttons--delbtn').setAttribute('data-todo', todo.name);
        div.querySelector('.todo__item__buttons--editbtn').setAttribute('data-todo', todo.name);
    }
    const setActive = (project) => {
        const projects = document.querySelectorAll(`[data-project]`);
        projects.forEach(el => {
            if (el.getAttribute('data-project') == project) el.classList.toggle('active', true);
                else el.classList.toggle('active', false)
        })
    }
// ========= NAVIGATION =========
    const openNav = () => {
        const header = document.querySelector('.header');
        header.classList.toggle('open', true);
        changeIcon(true);
        slideProjects();
    }
    const closeNav = () => {
        const header = document.querySelector('.header');
        header.classList.toggle('open', false);
        changeIcon(false);
        slideProjects();
    }        
    const changeIcon = (open) => {
        const openIcon = document.querySelector('.open-nav');
        const closeIcon = document.querySelector('.close-nav');
        // if we opened the nav
        if (open){
            openIcon.setAttribute('style', 'visibility: hidden !important');
            closeIcon.classList.toggle('show', true);
        }
        else {
            // if we closed the nav
            openIcon.setAttribute('style', 'visibility: visible');
            closeIcon.classList.toggle('show', false);
        }
    }
    const slideProjects = () => {
        const nav = document.querySelector('.nav');
        if(nav.classList.contains('slide-in')) 
            nav.classList.toggle('slide-in', false) 
        else 
            nav.classList.toggle('slide-in', true);
    }

// ========= ADD INDIVIDUAL ELEMENTS TO PAGE============
    function renderProjectElement (name) {
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
    
    function renderTodoElement (name, priority, date, done, project) {
        const todoDiv = document.querySelector('.todo');
        //create elements
        let divOuter = document.createElement('div');
        let divInner = document.createElement('div');
        let divBtns = document.createElement('div');
        let divGroup1 = document.createElement('div');
        let divGroup2 = document.createElement('div');
        let headerName = document.createElement('h3');
        let projectName = document.createElement('h5');
        let parDate = document.createElement('p');
        let doneCheckbox = document.createElement('input');
        let delBtn = document.createElement('button');
        let editBtn = document.createElement('button');
        let iconDel = document.createElement('i');
        let iconEdit = document.createElement('i');
        
        
        divOuter.classList.add('todo__item');
        divOuter.classList.add(priority.toLowerCase());
        divOuter.dataset.todo = name;
        if(done) divOuter.classList.add('done');

        divInner.classList.add('todo__item_info');
        
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
        delBtn.addEventListener('click', () => { deleteTodo(name, project) });
        doneCheckbox.addEventListener('change',() => todoDone(doneCheckbox, project))
        editBtn.addEventListener('click', () => { handleEdit(name, project) });
        // appendChild
        divGroup1.appendChild(doneCheckbox);
        divGroup1.appendChild(headerName);
        if(project !== undefined){
            projectName.textContent = `(${project})`;
            divGroup1.appendChild(projectName);
        }
        divInner.appendChild(divGroup1);

        delBtn.appendChild(iconDel);
        editBtn.appendChild(iconEdit);

        divBtns.appendChild(delBtn);
        divBtns.appendChild(editBtn);
        divGroup2.appendChild(parDate);
        divGroup2.appendChild(divBtns);
        divInner.appendChild(divGroup2);

        divOuter.appendChild(divInner);
        todoDiv.appendChild(divOuter);

    }
    function createEditTodoDiv(name, priority, date, done, project){
        const divParent = document.querySelector(`[data-todo='${name}']`);
        const div = document.createElement('div');
        const divInputs = document.createElement('div');
        const divBtns = document.createElement('div');
        const inputText = document.createElement('input');
        const inputDate = document.createElement('input');
        const select = document.createElement('select');
        const optionHigh = document.createElement('option');
        const optionMid = document.createElement('option');
        const optionLow = document.createElement('option');
        const submitBtn = document.createElement('button')
        const cancelBtn = document.createElement('button');

        div.classList.add('edit-todo');
        divInputs.classList.add('edit-inputs');
        divBtns.classList.add('edit-btns');

        inputText.setAttribute('type', 'text');
        inputText.setAttribute('name', 'edit-todo-name');
        inputText.setAttribute('value', name);
        inputDate.setAttribute('type', 'date');
        inputDate.setAttribute('name', 'edit-todo-date');
        inputDate.setAttribute('value', format(new Date(date), 'yyyy-MM-dd'));
        
        select.setAttribute('name', 'edit-todo-priority');
        optionHigh.setAttribute('value', 'high');
        optionMid.setAttribute('value', 'mid');
        optionLow.setAttribute('value', 'low');
        optionHigh.textContent = 'High';
        optionMid.textContent = 'Mid';
        optionLow.textContent = 'Low';
        eval('option'+ priority).selected = true ;

        submitBtn.setAttribute('id', 'edit-todo_submit');
        submitBtn.classList.add('submitbtn');
        submitBtn.textContent = 'submit change';
        if(!project){
            submitBtn.addEventListener('click', () => {editTodo(name, done)})
        } else {
            submitBtn.addEventListener('click', () => {editTodo(name, done, project)})           
        }
        
        cancelBtn.setAttribute('id', 'edit-todo_cancel');
        cancelBtn.classList.add('cancelbtn');
        cancelBtn.textContent = 'cancel';
        cancelBtn.addEventListener('click', () => {hideEditTodoDiv(name)});

        select.appendChild(optionHigh)
        select.appendChild(optionMid)
        select.appendChild(optionLow)

        divInputs.appendChild(inputText);
        divInputs.appendChild(inputDate);
        divInputs.appendChild(select);
        divBtns.appendChild(submitBtn);
        divBtns.appendChild(cancelBtn);
        div.appendChild(divInputs);
        div.appendChild(divBtns);
        divParent.appendChild(div);

    }
