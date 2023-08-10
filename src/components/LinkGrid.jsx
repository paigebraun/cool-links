import '../styles/LinkGrid.css'
import { useState } from 'react'
import Masonry, {ResponsiveMasonry} from "react-responsive-masonry"
import generatedSpace from '../assets/headimg_small.jpg'
import fidenza from '../assets/tyler-hobbs-fidenza-612.png'
import { v4 as uuidv4 } from 'uuid';

const LinkGrid = ({collections}) => {

    const initialLinks = [
        { name: "generated-space", link: "www.generated.space", img: generatedSpace, collection: "Recent", id: uuidv4() },
        { name: "Fidenza-Tyler Hobbs", link: "www.tylerxhobbs.com/fidenza", img: fidenza, collection: "Recent", id: uuidv4() }
    ]

    const [showAddLink, setShowAddLink] = useState(false);
    const [linkValue, setLinkValue] = useState('');
    const [savedLinks, setSavedLinks] = useState(initialLinks);
    const [dropSelection, setDropSelection] = useState('Recent');

    function handleAddLink() {
        const appDiv = document.querySelector('.appDiv');
        setShowAddLink(true);
        appDiv.className = 'appDiv blurAppDiv';
    }

    function handleCancel() {
        const appDiv = document.querySelector('.appDiv');
        setShowAddLink(false);
        appDiv.className = 'appDiv';
    }

    function handleChange(e) {
        setLinkValue(e.target.value);
    }

    //Validate URL
    function isValidURL(string) {
        var res = string.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
        return (res !== null)
    };

    //Use Link Preview API to get link info
    function handleAdd() {
        console.log('linkValue', linkValue);
        if (isValidURL(linkValue)) {
            var data = { key: "920fb1aae8a530a3bbe743459af730a7", q: linkValue}

            fetch("https://api.linkpreview.net", {
                method: "POST",
                mode: "cors",
                body: JSON.stringify(data)
            })
                .then((res) => res.json())
                .then((response) => {
                    const newSavedLinks = savedLinks.concat({name: response.title, link: linkValue, img: response.image, collection: {dropSelection}, id: uuidv4() });
                    setSavedLinks(newSavedLinks);
                    handleCancel();
                    setLinkValue('');
                })
        }
        else {
            console.log('invalid');
        }
    }

    function handleRemoveLink(e, id) {
        e.target.parentNode.parentNode.href = '';
        const newLinks = savedLinks.filter((savedLink) => savedLink.id !== id);
        setSavedLinks(newLinks); 
    }

    function handleDropdown(e) {
        let parent = e.target.parentNode;
        if (parent.className == 'dropbtn') {
            parent = parent.parentNode;
        }
        parent.classList.toggle("active");
    }

    function handleDropdownSelection(e, savedLink) {
        savedLink.collection = e.target.innerText;
        setDropSelection(e.target.innerText);
        e.target.parentNode.parentNode.classList.toggle("active");
    }

    return(
        <>
        <ResponsiveMasonry  columnsCountBreakPoints= {{350:1, 750: 2, 900: 3}} >
            <Masonry>
                <button onClick={handleAddLink} className = "addLinkBtn"><i className='bx bx-plus-medical'></i></button>
                {savedLinks.map((savedLink) => (
                    <div key={savedLink.id} className='linkTag'>
                        <a className='link' href={'https://' + savedLink.link} target="_blank">
                            <img src={savedLink.img} />
                            <h3>{savedLink.name}</h3>
                            <p>{savedLink.link}</p>
                        </a>
                        <button onClick={(e) => handleRemoveLink(e, savedLink.id)}className="deleteLink"><i className='bx bxs-trash'></i></button>
                        <div className='dropdown'>
                            <button onClick={(e)=> handleDropdown(e)} className="dropbtn">{savedLink.collection}<i className='bx bx-chevron-down'></i></button>
                            <div className='dropdown-content'>
                                <button onClick={(e)=>handleDropdownSelection(e, savedLink)}>Recent</button>
                                {collections.map((collection) => (
                                    <button onClick={(e)=>handleDropdownSelection(e, savedLink)} key={collection.id}>{collection.name}</button>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </Masonry>
        </ResponsiveMasonry>
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