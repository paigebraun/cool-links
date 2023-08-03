import '../styles/SideBar.css'

const SideBar = ({show}) => {
    return (
        <div className={show ? 'show-class' : 'hide-class'}>
            <div className="collectionsAdd">
                <p>COLLECTIONS</p>
                <button className="collectionsAddBtn"><i className='bx bxs-plus-circle'></i></button>
            </div>
            <div className="collections">
            <div className="collection">
                    <button className="collectionBtn">Recent</button>
                    <button className="deleteCollection"><i className='bx bxs-trash'></i></button>
                </div>
                <div className="collection">
                    <button className="collectionBtn">Video</button>
                    <button className="deleteCollection"><i className='bx bxs-trash'></i></button>
                </div>
                <div className="collection">
                    <button className="collectionBtn">Programming</button>
                    <button className="deleteCollection"><i className='bx bxs-trash'></i></button>
                </div>
                <div className="collection">
                    <button className="collectionBtn">Art</button>
                    <button className="deleteCollection"><i className='bx bxs-trash'></i></button>
                </div>
            </div>
        </div>
    )
}

export default SideBar