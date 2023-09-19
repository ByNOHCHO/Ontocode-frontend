import styles from './App.module.css'
import { Routes, Route } from 'react-router-dom'
import PricePage from './components/pages/PricePage/Price'
import Header from './components/Header/Header'
import Home from './components/pages/HomePage/Home'

function App() {

  return (
    <div>
      <div className={styles.app}>
        <Header />
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/Price' element={<PricePage />} />
        </Routes>
      </div>
    </div>
  )
}

export default App
