import {useEffect, useState} from "react";
import axios from "axios";

const API_URL = 'http://localhost:8000/api/tasks'

function App() {

  const [tasks, setTasks] = useState([])

  useEffect(() => {
    GetTasks()
  }, [])

  const GetTasks = () => {
    axios
        .get(API_URL)
        .then((res) => {
          console.log(res.data)
          setTasks(res.data)
        })
        .catch((err) => {
          console.log(err)
        })
  }

  return (
    <div className='App'>
      <div className='container'>
        <h1>Cybertasks</h1>
        <div className='tasks'>
          {tasks.map(task => (
              <div className={'task ' + (task.complete ? 'is-complete': '')} key={task._id}>
                <div className='checkbox'></div>
                <div className='text'>
                  { task.text }
                </div>
                <div className='delete-task'>X</div>
              </div>
          ))}

        </div>
      </div>
    </div>
  )
}

export default App
