import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import quizValues from '../data/quizValues';
import { MainState } from '../context/Context';
import useFirebase from '../customhooks/useFirebase';


const Quiz = () => {

    const { state, dispatch } = MainState();
    const { options, correctAnswers, questions } = quizValues;
    const { animate, getTimeStamp, checkConnection, addUser, isPending } = useFirebase();

    function onSubmit(e) {
        e.preventDefault();
        const userAnswers = [e.target.q0.value, e.target.q1.value, e.target.q2.value, e.target.q3.value];
        const now = new Date();
        const timeStamp = getTimeStamp(now);
        let counter = 0;
        userAnswers.forEach((answer, i) => {
            if (answer === correctAnswers[i]) counter++;
        });
        const userPoints = (counter / correctAnswers.length) * 100;
        dispatch({
            type: 'ADD_DETAILS',
            payload: { score: userPoints, createdAt: timeStamp }
        });
    }

    useEffect(() => {
        checkConnection();
    },[checkConnection]);

    useEffect(() => {
        addUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state.details]);

    return (
        <div className={"quiz animate__animated " + animate }>
            <h4>You will get 25 points for each correct answer. At the end of the Quiz, your total score will be displayed. Maximum score is 100 points.</h4>
            <form onSubmit={onSubmit}>
                <div className="questions">
                    {questions.map((q, index) => {
                        return (
                            <div className="question" key={'q'+q.id}>
                                <p>{q.question}</p>
                                {q.selections.map((selection, i) => {
                                    return (
                                        <div className="selection" key={'q' + index + i}>
                                            <input type="radio" name={'q' + index} id={'q' + index + i} defaultValue={options[i]} required="required" />
                                            <label htmlFor={'q' + index + i}>{selection}</label>
                                        </div>
                                    );
                                })}
                            </div>
                        );
                    })}
                </div>
                <div className="button-group">
                    {(state.details && !isPending) && <input className="myBtn" type="submit" value="Submit"/>}
                    {isPending && <button className="myBtn loader">Loading</button>}
                    {(!state.details && !isPending) && <Link to="/result" className="myBtn">See all results</Link>}
                </div>
            </form>
        </div>
    );
}

export default Quiz;