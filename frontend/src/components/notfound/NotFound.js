import usePageTitle from '../../hooks/usePageTitle';
import './NotFound.css'

const NotFound = () => {

    usePageTitle("Not Found")

    return (
        <>
        <p className='not-found-header'>OOPS THE PAGE YOU ARE LOOKING FOR DOES NOT EXIST!</p>
        </>
    )
}

export default NotFound;