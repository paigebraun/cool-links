import '../styles/SideBar.css'

const SideBar = ({show, handleCollectionClick, selectCollection, setSelectCollection, collections}) => {

    return (
        <div className={show ? 'show-class' : 'hide-class'}>
            <div className="collectionsAdd">
                <p>COLLECTIONS</p>
                <button className="collectionsAddBtn"><i className='bx bxs-plus-circle'></i></button>
            </div>
            <div className="collections">
                <div onClick={(e) => handleCollectionClick("Recent", e)} className={"collection selected permanent"}>
                    <button className="collectionBtn">Recent</button>
                    <button className="deleteCollection"><i className='bx bxs-trash'></i></button>
                </div>
                {collections.map((collection) => (
                    <div key={collection.id} onClick={(e) => handleCollectionClick(collection, e)} className="collection">
                        <button className="collectionBtn">{collection.name}</button>
                        <button className="deleteCollection"><i className='bx bxs-trash'></i></button>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default SideBar