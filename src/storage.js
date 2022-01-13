import Project from './project.js';
import Todos from './todos.js';
import { getOpenedProject } from './interface.js';
import { remove } from "lodash";

export function setStorage(name, value){
    localStorage.setItem(name, JSON.stringify(value));
}

export function getProjects(){
    let projects = JSON.parse(localStorage.getItem('projects'));
    if(projects == null) return [];
    return projects.map(el => el = Project(el.name) );
}
export function getAllTodos(projectName){
    let todos = JSON.parse(localStorage.getItem(projectName));
    if(todos == null) return [];
    return todos.map(el => el = Todos(el.name, el.priority, el.date, el.done));   
}
export function getTodo(projectName, todoName){
    let todos = JSON.parse(localStorage.getItem(projectName));
    return todos.find(el => {return el.name == todoName});
}
export function addProjectStorage(project){
    const projectsArr = getProjects();  
    projectsArr.push(project);
    setStorage('projects',projectsArr);

}
export function removeProjectStorage(name){
    let projectsArr = getProjects();
    projectsArr = remove(projectsArr, (el) => {
        return el.name != name;
    })
    setStorage('projects', projectsArr);
    localStorage.removeItem(name);
}
export function addTodoStorage(todo, project){
    let todoArr = getAllTodos(project);
    todoArr.push(todo);
    setStorage(project, todoArr);
}
export function removeTodoStorage(name, project){
    let todoArr = getAllTodos(project);
    todoArr = remove(todoArr, (el) => {
        return el.name != name;
    })
    
    setStorage(project, todoArr);
}
export function editTodoStorage(project, oldName, todo){
    const todoArr = getAllTodos(project);
    const index = todoArr.findIndex(el => {return el.name==oldName});
    todoArr[index]['name'] = todo.name;
    todoArr[index]['priority'] = todo.priority;
    todoArr[index]['date'] = todo.date;
    setStorage(project, todoArr);
}

export function updateDoneTodo(project, todo, done){
    const todos = getAllTodos(project);
    todos.forEach(el => {
        if(el.name == todo)
            el.done = done;
    })
    setStorage(project, todos);
}