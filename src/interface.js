import {getProjects, getTodos} from './storage.js';


    export default function loadPage () {

        loadProjects();
    }

    function loadProjects () {
        const projects = getProjects();
        projects.forEach((el) => addProjectEl(el.name));
    }
    function loadTodos(){
        const projectName = getCurrentProject();
        const todos = getTodos(projectName);
        todos.forEach((el) => {addTodoElement(el.name, el.priority, el.description)});
    }

    function getCurrentProject(){
        const project = document.querySelector('todo');
        return project.dataset.project;
    }
    
    function addProjectEl (name) {
        const projectsDiv = document.querySelector('.projects');
        // createElements
        let div = document.createElement('div');
        let headerName = document.createElement('h2');
        let delBtn = document.createElement('button');

        // classList
        div.classList.add('nav-project');
        headerName.classList.add('project-name');
        delBtn.classList.add('project-delbtn');

        // textContent
        headerName.textContent = name;
        delBtn.textContent = 'delete';

        // append
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
