import { Link } from 'react-router-dom';

const Navbar = () => {

    const handleClick = e => {
        const buttons = document.querySelectorAll('.nav-wrapper a');
        const clicked = e.target.className;
        if (e.target.tagName === 'A') {
            buttons.forEach((button) => {
                button.className === clicked ? button.classList.add('active') : button.classList.remove('active');
            });
        }
    }

    // useEffect(() => {
    //     const navBar = document.querySelector('.nav-wrapper');
    //     navBar.addEventListener('click', handleClick);
    //     function handleClick(e) {
    //         const buttons = document.querySelectorAll('.nav-wrapper a');
    //         const clicked = e.target.className;
    //         console.log(clicked);
    //         if (e.target.tagName === 'A') {
    //             buttons.forEach((button) => {
    //                 button.className === clicked ? button.classList.add('active') : button.classList.remove('active');
    //             });
    //         }
    //     }
    //     return () => navBar.removeEventListener('click', handleClick);
    // }, []);

    return (
        <nav className="nav-wrapper" onClick={handleClick}>
            <Link className="home-btn" to="/">Home</Link>
            <ul className="side-menu">
                <li className="">
                    <Link className="quiz-btn" to="/details">Start Quiz</Link>
                </li>
                <li className="">
                    <Link className="results-btn" to="/result">Results</Link>
                </li>
            </ul>
        </nav>
    );
}

export default Navbar;