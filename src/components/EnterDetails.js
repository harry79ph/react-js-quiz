import { useEffect, useRef, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { MainState } from '../context/Context';

const EnterDetails = () => {

    const { dispatch } = MainState();
    const history = useHistory();
    const [animate, setAnimate] = useState("animate__fadeInRight");
    const inputRef = useRef();

    useEffect(() => {
        dispatch({ type: 'RESET_ALL', payload: null });
        setTimeout(() => {
            inputRef.current.focus();  
        }, 1000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleSubmit = e => {
        e.preventDefault();
        dispatch({
            type: 'ADD_DETAILS',
            payload: { name: e.target.name.value.trim(), email: e.target.email.value.trim() }
        });
        setTimeout(() => {
            history.push('/details/quiz');
        }, 1000);
        setAnimate("animate__fadeOutLeft");
    }

    return (
        <div className="enter-details">
            <div className={"create animate__animated " + animate}>
                <h2>Please fill in the form</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Name</label>
                        <input
                            type="text"
                            id="name"
                            required
                            ref={inputRef}
                        />
                    </div>
                    <div className="form-group">
                        <label>Email</label>
                        <input
                            required
                            id="email"
                            type="text"
                        ></input>
                    </div>
                    <div className="buttons">
                        <input type="submit" className="myBtn" value="Submit"></input>
                        <Link to="/" className="myBtn">Cancel</Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default EnterDetails;