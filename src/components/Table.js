import { MainState } from "../context/Context";

const Table = ({ handleDelete }) => {

    const { state, dispatch } = MainState();

    return (
        <div>
            <div className="button-wrapper">
                <span>Sort By:</span>
                <button className="myBtn" onClick={() => {dispatch({
                    type: 'SORT_USERS',
                    payload: 'name'
                })}}>name</button>
                <button className="myBtn" onClick={() => {dispatch({
                    type: 'SORT_USERS',
                    payload: 'score'
                })}}>score</button>
                <button className="myBtn" onClick={() => {dispatch({
                    type: 'SORT_USERS',
                    payload: 'date'
                })}}>date</button>
            </div>
            <table>
                <tbody>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Date</th>
                        <th>Score</th>
                    </tr>
                    {state.users.map((user) => (
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