import {useEffect, useState} from "react";
import axios from "axios";


function App() {

  const [text, setText] = useState('')
  const [tasks, setTasks] = useState([])
  const [popupActive, setPopupActive] = useState(false);


  useEffect(() => {
    getTasks()
  }, [])

  const getTasks = () => {
    axios
    .get('api/tasks')
    .then((res) => {
      setTasks(res.data)
    })
    .catch((err) => {
      console.log(err)
    })
  }

  const deleteTask = async (id) => {
      axios
        .delete('api/tasks' + '/' + id)
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
      .put('api/tasks' + '/' + id, updatedTask)
      .then(() => {
        getTasks()
      }).catch((err) => {
          console.log(err)
    })
  }

  const addTask = async() => {
    axios
      .post('api/tasks', {text: text})
      .then(() => {
        setText('')
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
          <div className="closePopup" onClick={() => {setPopupActive(false); setText('')}}>X</div>
          <div className="content">
            <input type="text" onChange={(e) => setText(e.target.value)} value={text} className="add-task-input"/>
            <div className="button" onClick={addTask}>Add Task</div>
          </div>
        </div>
      ) : ''}
    </div>
  )
}

export default App
