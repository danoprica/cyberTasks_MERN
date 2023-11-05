import {useEffect, useState} from "react";
import axios from "axios";

const API_URL = 'http://localhost:8000/api/tasks'

function App() {

  const [text, setText] = useState('')
  const [tasks, setTasks] = useState([])
  const [popupActive, setPopupActive] = useState(false);


  useEffect(() => {
    getTasks()
  }, [])

  const getTasks = () => {
    axios
    .get(API_URL)
    .then((res) => {
      setTasks(res.data)
    })
    .catch((err) => {
      console.log(err)
    })
  }

  const deleteTask = async (id) => {
      axios
        .delete(API_URL + '/' + id)
        .then(() => {
            getTasks()
        }).catch((err) => {
            console.log(err)
      })
  }

  const updateTask = async (id) => {
    const updatedTask = tasks.find((data) => data._id === id)
    console.log(updatedTask)
    updatedTask.complete = updatedTask.complete !== true;
    axios
      .put(API_URL + '/' + id, updatedTask)
      .then(() => {
        getTasks()
      }).catch((err) => {
          console.log(err)
    })
  }

  const addTask = async() => {
    axios
      .post(API_URL, {text: text})
      .then(() => {
        getTasks()
      }).catch((err) => {
        console.log(err)
    })
  }



  return (
    <div className='App'>
      <div className='container'>
        <h1>Cybertasks</h1>

        <div className='tasks'>
          {tasks.map(task => (
              <div
                  key={task._id }
                  className={'task ' + (task.complete ? 'is-complete': '')}
                  onClick={() => updateTask(task._id)}
              >
                <div className='checkbox'></div>
                <div className='text'>
                  { task.text }
                </div>
                <div className='delete-task' onClick={() => deleteTask(task._id)}>X</div>
              </div>
          ))}
        </div>
      </div>
      <div className='addPopup' onClick={() => setPopupActive(true)}>+</div>
      {popupActive ? (
        <div className="popup">
          <div className="closePopup" onClick={() => setPopupActive(false)}>X</div>
          <div className="content">
            <h3>Add Task</h3>
            <input type="text" onChange={(e) => setText(e.target.value)} value={text} className="add-todo-input"/>
            <div className="button" onClick={addTask}>Create Task</div>
          </div>
        </div>
      ) : ''}
    </div>
  )
}

export default App
