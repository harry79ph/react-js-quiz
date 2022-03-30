import { useEffect } from "react";
import Table from "./Table";
import { MainState } from "../context/Context";
import useFirebase from './useFirebase';

const Result = () => {

    const { state, dispatch } = MainState();
    const { checkConnection, getUsers, deleteUser, isPending, error } = useFirebase();

    useEffect(() => {
        checkConnection();
        getUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (state.users) dispatch({ type: 'GET_LIST', payload: state.users });
    }, [dispatch, state.users]);

    const handleDelete = e => {
        const docID = e.target.getAttribute('id');
        deleteUser(docID);
    }

    const handleSearch = e => {
        const value = e.target.value;
        if (value === "") {
            dispatch({
                type: 'GET_LIST',
                payload: state.users
            });
        } else {
            dispatch({
                type: 'FILTER_LIST',
                payload: value
            });
        }
    };

    return (
        <div className="results">
            <div className="wrapper animate__animated animate__fadeInRight">
                {isPending && <div className="loader">Loading</div>}
                {error && <div className="error"><p>This page cannot be found...</p><button className="myBtn" onClick={() => getUsers()}>Try again</button></div>}
                {(!state.users && !isPending) && (!error && <p>No users found.</p>)}
                {(!isPending && state.users) && <div>
                    <p className="title">All Results</p>
                    <Table list={state.list} handleDelete={handleDelete} handleSearch={handleSearch}/></div>}
            </div>
        </div>
    );
}

export default Result;