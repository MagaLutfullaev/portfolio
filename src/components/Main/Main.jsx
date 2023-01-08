import { Link } from 'react-router-dom';
import Header from '../Header/Header';
import './Main.sass';

function Main() {
    return (
        <div className='main'>
            <Header />
            <Link to={'/ticube'} >Ticube</Link>
        </div>
    )
}

export default Main;