import React, { useContext, useState } from 'react';
import IconButton from '@mui/material/IconButton';
import ImageIcon from '@mui/icons-material/Image';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import SendIcon from '@mui/icons-material/Send';
import { arrayUnion, doc, serverTimestamp, Timestamp, updateDoc } from 'firebase/firestore';
import { AuthContext } from '../context/AuthContext';
import { ChatContext } from '../context/ChatContext';
import { db, storage } from '../firebase';
import { v4 as uuid } from "uuid";
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';

const Input = () => {
  const [text, setText] = useState("")
  const [img, setImg] = useState(null)


  const { currentUser } = useContext(AuthContext)
  const { data } = useContext(ChatContext)

  const handleSend = async () => {
    if (img) {
      const storageRef = ref(storage, uuid());
      const uploadTask = uploadBytesResumable(storageRef, img);
      uploadTask.on(
        'state_changed',
        {
          'error': (err) => {
            console.log("Error - uploadTaskOn : ", err);
            // setErr(true);
          },
          'complete': () => { // on-complete
            getDownloadURL(uploadTask.snapshot.ref)
              .then(async (downloadURL) => {
                await updateDoc(doc(db, 'chats', data.chatId),
                  {
                    messages: arrayUnion({
                      id: uuid(),
                      text,
                      senderId: currentUser.uid,
                      date: Timestamp.now(),
                      img: downloadURL,

                    })
                  })
                  .catch(e => console.log("err - getDownloadURL", e));
              });
          }
        }
      );
    }
    else {
      await updateDoc(doc(db, 'chats', data.chatId),
        {
          messages: arrayUnion({
            id: uuid(),
            text,
            senderId: currentUser.uid,
            date: Timestamp.now(),

          })
        })
    }
    await updateDoc(doc(db, "userChats", currentUser.uid),
      {
        [data.chatId + ".lastMessage"]:
        {
          text
        },
        [data.chatId + ".date"]: serverTimestamp()
      }
    )

    await updateDoc(doc(db, "userChats", data.user.uid), {
      [data.chatId + ".lastMessage"]:
      {
        text
      },
      [data.chatId + ".date"]: serverTimestamp()
    })

    setText("");
    setImg(null);
  }
  return (
    <div className='input'>
      <input type="text" placeholder='Type something..... ' onChange={e => setText(e.target.value)} value={text} />
      <div className="send">
        <IconButton component="label">
          <input hidden accept="image/*" type="file" onChange={e => setImg(e.target.files[0])} />
          <ImageIcon />
        </IconButton>
        {/* <input type="file" style={{ display: '' }} id="file" onChange={e => setImg(e.target.files)} /> */}
        <label htmlFor="file">
          <IconButton>
            <AttachFileIcon />
          </IconButton>
        </label>
        <IconButton onClick={handleSend} style={{ color: '#8da4f1' }}>
          <SendIcon />
        </IconButton>

      </div>
    </div>
  )
}

export default Input