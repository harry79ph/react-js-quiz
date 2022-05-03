import EnterDetails from './EnterDetails';

const Home = () => {

    return (
        <main>
            <div className="home animate__animated animate__fadeInLeftBig">
                <h2>Welcome to JS Quiz</h2>
                <p>Please fill in the form then you can start the quiz by clicking Submit button. Good luck!!</p>
            </div>
            <EnterDetails />
        </main>
    );
}

export default Home;