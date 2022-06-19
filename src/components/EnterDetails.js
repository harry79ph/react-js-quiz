import { useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { MainState } from '../context/Context';

const EnterDetails = () => {

    const { dispatch } = MainState();
    const history = useHistory();
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
        history.push('/details/quiz');
    }

    return (
        <div className="enter-details">
            <div className="create animate__animated animate__fadeInRight">
                <h3>Name and Email fields are required</h3>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            id="name"
                            required
                            ref={inputRef}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            required
                            id="email"
                            type="text"
                        ></input>
                    </div>
                    <div className="buttons">
                        <input type="submit" className="myBtn" value="Submit"></input>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default EnterDetails;