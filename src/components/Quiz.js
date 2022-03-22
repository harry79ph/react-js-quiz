import { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import useAlert from './useAlert';
import quizValues from '../data/quizValues';
import firebase from '../data/fbConfig';
import { MainState } from '../context/Context';


const Quiz = () => {

    const { state, dispatch } = MainState();
    const { options, correctAnswers, questions } = quizValues;
    const [isPending, setIsPending] = useState(false);
    const db = firebase.firestore();
    const history = useHistory();
    const { showAlert } = useAlert('question', () => {
        history.push('/result');
    });
    const { showAlert: showErr } = useAlert('error', () => {
        history.push('/');
    });

    function onSubmit(e) {
        e.preventDefault();
        const userAnswers = [e.target.q0.value, e.target.q1.value, e.target.q2.value, e.target.q3.value];
        const now = new Date();
        const timeStamp = firebase.firestore.Timestamp.fromDate(now);
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
        db.collection('users').get().then((ss) => {
            if (ss.empty && ss.metadata.fromCache) {
                throw new Error('Please check your connection');
            }
        }).catch(err => {
            showErr(err);
        });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    useEffect(() => {
        if (state.details && state.details.score >= 0) {
            setIsPending(true);
            db.collection('users').add(state.details).then((snapshot) => {
                setIsPending(false);
                showAlert(state.details.score);
                dispatch({
                    type: 'RESET_DETAILS',
                    payload: null
                });
            }).catch((err) => {
                console.error("Error adding document: ", err);
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state.details]);

    return (
        <div className="quiz">
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