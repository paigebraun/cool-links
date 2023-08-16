import { useState } from 'react'
import './styles/App.css'

//Import components
import Header from './components/Header'
import SearchBar from './components/SearchBar'
import SideBar from './components/SideBar'
import LinkGrid from './components/LinkGrid'
import EmptyScreen from './components/EmptyScreen'

let root = document.getElementById('root');

const initialLinks = JSON.parse(localStorage.getItem("savedLinks") || "[]");
const initialCollections = JSON.parse(localStorage.getItem("collections") || "[]");

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
      <EmptyScreen initialLinks={initialLinks} showEmpty={showEmpty} setShowEmpty={setShowEmpty} />
    </div>
    </>
  )
}

export default App
