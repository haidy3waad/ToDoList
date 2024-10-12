let inputTask = document.getElementById("inp")
let btn = document.getElementById("btn")
let toDoTask = document.getElementById("toDoTask")
let getdata = document.getElementById('getdata')
let markImg = (document.getElementById('markImg'))
let deleteImg = (document.getElementById('deleteImg'))

btn.addEventListener("click", function () {

    let task = {
        title: inputTask.value,
        apiKey: "670a38aa60a208ee1fdd7982"

    }
    addTodo(task)


})

async function addTodo(task) {
    let result = await fetch("https://todos.routemisr.com/api/v1/todos", {
        method: 'post',
        body: JSON.stringify(task),
        headers: { 'content-type': 'application/json' }
    })

    let data = await result.json()
    if (data.message == "success") {
        getTodos()
    }


}
async function getTodos() {
    let result = await fetch("https://todos.routemisr.com/api/v1/todos/670a38aa60a208ee1fdd7982")

    let data = await result.json()
    if (data.message == 'success') {
        displayData(data.todos)
    }

}
getTodos()
function displayData(data) {
    let cartona = ``
    for (let i = 0; i < data.length; i++) {
        cartona += `

 <div class="tasks d-flex justify-content-between my-3  rounded-3 w-75 m-auto align-items-center py-2 px-3 shadow"> 
                <div class="task ">
                    <p class="m-0 p-0 ${data[i].completed ? 'text-decoration-line-through' : ''}">${data[i].title}</p>
                </div>
                <div class="icons ">
                    <i onclick="markCompleted('${data[i]._id}')" class="fa-solid fa-circle-check ${data[i].completed ? 'd-none' : ''}"></i>
                <i onclick="deleteTodo('${data[i]._id}')" class="fa-solid fa-trash"></i>

                </div>
            </div>

`
    }
    toDoTask.innerHTML = cartona
}


async function deleteTodo(id) {
    let result = await fetch("https://todos.routemisr.com/api/v1/todos", {
        method: 'delete',
        body: JSON.stringify({ todoId: id }),
        headers: { 'content-type': 'application/json' }
    })

    let data = await result.json()
    if (data.message == "success") {
        getTodos()
        moveBoxd()
    }
}
async function markCompleted(id) {
    let result = await fetch("https://todos.routemisr.com/api/v1/todos", {
        method: 'put',
        body: JSON.stringify({ todoId: id }),
        headers: { 'content-type': 'application/json' }
    })

    let data = await result.json()
    if (data.message == "success") {
        getTodos()
        moveBox()

    }

}


function moveBox() {
    getdata.style.transform = 'translateX(-150px)'
    markImg.style.display = 'block'
    deleteImg.style.display = 'none'

    getTodos()
}
function moveBoxd() {
    getdata.style.transform = 'translateX(-150px)'
    deleteImg.style.display = 'block'
    markImg.style.display = 'none'
    getTodos()
}








