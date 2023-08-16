import { useEffect } from 'react';
import '../styles/EmptyScreen.css'

const EmptyScreen = ({initialLinks, showEmpty, setShowEmpty}) => {

    //Show empty screen when loading if nothing in local storage saved links
    useEffect(() => {
        console.log(initialLinks)
        if (initialLinks.length === 0) {
            setShowEmpty(!showEmpty);
            const emptyScreen = document.querySelector('.emptyScreen');
            emptyScreen.classList = ["emptyScreen show-empty"]
        }
    }, [])

    const message  = 'Nothing to see here.\nTry adding a link.';

    return (
        <div className="emptyScreen hide-empty">
            <i className='bx bx-link'></i>
            <p>{message}</p>
        </div>
    )
}

export default EmptyScreen