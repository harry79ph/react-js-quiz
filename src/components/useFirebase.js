import { useState } from "react";
import { useHistory } from "react-router-dom";
import { MainState } from "../context/Context";
import firebase from "../data/fbConfig";
import useAlert from "./useAlert";

const useFirebase = () => {

    const { state, dispatch } = MainState();
    const [isPending, setIsPending] = useState(false);
    const [error, setError] = useState(null);
    const history = useHistory();
    const db = firebase.firestore();
    const { showAlert: showQuestion } = useAlert("question", () => history.push("/result"));
    const { showAlert: showErr } = useAlert("error", () => history.push("/"));

    const getTimeStamp = (time) => {
        return firebase.firestore.Timestamp.fromDate(time);
    };

    const checkConnection = () => {
        db.collection("users").get()
        .then((ss) => {
            if (ss.empty && ss.metadata.fromCache) {
                throw new Error("Please check your connection");
            }
        })
        .catch((err) => {
            showErr(err);
        });
    };

    const addUser = () => {
        if (state.details && state.details.score >= 0) {
        setIsPending(true);
        db.collection("users").add(state.details).then((snapshot) => {
            setIsPending(false);
            showQuestion(state.details.score);
            dispatch({
                type: 'RESET_DETAILS',
                payload: null
            });
            }).catch((err) => {
            console.error("Error adding document: ", err);
            });
        }
    };

    const getUsers = () => {
        setIsPending(false);
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
            setError(true);
            dispatch({
                type: 'RESET_USERS',
                payload: null
            });
            console.log('get error name: ' + err.name + ' get error message: ' + err.message);
            showErr(err);
        });
    }

    const deleteUser = (docID) => {
        dispatch({
            type: 'RESET_USERS',
            payload: []
        });
        db.collection('users').doc(docID).delete().then(() => {
            setIsPending(false);
            setError(false);
            getUsers();
        }).catch(err => {
            setIsPending(false);
            dispatch({
                type: 'RESET_USERS',
                payload: null
            });
            console.log('delete error name: ' + err.name);
            setError(true);
            if (err.name !== 'TypeError') showErr(err);
        });
    }
    return { isPending, error, checkConnection, getTimeStamp, addUser, getUsers, deleteUser };
};

export default useFirebase;