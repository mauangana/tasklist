// define ui vars



// const form = document.querySelector('#task-form'),
// taskList = document.querySelector('.collection'),
// clearBtn = document.querySelector('.clear-tasks'),
// filter = document.querySelector('#filter'),
// taskInput = document.querySelector('#task');

const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');


// load all event listener
loadEventListeners(); // own function

// load all event listener

function loadEventListeners(){
    // DOM load event
    document.addEventListener('DOMContentLoaded', getTasks);
    // add task event
    form.addEventListener('submit', addTask);
    // remove task event
    taskList.addEventListener('click', removeTask);
    //clear task event
    clearBtn.addEventListener('click', clearTask);
    // filter task event
    filter.addEventListener('keyup', filterTask);
}


// get tasks from
function getTasks(){
    let tasks;

        if(localStorage.getItem('tasks') === null){
            tasks = [];
        }
        else{
            tasks = JSON.parse(localStorage.getItem('tasks'));
    
        }
        tasks.forEach(function(task){
            const li = document.createElement('li');
            li.className = 'collection-item';
            li.appendChild(document.createTextNode(task));
            const link = document.createElement('a');
            link.className = 'delete-item secondary-content';
            link.innerHTML = '<i class="far fa-trash-alt"></i>';
            li.appendChild(link);
            taskList.appendChild(li);
        });
     }
        
    


    // add task
    function addTask(e){

        if(taskInput.value ===''){
            alert('Add a task');
        }
        else {

    

        // create li element
        const li = document.createElement('li');
        // add class
        li.className = 'collection-item';
        // create a text node and append to li
        li.appendChild(document.createTextNode(taskInput.value));
        // create link
        const link = document.createElement('a');
        // add class
        link.className = 'delete-item secondary-content';
        // add icon
        link.innerHTML = '<i class="far fa-trash-alt"></i>';
        //append the link to li
        li.appendChild(link);
        // append li to ul
        taskList.appendChild(li);
        
        addInStorage(taskInput.value);
        
        taskInput.value = '';
    }
    e.preventDefault();


    }

    function addInStorage(task){
        if(localStorage.getItem('tasks') === null){
            tasks = [];
        }
        else{
            tasks = JSON.parse(localStorage.getItem('tasks'));
        }
    
        tasks.push(taskInput.value);
    
        localStorage.setItem('tasks',JSON.stringify(tasks));
    }

    // remove task
   function removeTask(e){
       if (e.target.parentElement.classList.contains('delete-item')){ // a tag
        if(confirm('are you sure?')){
            e.target.parentElement.parentElement.remove();

            /// remove from LS
            removeTaskFromLocalStorage(e.target.parentElement.parentElement);
        }
       } 
   }
   function removeTaskFromLocalStorage(taskItem){

    let tasks;
        if(localStorage.getItem('tasks') === null){
        tasks = [];
        }
        else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
        }
        
        tasks.forEach(function(task, index){
                if(taskItem.textContent === task){
                    tasks.splice(index, 1);

                }
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
   }




   function clearTask(e){
        taskList.innerHTML = '';

        // while(taskList.firstChild){
        //     taskList.removeChild(taskList.firstChild);

        //     localStorage.clear();
        // }

        // user defined function

        clearTaskFromLocalStorage();
   }

   function clearTaskFromLocalStorage(){
       localStorage.clear();
   }

   function filterTask(e){
       const text = e.target.value.toLowerCase();

       document.querySelectorAll('.collection-item').forEach(function(task){
            const item = task.firstChild.textContent;
            if(item.toLowerCase().indexOf(text) != -1){
                task.style.display = 'block';
            }
            else{
                task.style.display = 'none';
            }
       });
   }