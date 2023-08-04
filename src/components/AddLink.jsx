import '../styles/AddLink.css'
import Masonry, {ResponsiveMasonry} from "react-responsive-masonry"
import generatedSpace from '../assets/headimg_small.jpg'

const AddLink = () => {
    return(
        <ResponsiveMasonry columnsCountBreakPoints= {{350:1, 750: 2, 900: 3}} >
            <Masonry className='linkContainer'>
                <button className = "addLinkBtn"><i className='bx bx-plus-medical'></i></button>
                <div className='link'>
                    <img src={generatedSpace} alt="Generated Space"/>
                    <h3>generated-space</h3>
                    <p>www.generate-space.com</p>
                </div>
            </Masonry>
        </ResponsiveMasonry>
    )
}

export default AddLink