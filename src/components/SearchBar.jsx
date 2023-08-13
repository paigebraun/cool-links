import '../styles/SearchBar.css'

const SearchBar = ({searchQuery, handleSearch}) => {

    return(
        <div className="searchBar">
            <i className='bx bx-search'></i>
            <input type="text" value={searchQuery} className="searchInput" placeholder="Search" onChange={handleSearch}></input>
        </div>
    )
}

export default SearchBar