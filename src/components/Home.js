import { Link } from 'react-router-dom';

const Home = () => {

    return (
        <div className="home animate__animated animate__fadeInUp">
            <h2>Welcome to JS Quiz</h2>
            <p>Please click on Start Quiz button and fill in the form then you can start the quiz. Good luck!!</p>
            <Link to="/details" className="myBtn">Start Quiz</Link>
        </div>
    );
}

export default Home;