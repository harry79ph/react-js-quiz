import { useEffect, useState } from "react";

const Table = ({ users, handleDelete }) => {

    const [order, setOrder] = useState([]);

    useEffect(() => {
        setOrder(users);
    }, [users]);

    const handleSort = (p) => {
        if (p === 'name') {
            setOrder(prev => [...prev].sort((a, b) => a.name > b.name ? 1 : -1));
        } else if (p === 'score') {
            setOrder(prev => [...prev].sort((a, b) => a.score - b.score));
        } else {
            setOrder(prev => [...prev].sort((a, b) => a.created.getTime() - b.created.getTime()));
        }
    }

    return (
        <div>
            <div className="button-wrapper">
                <span>Sort By:</span>
                <button className="myBtn" onClick={() => {handleSort('name')}}>name</button>
                <button className="myBtn" onClick={() => {handleSort('score')}}>score</button>
                <button className="myBtn" onClick={() => {handleSort('date')}}>date</button>
            </div>
            <table>
                <tbody>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Date</th>
                        <th>Score</th>
                    </tr>
                    {order.map((user) => (
                        <tr key={user.id}>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.created.toString().slice(0, 21)}</td>
                            <td className="score">{user.score}<button id={user.id} className="myBtn" onClick={handleDelete}>Delete User</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div> 
    );
}
 
export default Table;