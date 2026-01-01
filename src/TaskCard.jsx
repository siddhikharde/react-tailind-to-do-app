import React, { useState } from 'react'
import { Trash } from 'lucide-react'

function TaskCard({ task, deleteTask }) {
  const [isChecked, setIsChecked] = useState(false)

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked)
  }

  return (
    <div className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-md shadow">
      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          checked={isChecked}
          onChange={handleCheckboxChange}
          className="h-5 w-5 text-indigo-600 rounded focus:ring-indigo-500"
        />
        <p className={`${isChecked ? 'line-through text-gray-400' : 'text-gray-900 dark:text-gray-100'}`}>{task}</p>
      </div>
      <button
        onClick={deleteTask}
        className="p-2 rounded-md text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
        aria-label="Delete task"
      >
        <Trash className="w-5 h-5 cursor-pointer" />
      </button>
    </div>
  )
}

export default TaskCard

