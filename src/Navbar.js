import { NavLink } from 'react-router-dom';

const Navbar = () => {

    return (
        <nav className="nav-wrapper">
            <NavLink activeClassName="active" exact to="/">Home</NavLink>
            <ul className="side-menu">
                <li>
                    <NavLink activeClassName="active" to="/details">Quiz</NavLink>
                </li>
                <li>
                    <NavLink activeClassName="active" to="/result">Results</NavLink>
                </li>
            </ul>
        </nav>
    );
}

export default Navbar;