import { useState, useEffect } from "react"

export const App = () => {
  const [input, setInput] = useState("")
  const [priority, setPriority] = useState("medium")
  const [tasks, setTasks] = useState([])

  const firebaseUrl = "https://todoapp07-29497-default-rtdb.firebaseio.com/tasks"

  // Fetch tasks when page load
  useEffect(() => {
    const loadTasks = async () => {
      const res = await fetch(`${firebaseUrl}.json`)
      const data = await res.json()
      if (!data) return
      const loaded = Object.keys(data).map((key) => ({ id: key, ...data[key] }))
      setTasks(loaded)
    }
    loadTasks()
  }, [])

  // Add task
  const handleFormInput = async (e) => {
    e.preventDefault()
    if (!input.trim()) return

    const newTask = {
      done: false,
      priority,
      input: input.trim(),
      time: new Date().toLocaleString(),
    }

    const res = await fetch(`${firebaseUrl}.json`, {
      method: "POST",
      body: JSON.stringify(newTask),
      headers: { "Content-Type": "application/json" },
    })
    const data = await res.json()

    setTasks((prev) => [...prev, { id: data.name, ...newTask }])
    setInput("")
  }

  // Mark done/undo (sirf local change)
  const done = (id) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, done: !task.done } : task
      )
    )
  }

  // Delete task
  const del = async (id) => {
    await fetch(`${firebaseUrl}/${id}.json`, { method: "DELETE" })
    setTasks((prev) => prev.filter((task) => task.id !== id))
  }

  return (
    <>
      <div className="todo-layout min-h-screen w-full bg-black flex items-center justify-center">
        <div className="todo-section h-[40rem] w-[40rem] bg-white rounded-2xl p-5 overflow-y-auto">
          <h2 className="text-center text-3xl mt-2">Todo App</h2>

          {/* Form */}
          <form onSubmit={handleFormInput} className="form-section">
            <div className="input-section flex items-center justify-center mt-5 gap-5">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                type="text"
                placeholder="Enter your Task"
                className="border p-3 text-xl w-[20rem]"
              />
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="border p-3 text-xl"
              >
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
              <button type="submit" className="btn border p-3 text-xl bg-yellow-400">
                Add Task
              </button>
            </div>
          </form>

          {/* Tasks */}
          <div className="tasks mt-5">
            {tasks.map((task) => (
              <div
                key={task.id}
                className="item flex justify-between items-center px-5 py-3 border-b"
              >
                <div className="left-side">
                  <h2
                    className={`text-xl ${
                      task.done ? "line-through text-gray-500" : ""
                    }`}
                  >
                    {task.input}
                  </h2>
                  <div className="priority text-sm text-gray-600">
                    {task.priority} | <span className="italic">{task.time}</span>
                  </div>
                </div>
                <div className="right-side flex gap-3">
                  <button
                    onClick={() => done(task.id)}
                    className="bg-green-600 px-4 py-2 rounded-2xl text-white"
                  >
                    {task.done ? "Undo" : "Done"}
                  </button>
                  <button
                    onClick={() => del(task.id)}
                    className="bg-red-600 px-5 py-2 rounded-2xl text-white"
                  >
                    Del
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
