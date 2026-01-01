import React, { useEffect, useState } from 'react'
import { Moon, Plus } from 'lucide-react'
import TaskCard from './Taskcard.jsx'
import { toast } from 'react-hot-toast'
import noTask from './assets/noTask.jpg'

function App() {
  const [tasks, setTasks]=useState([]);
  const [newTask , setNewTask]=useState("");
const date=new Date().toDateString();
const [isDarkMode, setIsDarkMode] = useState(false);

  // We'll toggle Tailwind's `dark` class on the root wrapper


useEffect(() => {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  setTasks(tasks);
  setIsDarkMode(JSON.parse(localStorage.getItem('isDarkMode')) || false);
}, []);

useEffect(() => {
  localStorage.setItem('isDarkMode', JSON.stringify(isDarkMode));
}, [isDarkMode]);

const addTask=()=>{
  if(newTask.trim()==""){
    toast.error('Enter a valid task!');
    return;
  } 
  else{
 setTasks([newTask,...tasks ]);
  localStorage.setItem('tasks',JSON.stringify([newTask,...tasks ]));
  setNewTask("");
   toast.success('Task added successfully!');
  
    }
}
const deleteTask=(taskToDelete)=>{
  const updatedTasks=tasks.filter((tasks)=>tasks!==taskToDelete);
  setTasks (updatedTasks);
  toast.success('Task deleted successfully!');
  localStorage.setItem('tasks',JSON.stringify(updatedTasks));
}


  return (
    <div className={isDarkMode ? 'dark' : ''}>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors">
        <div className="mx-auto max-w-3xl px-6 py-8">
          <header className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold">My Tasks</h1>
              <p className="text-sm text-gray-600 dark:text-gray-400">{date}</p>
            </div>
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-2 rounded-md bg-transparent hover:bg-gray-200 dark:hover:bg-gray-800"
              aria-label="Toggle dark mode"
            >
              <Moon className="w-5 h-5" />
            </button>
          </header>

          <p className="mb-6 italic text-gray-600 dark:text-gray-400">"The way to get started is to quit talking and begin doing."</p>

          <div className="flex gap-2 mb-4">
            <input
              type="text"
              className="flex-1 p-3 rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 placeholder-gray-400 text-sm"
              placeholder="Add a Task"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              onKeyUp={(e) => {
                if (e.key === 'Enter') addTask()
              }}
            />
            <button onClick={addTask} className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md">
              <Plus /> Add
            </button>
          </div>

          <div className="mb-6">
            <input
              type="text"
              className="w-full p-3 rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 placeholder-gray-400 text-sm"
              placeholder="Search a Task"
              onKeyUp={(e) => {
                const searchTerm = e.target.value.toLowerCase()
                const filteredTasks = JSON.parse(localStorage.getItem('tasks')) || []
                if (searchTerm === '') {
                  setTasks(filteredTasks)
                } else {
                  setTasks(filteredTasks.filter((task) => task.toLowerCase().includes(searchTerm)))
                }
              }}
              onChange={(e) => {
                const searchTerm = e.target.value.toLowerCase()
                const filteredTasks = JSON.parse(localStorage.getItem('tasks')) || []
                if (searchTerm === '') {
                  setTasks(filteredTasks)
                } else {
                  setTasks(filteredTasks.filter((task) => task.toLowerCase().includes(searchTerm)))
                }
              }}
            />
          </div>

          <section>
            {tasks.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12">
                <p className="mb-4 text-gray-600 dark:text-gray-400 italic">No tasks available. Please add a task.</p>
                <img src={noTask} alt="No Tasks" className="w-48 h-48 object-contain" />
              </div>
            ) : (
              <div className="space-y-3">
                {tasks.map((task, index) => (
                  <TaskCard task={task} key={index} deleteTask={() => deleteTask(task)} />
                ))}
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  )
}

export default App