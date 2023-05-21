import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

function App() {
  const [count, setCount] = useState(0);
  const [show, setShow] = useState('');
  const [toggle, setToggle] = useState(false);
  function clickCount() {
    setCount(count => count + 1);
  }

  function clickshow() {
    setToggle(true);
  }

  function handleEvent(e: any) {
    setShow(e.target.value);
  }

  return (
    <>
      <button onClick={clickCount}>Count {count}</button> <br />
      <input type="text" name='txt' onChange={handleEvent} />
      <button onClick={clickshow} >show</button>
      <div>{toggle && show}</div>
    </>
  )
}

export default App
