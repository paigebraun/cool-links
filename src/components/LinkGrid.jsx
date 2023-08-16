import '../styles/LinkGrid.css'
import { useState } from 'react'
import Masonry from 'react-masonry-css'
import { v4 as uuidv4 } from 'uuid';

const LinkGrid = ({showEmpty, setShowEmpty, filteredList, setFilteredList, collections, selectCollection, savedLinks, setSavedLinks}) => {

    const [showAddLink, setShowAddLink] = useState(false);
    const [linkValue, setLinkValue] = useState('');
    const [dropSelection, setDropSelection] = useState('Recent');

    //Show add link box when add button clicked
    function handleAddLink() {
        const appDiv = document.querySelector('.appDiv');
        setShowAddLink(true);
        appDiv.className = 'appDiv blurAppDiv';
    }

    //Clear link when cancel button clicked
    function handleCancel() {
        const appDiv = document.querySelector('.appDiv');
        setLinkValue('');
        setShowAddLink(false);
        appDiv.className = 'appDiv';
    }

    //Show link value as user types it into the input on the add link box
    function handleChange(e) {
        setLinkValue(e.target.value);
    }

    //Validate URL
    function isValidURL(string) {
        var res = string.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
        return (res !== null)
    };

    //Add protocol to link if needed
    function getClickableLink(link) {
        return link.startsWith("http://") || link.startsWith("https://") ? link : `http://${link}`;
    };

    //Use Link Preview API to get link info
    function handleAdd() {
        let clickLink = getClickableLink(linkValue);
        if (isValidURL(clickLink)) {
            var data = { key: "920fb1aae8a530a3bbe743459af730a7", q: clickLink}

            fetch("https://api.linkpreview.net", {
                method: "POST",
                mode: "cors",
                body: JSON.stringify(data)
            })
                .then((res) => res.json())
                .then((response) => {
                    const newSavedLinks = savedLinks.concat({name: response.title, link: clickLink, img: response.image, collection: 'Recent', id: uuidv4() });
                    setSavedLinks(newSavedLinks);
                    setFilteredList(newSavedLinks);
                    handleCancel();
                    setLinkValue('');
                    localStorage.setItem("savedLinks", JSON.stringify(newSavedLinks));

                    //Hide empty screen message since we're adding a link
                    if (newSavedLinks.length !== 0) {
                        setShowEmpty(!showEmpty);
                        const emptyScreen = document.querySelector('.emptyScreen');
                        emptyScreen.classList = ["emptyScreen hide-empty"]
                    }
                })
        }
        else {
            console.log(linkValue, ' is an invalid link');
        }
    }

    //Delete a link
    function handleRemoveLink(e, id) {
        e.target.parentNode.parentNode.href = '';
        const newLinks = savedLinks.filter((savedLink) => savedLink.id !== id);
        setSavedLinks(newLinks); 
        setFilteredList(newLinks);
        if (newLinks.length === 0) {
            setShowEmpty(!showEmpty);
            const emptyScreen = document.querySelector('.emptyScreen');
            emptyScreen.classList = ["emptyScreen show-empty"]
        }

        localStorage.setItem("savedLinks", JSON.stringify(newLinks));
    }

    //Move a link to a different collection by using the dropdown (available on hover)
    function handleDropdown(e) {
        let parent = e.target.parentNode;
        if (parent.className == 'dropbtn') {
            parent = parent.parentNode;
        }
        parent.classList.toggle("active");
    }

    function handleDropdownSelection(e, id) {
        const newSavedLinks = [...savedLinks];
        let update = newSavedLinks.filter((e)=>e.id === id);
        update[0].collection = e.target.innerText;
        setSavedLinks(newSavedLinks);
        setFilteredList(newSavedLinks);
        setDropSelection(e.target.innerText);
        e.target.parentNode.parentNode.classList.toggle("active");

        localStorage.setItem("savedLinks", JSON.stringify(newSavedLinks));
    }

    //Breakpoints for masonry layout
    const breakpointColumnsObj = {
        default: 4,
        1100: 3,
        700: 2,
        500: 1
      };

    return(
        <>
            <Masonry breakpointCols={breakpointColumnsObj} className='my-masonry-grid' columnClassName='my-masonry-grid_column'>
                <button onClick={handleAddLink} className = "addLinkBtn"><i className='bx bx-plus-medical'></i></button>
                {filteredList.map((item) => {
                    return (
                        item.collection == {selectCollection}.selectCollection ? (
                            <div key={item.id} className='linkTag'>
                                <a className='link' href={item.link} target="_blank">
                                    <img src={item.img} />
                                    <h3>{item.name}</h3>
                                    <p>{item.link}</p>
                                </a>
                                <button onClick={(e) => handleRemoveLink(e, item.id)}className="deleteLink"><i className='bx bxs-trash'></i></button>
                                <div className='dropdown'>
                                    <button onClick={(e)=> handleDropdown(e)} className="dropbtn">{item.collection}<i className='bx bx-chevron-down'></i></button>
                                    <div className='dropdown-content'>
                                        <button onClick={(e)=>handleDropdownSelection(e, item.id)}>Recent</button>
                                        {collections.map((collection) => (
                                            <button onClick={(e)=>handleDropdownSelection(e, item.id)} key={collection.id}>{collection.name}</button>
                                        ))}
                                    </div>
                                </div>
                            </div>) : null
                    )
                })}
            </Masonry>
        <div className={showAddLink ? 'show-addLink blurBackground' : 'hide-addLink'}>
            <div className="addLink">
                <input placeholder='Enter a link...' value={linkValue} onChange={(e)=>handleChange(e)}></input>
                <button onClick={handleAdd}>Add</button>
                <button onClick={handleCancel}>Cancel</button>
            </div>
        </div>
        </>
    )
}

export default LinkGrid