import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Header from './Header/Header'
import Footer from './Footer/Footer'
<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap');
</style>
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Header></Header>
    <div className='test'></div>
    <Footer></Footer>
    </>
  )
}

export default App
