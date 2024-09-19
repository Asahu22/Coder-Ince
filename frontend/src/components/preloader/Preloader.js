import './Preloader.css'
import ReactLoading from 'react-loading';

function Preloader() {
  return (
    <div className='loader'>
      <ReactLoading type='cylon' color='black' height={'10%'} width={'10%'} />
    </div>
  )
}

export default Preloader
