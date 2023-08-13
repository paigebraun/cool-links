import '../styles/EmptyScreen.css'

const EmptyScreen = () => {

    const message  = 'Nothing to see here.\nTry adding a link';

    return (
        <div className="emptyScreen hide-empty">
            <i className='bx bx-link'></i>
            <p>{message}</p>
        </div>
    )
}

export default EmptyScreen