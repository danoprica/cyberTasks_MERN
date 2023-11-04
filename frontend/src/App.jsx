function App() {

  return (
    <div className='App'>
      <h1>Task manager</h1>


      <div className='todos'>
        <div className='todo'>
          <div className='checkbox'></div>
          <div className='text'>
            cacat
          </div>
          <div className='delete-todo'>X</div>
        </div>
      </div>

      <div className='todos'>
        <div className='todo is-complete'>
          <div className='checkbox'></div>
          <div className='text'>
            cacat
          </div>
          <div className='delete-todo'>X</div>
        </div>
      </div>
    </div>
  )
}

export default App
