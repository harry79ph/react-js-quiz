import { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import useAlert from './useAlert';
import quizValues from './data/quizValues';
import firebase from './data/fbConfig';


const Quiz = ({ details, setDetails }) => {

    const db = firebase.firestore();
    const { options, correctAnswers, questions } = quizValues;
    const [isPending, setIsPending] = useState(false);
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
        setDetails(prev => ({ ...prev, score: userPoints, createdAt: timeStamp }));
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
        if (details !== null && details.score) {
            setIsPending(true);
            db.collection('users').add(details).then((snapshot) => {
                setIsPending(false);
                console.log(snapshot);
                showAlert(details.score);
                setDetails(null);
            }).catch((err) => {
                console.error("Error adding document: ", err);
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [details]);

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
                    {(details && !isPending) && <input className="myBtn" type="submit" value="Submit"/>}
                    {isPending && <button className="myBtn loader">Loading</button>}
                    {(!details && !isPending) && <Link to="/result" className="myBtn">See all results</Link>}
                </div>
            </form>
        </div>
    );
}

export default Quiz;