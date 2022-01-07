import {projectsStorage, getProjects, getTodos} from './storage.js';


    export default function loadPage () {

        loadProjects();
        eventListeners();
        
    }
// ========= LOADING FROM LOCAL STORAGE ========= 
    function loadProjects () {
        const projects = getProjects();
        if(projects == null) return;
        projects.forEach((el) => addProjectElement(el.name));
    }
    function loadTodos(){
        const projectName = getCurrentProject();
        const todos = getTodos(projectName);
        if(todos == null) return;
        todos.forEach((el) => {addTodoElement(el.name, el.priority, el.description, el.done)});
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
// ========= CROSS OUT A TODO =========
    function todoDone(todoEl){

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
