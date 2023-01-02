import React, { useContext, useState } from 'react';
import { collection, query, where, getDocs, getDoc, serverTimestamp, doc, setDoc, updateDoc } from "firebase/firestore";
import { db } from '../firebase';
import { AuthContext } from '../context/AuthContext';
import { ChatContext } from '../context/ChatContext';

const Search = () => {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);
  const [err, setErr] = useState(false);
  const { dispatch } = useContext(ChatContext);
  
  const { currentUser } = useContext(AuthContext)

  const handleSearch = async () => {
    const q = query(
      collection(db, 'users'),
      where('displayName', '==', username)
    );
      
    try {
      const querySnapshot = await getDocs(q);
      if(querySnapshot.size > 0){
        querySnapshot.forEach((doc) => {
          setUser(doc.data());
        });
      }
      else{
        throw "username not found."
      }
    }

    catch (e) {
      setErr(true);
    }

  };

  const handleKey = e => {
    e.code === "Enter" && handleSearch();
  };

  const handleSelect = async () => {
    //check whether the group (chats in firestore) exists, if not create new one
    const combinedId = currentUser.uid > user.uid
      ? currentUser.uid + user.uid
      : user.uid + currentUser.uid;
    console.log("currentUser Search : ", currentUser.uid)
    console.log("user Search : ", user.uid)
    console.log("comparison Search : ", currentUser.uid > user.uid)
    console.log("combinedId : ", combinedId)
    try {
      // create a chat in chats collection
      const res = await getDoc(doc(db, "chats", combinedId));
      if (!res.exists()) {
        // create chat in chats collection
        await setDoc(doc(db, "chats", combinedId), { messages: [] });
        //create user chats
        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [combinedId + ".userInfo"]:
          {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL
          },
          [combinedId + ".date"]: serverTimestamp()
        });

        await updateDoc(doc(db, "userChats", user.uid), {
          [combinedId + ".userInfo"]:
          {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL
          },
          [combinedId + ".date"]: serverTimestamp()
        });
      }
    }
    catch (e) { console.log("handleSelect catch : ", e) }
    console.log("lol user", user);
    dispatch({type:"CHANGE_USER", payload: user})
    setUser(null);
    setUsername("");
    //create user chats
  };

  return (
    <div className='search'>
      <div className='searchForm'>
        <input type="text" placeholder='Find a user'
          onKeyDown={handleKey}
          onChange={e => {
            setUsername(e.target.value);
            setErr(false);
            setUser(null);
          }}
          value={username} />
      </div>
      {err && <span>User not found!</span>}
      {user && <div className="userChat" onClick={handleSelect}>
        <img src={user.photoURL} alt="" />
        <div className="userChatInfo">
          <span>{user.displayName}</span>
        </div>
      </div>}
    </div>
  )
}

export default Search