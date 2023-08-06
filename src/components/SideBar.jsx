import '../styles/SideBar.css'
import { useState, useRef, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

const SideBar = ({show, handleCollectionClick, initialCollections, setSelectCollection}) => {

    const [showInput, setShowInput] = useState(false);
    const [collections, setCollections] = useState(initialCollections);
    const [inputValue, setInputValue] = useState('');

    const inputReference = useRef(null);

    function handleInput() {
        setShowInput(true);
    }

    function handleChange(event) {
        setInputValue(event.target.value);
    }

    function handleAdd() {
        const newCollections = collections.concat({name: inputValue, id: uuidv4() });
        console.log(newCollections);
        setCollections(newCollections);
        setShowInput(false);
        setInputValue('');
    }

    function handleRemove(e, id) {
        const permanent = document.querySelector('.permanent');
        if (e.target.parentNode.parentNode.classList.contains('selected')) {
            //set selected to recent
            setSelectCollection('Recent');
            permanent.classList = ["collection selected permanent"]
        }
        const newCollections = collections.filter((collection) => collection.id !== id);
        setCollections(newCollections); 
    }

    useEffect(() => {
        inputReference.current.focus();
    });

    useEffect(() => {
        const timeout = setTimeout(() => {
            if (inputValue !== '') {
                handleAdd();
            }
        }, 2000)

        return () => clearTimeout(timeout)
    }, [inputValue])

    return (
        <div className={show ? 'show-class' : 'hide-class'}>
            <div className="collectionsAdd">
                <p>COLLECTIONS</p>
                <button className="collectionsAddBtn" onClick={handleInput}><i className='bx bxs-plus-circle'></i></button>
            </div>
            <div className="collections">
                <div onClick={(e) => handleCollectionClick("Recent", e)} className={"collection selected permanent"}>
                    <button className="collectionBtn">Recent</button>
                </div>
                {collections.map((collection) => (
                    <div key={collection.id} onClick={(e) => handleCollectionClick(collection, e)} className="collection">
                        <button className="collectionBtn">{collection.name}</button>
                        <button onClick={(e) => handleRemove(e, collection.id)} className="deleteCollection"><i className='bx bxs-trash'></i></button>
                    </div>
                ))}
                <input ref={inputReference} onChange={handleChange} value= {inputValue} className={showInput ? 'show-input collectionInput' : 'hide-input'} placeholder='Enter name...'></input>
            </div>
        </div>
    )
}

export default SideBar