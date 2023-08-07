import '../styles/LinkGrid.css'
import { useState } from 'react'
import Masonry, {ResponsiveMasonry} from "react-responsive-masonry"
import generatedSpace from '../assets/headimg_small.jpg'
import fidenza from '../assets/tyler-hobbs-fidenza-612.png'
import { v4 as uuidv4 } from 'uuid';

const LinkGrid = () => {

    const initialLinks = [
        { name: "generated-space", link: "www.generated.space", img: generatedSpace, collection: "Recent", id: uuidv4() },
        { name: "Fidenza-Tyler Hobbs", link: "www.tylerxhobbs.com/fidenza", img: fidenza, collection: "Recent", id: uuidv4() }
    ]

    const [showAddLink, setShowAddLink] = useState(false);
    const [linkValue, setLinkValue] = useState('');
    const [savedLinks, setSavedLinks] = useState(initialLinks);

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

    //Use Link Preview API to get link info
    function handleAdd() {
        console.log('linkValue', linkValue);
        var data = { key: "920fb1aae8a530a3bbe743459af730a7", q: "https://" + linkValue}

        fetch("https://api.linkpreview.net", {
            method: "POST",
            mode: "cors",
            body: JSON.stringify(data)
        })
            .then((res) => res.json())
            .then((response) => {
                const newSavedLinks = savedLinks.concat({name: response.title, link: linkValue, img: response.image, id: uuidv4() });
                setSavedLinks(newSavedLinks);
                handleCancel();
                setLinkValue('');
            })
    }

    return(
        <>
        <ResponsiveMasonry  columnsCountBreakPoints= {{350:1, 750: 2, 900: 3}} >
            <Masonry>
                <button onClick={handleAddLink} className = "addLinkBtn"><i className='bx bx-plus-medical'></i></button>
                {savedLinks.map((savedLink) => (
                    <a key={savedLink.id} className='linkTag' href={'https://' + savedLink.link} target="_blank">
                        <div className='link'>
                            <img src={savedLink.img} />
                            <h3>{savedLink.name}</h3>
                            <p>{savedLink.link}</p>
                        </div>
                    </a>
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