import { Link } from 'react-router-dom';
import './Project-Header.sass';

function Header() {
    return (
        <header className='project-header'>
            <div className="container">
                <div className="header-inner">
                    {/* <Link to='/'  e></Link> */}
                    <Link to='/ticube' className="logo"><span>ti</span>Cube</Link>
                    <Link to='/typest' className='logo'><span>ti</span>Ping</Link>
                </div>
            </div>
        </header>
    )
}

export default Header