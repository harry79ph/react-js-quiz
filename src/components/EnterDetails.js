import { useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { MainState } from '../context/Context';

const EnterDetails = () => {

    const { state, dispatch } = MainState();
    const history = useHistory();

    useEffect(() => {
        if (state.details !== null) {
           dispatch({
            type: 'RESET_ALL',
            payload: null
           });
        }
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
            <div className="create">
                <h2>Please fill in the form</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Name</label>
                        <input
                            type="text"
                            id="name"
                            required
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