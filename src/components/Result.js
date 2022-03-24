import { useEffect, useState } from "react";
import useAlert from './useAlert';
import firebase from '../data/fbConfig';
import Table from "./Table";
import { MainState } from "../context/Context";

const Result = () => {

    const { state, dispatch } = MainState();
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);
    const db = firebase.firestore();
    const { showAlert } = useAlert('error', () => {
        setError(true);
    });
    console.log(state);

    const getData = () => {
        db.collection('users').orderBy('createdAt').get().then((snapshot) => {
            setIsPending(false);
            setError(null);
            if (snapshot.empty && snapshot.metadata.fromCache) {
                throw new Error('Please check your connection');
            }
            if (!snapshot.docs.length) {
                dispatch({
                    type: 'RESET_USERS',
                    payload: null
                });
            } else {
                const results = [];
                snapshot.docs.forEach(doc => {
                    const { name, email, score, createdAt } = doc.data();
                    const created = createdAt.toDate();
                    results.push({name, email, score, created, id: doc.id});
                });
                dispatch({
                    type: 'ADD_USERS',
                    payload: results
                });
            }
        }).catch((err) => {
            setIsPending(false);
            dispatch({
                type: 'RESET_USERS',
                payload: null
            });
            console.log('get error name: ' + err.name + ' get error message: ' + err.message);
            showAlert(err);
        });
    }

    useEffect(() => {
        getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        dispatch({
            type: 'GET_LIST',
            payload: state.users
        });
    }, [dispatch, state.users]);

    const handleDelete = e => {
        setIsPending(true);
        dispatch({
            type: 'RESET_USERS',
            payload: []
        });
        const docID = e.target.getAttribute('id');
        db.collection('users').doc(docID).delete().then(() => {
            setIsPending(false);
            setError(false);
            getData();
        }).catch(err => {
            setIsPending(false);
            dispatch({
                type: 'RESET_USERS',
                payload: null
            });
            console.log('delete error name: ' + err.name);
            if (err.name !== 'TypeError') showAlert(err);
        });
    }

    const handleReload = () => {
        getData();
    }

    const handleSearch = (e) => {
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

    // const handleSearch = (e) => {
    //     const value = e.target.value;
    //     const filteredList = state.users.filter((item) => {
    //       return item.name.toLowerCase().includes(value.toLowerCase())
    //     });
    //     console.log(filteredList);
    //     if (value === "") {
    //         listDispatch({
    //             type: 'GET_LIST',
    //             payload: state.users
    //         });
    //     } else {
    //         setList(filteredList);
    //     }
    // };

    return (
        <div className="results">
            <div className="wrapper">
                {isPending && <div className="loader">Loading</div>}
                {error && <div className="error"><p>This page cannot be found...</p><button className="myBtn" onClick={handleReload}>Try again</button></div>}
                {(!state.users && !isPending) && (!error && <p>No users found.</p>)}
                {(!isPending && state.users) && <div>
                    <p className="title">All Results</p>
                    <Table list={state.list} handleDelete={handleDelete} handleSearch={handleSearch}/></div>}
            </div>
        </div>
    );
}

export default Result;