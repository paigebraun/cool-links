import '../styles/SearchBar.css'

const SearchBar = () => {
    return(
        <div className="searchBar">
            <i className='bx bx-search'></i>
            <input type="text" className="searchInput" placeholder="Search"></input>
        </div>
    )
}

export default SearchBar