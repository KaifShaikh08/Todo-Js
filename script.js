const InputTodo = document.querySelector("#InputTodo")
const submitBtn = document.querySelector("#submit-btn")
const mainUl = document.querySelector("ul")
const Search = document.querySelector(".search-input")



const getTodoFromLocal = () => {
    return JSON.parse(localStorage.getItem("TodoItems"))
}
let todo = getTodoFromLocal() || []

const loadTodoDynamically = (currElem) => {
    const li = document.createElement("li")
    li.classList.add("list-group-item", "d-flex", "justify-content-between", "align-items-center")
    
    const span = document.createElement("span")
    span.innerHTML = currElem
    
    const i = document.createElement("i")
    i.classList.add("far", "fa-trash-alt", "delete")
    
    li.append(span, i) 
    li.addEventListener("click",(e) => {
        li.classList.toggle("completed")

    })
    
    mainUl.append(li)
}


const addTodo = (e) => {
    e.preventDefault()
    const TodoValue = InputTodo.value.trim()
    if(TodoValue !== "" && !todo.includes(TodoValue)){

        
        todo.push(TodoValue)
        todo = [...new Set(todo)]
        
        localStorage.setItem("TodoItems", JSON.stringify(todo) )
        
        loadTodoDynamically(TodoValue)
        
        
    }
    InputTodo.value = ""
}


const showTodo = () => {
    
    todo.forEach((currElem) => {
        loadTodoDynamically(currElem)
    })
}

showTodo()

const removeTodo = (e) => {
    if(e.target.classList.contains("delete")) {
        
        const todoToRemove = e.target;
        let todoListContent = todoToRemove.previousElementSibling.innerText;
        todo = todo.filter((currTodo) => {
            return currTodo.toLowerCase() !== todoListContent.toLowerCase()
        })
        // console.log(todo)
        localStorage.setItem("TodoItems",JSON.stringify(todo))
        todoToRemove.parentElement.remove()
    }
}

const SearchFilterTodo = (e) => {
    const query = e.target.value.toLowerCase()
    let LiElem = mainUl.querySelectorAll('li')
    LiElem.forEach((li) => {
        const todoText = li.querySelector("span").innerText.toLowerCase();
        if(todoText.includes(query)){
            li.classList.remove("filtered")
        }
        else{
        li.classList.add("filtered")
    }
    if(query === "" ) {
        li.classList.remove("filtered")
    }
})
}



mainUl.addEventListener("click",removeTodo)
Search.addEventListener("keyup",(e) => {
    e.preventDefault()
    SearchFilterTodo(e)
})
submitBtn.addEventListener("click",addTodo)