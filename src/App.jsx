import { useState } from 'react'
import './styles/App.css'

import Header from './components/Header'
import SearchBar from './components/SearchBar'
import SideBar from './components/SideBar'
import AddLink from './components/AddLink'

let root = document.getElementById('root');

function App() {
  const [icon, setIcon] = useState('bx bxs-collection')
  const [show, setShow] = useState(false);

  function handleBtn() {
      if (icon == 'bx bxs-collection') {
          setIcon('bx bx-chevrons-left');
          root.style.gridTemplateColumns = '1fr 2fr';
      } else {
          setIcon('bx bxs-collection');
          root.style.gridTemplateColumns = '1fr'
      }
    }
  return (
    <>
    <SideBar show={show}/>
    <div className="appDiv">
      <Header handleBtn={handleBtn} setShow={setShow} icon={icon} show={show}/>
      <SearchBar />
    </div>
    </>
  )
}

export default App
