const inputValue = document.getElementById("inputValue");
const addButton = document.querySelector(".btn");
const displaySection = document.querySelector(".todo-list-elem");

const getToDoListLocal = () => {
    return JSON.parse(localStorage.getItem('toDoLists'));
}

const updatedLocalStorage = (localToDoLists) => {
    return localStorage.setItem("toDoLists", JSON.stringify(localToDoLists));
}

let localToDoLists = getToDoListLocal() || [];

const addToDoDynamicElement = (currElem) => {
    const divElement = document.createElement('div');
    divElement.classList.add('todo-list-elem');
    divElement.innerHTML = `<li>${currElem}</li> <button class="deleteToDo">Remove</button>`; 
    displaySection.append(divElement);
}

const addToDoList = (e) => {
    e.preventDefault();
    const toDoListValue = inputValue.value.trim();
    inputValue.value = '';

    if(toDoListValue != '' && !localToDoLists.includes(toDoListValue)) {    
        localToDoLists.push(toDoListValue);
        localToDoLists = [ ...new Set(localToDoLists)];
        localStorage.setItem("toDoLists", JSON.stringify(localToDoLists).toLowerCase());
        addToDoDynamicElement(toDoListValue);
    } else {
        alert("Duplication/Invalid input");
    }
}

const showToDoListLocal = () => {
    localToDoLists.forEach((currElem) => {
        addToDoDynamicElement(currElem);
    });
}

const removeElement = (e) => {
    const toDoRemove = e.target;
    const toDoListContent = toDoRemove.previousElementSibling.innerText;
    const parentElem = toDoRemove.parentElement;
    localToDoLists = localToDoLists.filter((currTodo) => {
        return currTodo != toDoListContent.toLowerCase();
    });
    updatedLocalStorage(localToDoLists);  
    parentElem.remove();
}

showToDoListLocal();

displaySection.addEventListener(('click'), (e) => {
    e.preventDefault();
    if (e.target.classList.contains('deleteToDo')) {
        removeElement(e)
    }
});

addButton.addEventListener(('click'), (e) => {
    addToDoList(e);
});