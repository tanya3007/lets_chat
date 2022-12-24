import React, { useState } from 'react';
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from '../firebase';

const Search = () => {

  const [username, setusername] = useState("")
  const [user, setUser] = useState(null)
  const [err, setErr] = useState(false)

  const handleSearch = async () => {
    const q = query(
      collection(db, 'users'),
      where('displayName', '==', username)
      );
      
    try {
      console.log("hi")
      const querySnapshot = await getDocs(q);
      console.log("hi ho", querySnapshot.data());
      querySnapshot.forEach((doc) => {
        console.log("bye", doc);
        setUser(doc.data())
      });
    }

    catch (err) {
      console.log("tanya", err)
      setErr(true);
    }

  };

  const handleKey = e => {
    e.code === "Enter" && handleSearch();
  };

  return (
    <div className='search'>
      <div className='searchForm'>
        <input type="text" placeholder='Find a user' onKeyDown={handleKey} onChange={e => setusername(e.target.value)} />
      </div>
      {err && <span>User not found!</span>}
      {user && <div className="userChat">
        <img src={user.photoURL} alt="" />
        <div className="userChatInfo">
          <span>{user.displayName}</span>
        </div>
      </div>}
    </div>
  )
}

export default Search