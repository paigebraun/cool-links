import '../styles/LinkGrid.css'
import Masonry, {ResponsiveMasonry} from "react-responsive-masonry"
import generatedSpace from '../assets/headimg_small.jpg'

const LinkGrid = () => {
    return(
        <ResponsiveMasonry columnsCountBreakPoints= {{350:1, 750: 2, 900: 3}} >
            <Masonry className='linkContainer'>
                <button className = "addLinkBtn"><i className='bx bx-plus-medical'></i></button>
                <a className = 'linkTag' href="https://www.generated.space" target="_blank">
                    <div className='link'>
                        <img src={generatedSpace} alt="Generated Space"/>
                        <h3>generated-space</h3>
                        <p>www.generated.space</p>
                    </div>
                </a>
            </Masonry>
        </ResponsiveMasonry>
    )
}

export default LinkGrid