import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';
import '../index.css'


const Header = ({title}) => {
    return (
        <div>
            <header className='header'>
                <Link to='/'>Home</Link>
                <h3><Link to='/' style={{color: 'black'}}> {title ? title : 'No title supplied'}</Link></h3>
                <Link to='/users/saintpat97'>Profile</Link>
            </header>
        </div>
    )
}

Header.defaultProps = {
    title: 'Twitter',
}

export default Header