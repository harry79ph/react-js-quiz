import { useEffect, useState } from "react";
import useAlert from './useAlert';
import firebase from './data/fbConfig';
import Table from "./Table";

const Result = () => {

    const [users, setUsers] = useState([]);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);
    const db = firebase.firestore();
    const { showAlert } = useAlert('error', () => {
        setError(true);
    });

    const getData = () => {
        db.collection('users').orderBy('createdAt').get().then((snapshot) => {
            setIsPending(false);
            setError(null);
            if (snapshot.empty && snapshot.metadata.fromCache) {
                throw new Error('Please check your connection');
            }
            if (!snapshot.docs.length) {
                setUsers(null);
            } else {
                const results = [];
                snapshot.docs.forEach(doc => {
                    const { name, email, score, createdAt } = doc.data();
                    const created = createdAt.toDate();
                    results.push({name, email, score, created, id: doc.id});
                });
                setUsers(results);
            }
        }).catch((err) => {
            setIsPending(false);
            setUsers(null);
            console.log('get error name: ' + err.name + ' get error message: ' + err.message);
            showAlert(err);
        });
    }

    useEffect(() => {
        getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleDelete = e => {
        setIsPending(true);
        setUsers([]);
        const docID = e.target.getAttribute('id');
        db.collection('users').doc(docID).delete().then(() => {
            setIsPending(false);
            setError(false);
            getData();
        }).catch(err => {
            setIsPending(false);
            setUsers(null);
            console.log('delete error name: ' + err.name);
            if (err.name !== 'TypeError') showAlert(err);
        });
    }
    //console.log(users);

    const handleReload = () => {
        getData();
    }

    return (
        <div className="results">
            <div className="wrapper">
                {isPending && <div className="loader">Loading</div>}
                {error && <div className="error"><p>This page cannot be found...</p><button className="myBtn" onClick={handleReload}>Try again</button></div>}
                {(!users && !isPending) && (!error && <p>No users found.</p>)}
                {(!isPending && users) && <div>
                    <p className="title">All Results</p>
                    <Table users={users} handleDelete={handleDelete}/></div>}
            </div>
        </div>
    );
}

export default Result;