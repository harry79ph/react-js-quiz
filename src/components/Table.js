import { useEffect, useRef } from "react";
import { MainState } from "../context/Context";

const Table = ({ list, handleSearch, handleDelete }) => {

    const { dispatch } = MainState();
    const searchRef = useRef();

    useEffect(() => {
        setTimeout(() => {
            searchRef.current.focus();
        }, 1000);
    });

    return (
        <div>
            <div className="list-control">
                <div className="search-section">
                    <label htmlFor="search">Search By Name: </label>
                    <input id="search" type="text" ref={searchRef} onChange={handleSearch}/>
                </div>
                <div className="sort-buttons">
                    <span>Sort By:</span>
                    <button className="myBtn" onClick={() => {dispatch({
                        type: 'SORT_USERS',
                        payload: 'date'
                    })}}>date</button>
                    <button className="myBtn" onClick={() => {dispatch({
                        type: 'SORT_USERS',
                        payload: 'name'
                    })}}>name</button>
                    <button className="myBtn" onClick={() => {dispatch({
                        type: 'SORT_USERS',
                        payload: 'score'
                    })}}>score</button>
                </div>
            </div>
            <table>
                <tbody>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Date</th>
                        <th>Score</th>
                    </tr>
                    {list.map((user) => (
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