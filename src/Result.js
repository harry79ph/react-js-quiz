import { useEffect, useState } from "react";
import useAlert from './useAlert';
import firebase from './fbConfig';

const Result = () => {

    const [users, setUsers] = useState([]);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);
    const db = firebase.firestore();
    const { showAlert } = useAlert('error', () => {
        setError(true);
    });

    const getData = () => {
        db.collection('users').get().then((snapshot) => {
            setIsPending(false);
            setError(null);
            if (snapshot.empty && snapshot.metadata.fromCache) {
                throw new Error('Please check your connection');
            }
            console.log(snapshot.docs.length);
            if (!snapshot.docs.length) {
                setUsers(null);
            } else {
                snapshot.docs.forEach(doc => {
                    const { name, email, score, createdAt } = doc.data();
                    const created = createdAt.toDate().toString().slice(0, 21);
                    setUsers((prev) => [
                        ...prev,
                        { name, email, score, created, id: doc.id }
                    ]);
                    console.log(doc.data());
                });
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
        console.log(e);
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
    console.log(users);

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
                    <table>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Date</th>
                            <th>Score</th>
                        </tr>
                        {users.map((user, key) => (
                            <tr key={key}>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.created}</td>
                                <td className="score">{user.score}<button id={user.id} className="myBtn" onClick={handleDelete}>Delete User</button></td>
                            </tr>
                        ))}
                    </table></div>}
            </div>
        </div>
    );
}

export default Result;