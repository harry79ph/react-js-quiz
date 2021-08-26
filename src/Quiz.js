import { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import useAlert from './useAlert';
import quizValues from './quizValues';
import firebase from './fbConfig';


const Quiz = ({ details, setDetails }) => {

    const { options, correctAnswers, questions } = quizValues;
    const [isPending, setIsPending] = useState(false);
    const history = useHistory();
    const { showAlert } = useAlert('question', () => {
        history.push('/result');
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
        if (details !== null && details.score) {
            const db = firebase.firestore();
            setIsPending(true);
            db.collection('users').add(details).then((snapshot) => {
                setIsPending(false);
                console.log(snapshot);
                console.log("Document written with ID: ", snapshot.id);
                showAlert(details.score);
            }).catch((err) => {
                console.error("Error adding document: ", err);
            });
            if (details !== null) setDetails(null);
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
                            <div className="question">
                                <p>{q.question}</p>
                                {q.selections.map((selection, i) => {
                                    return (
                                        <div className="selection">
                                            <input type="radio" name={'q' + index} defaultValue={options[i]} required="required" />
                                            <label>{selection}</label>
                                        </div>
                                    );
                                })}
                            </div>
                        );
                    })}
                </div>
                <div className="button-group">
                    {details && <input className="myBtn" type="submit"/>}
                    {(isPending && isPending) && <button className="myBtn loader">Loading</button>}
                    {(!details && !isPending) && <Link to="/result" className="myBtn">See all results</Link>}
                </div>
            </form>
        </div>
    );
}

export default Quiz;