import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import CreateAccountForm from './components/CreateAccountForm'
import HorizontalExample from './components/HorizontalFormExample'
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <CreateAccountForm />
    </div>
  )
}

export default App
