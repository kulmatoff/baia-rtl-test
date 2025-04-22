import { useState } from 'react';

export const UserForm = () => {
    const [user, setUser] = useState("");
    const [show, setShow] = useState("");

    return (
        <div>
            <h3 className='rotate'>卐</h3>
            <input placeholder='Input your name' value={user} onChange={(e) => setUser(e.target.value)}/>
            <button onClick={() => {setShow(user)}}>Submit</button>
            <p>{show}</p>
        </div>
    )
}