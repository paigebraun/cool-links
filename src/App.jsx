import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
import './styles/App.css'

//Import components
import Header from './components/Header'
import SearchBar from './components/SearchBar'
import SideBar from './components/SideBar'
import LinkGrid from './components/LinkGrid'
import EmptyScreen from './components/EmptyScreen'

import generatedSpace from './assets/headimg_small.jpg'
import fidenza from './assets/tyler-hobbs-fidenza-612.png'

let root = document.getElementById('root');

const initialCollections = [
  { name: "Video", id: uuidv4() },
  { name: "Programming", id: uuidv4() },
  { name: "Art", id: uuidv4() }
];

const initialLinks = [
  { name: "generated-space", link: "www.generated.space", img: generatedSpace, collection: "Recent", id: uuidv4() },
  { name: "Fidenza-Tyler Hobbs", link: "www.tylerxhobbs.com/fidenza", img: fidenza, collection: "Recent", id: uuidv4() }
]

function App() {
  const [icon, setIcon] = useState('bx bxs-collection');
  const [show, setShow] = useState(false);
  const [selectCollection, setSelectCollection] = useState('Recent');
  const [collections, setCollections] = useState(initialCollections);
  const [savedLinks, setSavedLinks] = useState(initialLinks);
  const [showEmpty, setShowEmpty] = useState(false);

  //Handle user click on sidbar (selecting a collection)
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

  //Handle button click for hide and show sidebar
  function handleBtn() {
      if (icon == 'bx bxs-collection') {
          setIcon('bx bx-chevrons-left');
          root.style.gridTemplateColumns = '1fr 2fr';
      } else {
          setIcon('bx bxs-collection');
          root.style.gridTemplateColumns = '1fr'
      }
    }

    //Search bar functionality
    const [filteredList, setFilteredList] = useState(savedLinks);
    const [searchQuery, setSearchQuery] = useState('');

    function handleSearch(event) {
        const query = event.target.value;
        setSearchQuery(query);

        //Only search current collection we're in
        const collectionList = savedLinks.filter((item) => {
            return item.collection === selectCollection;
        });

        const searchList = collectionList.filter((item) => {
            return item.name.toLowerCase().indexOf(query.toLowerCase()) !== -1;
        });

        setFilteredList(searchList);

        //Reset to view all links in a collection when search is empty
        if (query == '') {
          setFilteredList(savedLinks);
        }
    }


  return (
    <>
    <SideBar show={show} handleCollectionClick={handleCollectionClick} selectCollection={selectCollection} setSelectCollection={setSelectCollection} collections={collections} setCollections={setCollections}/>
    <div className="appDiv">
      <Header handleBtn={handleBtn} setShow={setShow} icon={icon} show={show} selectCollection={selectCollection} />
      <SearchBar searchQuery={searchQuery} handleSearch={handleSearch} />
      <LinkGrid showEmpty={showEmpty} setShowEmpty={setShowEmpty} filteredList={filteredList} setFilteredList={setFilteredList} collections={collections} selectCollection={selectCollection} savedLinks={savedLinks} setSavedLinks={setSavedLinks} />
      <EmptyScreen />
    </div>
    </>
  )
}

export default App
