import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
import './styles/App.css'


import Header from './components/Header'
import SearchBar from './components/SearchBar'
import SideBar from './components/SideBar'
import LinkGrid from './components/LinkGrid'

let root = document.getElementById('root');

const initialCollections = [
  { name: "Video", id: uuidv4() },
  { name: "Programming", id: uuidv4() },
  { name: "Art", id: uuidv4() }
];

function App() {
  const [icon, setIcon] = useState('bx bxs-collection')
  const [show, setShow] = useState(false);
  const [selectCollection, setSelectCollection] = useState('Recent')

  function handleCollectionClick(collection, e) {
    if (e.target.className === 'collectionBtn'){
      const selected = document.querySelector('.selected');
      selected.classList.remove("selected");
      if (collection === 'Recent') {
        setSelectCollection('Recent');
        e.target.parentNode.classList = ["collection selected permanent"]
      }
      else {
        setSelectCollection(collection.name);
        e.target.parentNode.classList = ["collection selected"];
      }
    }
  }

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
    <SideBar show={show} handleCollectionClick={handleCollectionClick} selectCollection={selectCollection} setSelectCollection={setSelectCollection} initialCollections={initialCollections}/>
    <div className="appDiv">
      <Header handleBtn={handleBtn} setShow={setShow} icon={icon} show={show} selectCollection={selectCollection} />
      <SearchBar />
      <LinkGrid />
    </div>
    </>
  )
}

export default App
