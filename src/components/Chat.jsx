import React, { useContext } from 'react';
import VideoCameraFrontIcon from '@mui/icons-material/VideoCameraFront';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import IconButton from '@mui/material/IconButton';
import Messages from './Messages';
import Input from './Input';
import { ChatContext } from '../context/ChatContext';


const Chat = () => {
  const { data } = useContext(ChatContext);
  // console.log("chat/jsx ", data)
  return (
    <div className='chat'>
      <div className="chatInfo">
        <span style={{ "display": "flex" }}>
          <img src={data.user?.photoURL} style={{ "height": "24px", "width": "24px", "borderRadius": "50px", "objectFit": "cover", 'marginRight': "10px" }} alt="" />
          {data.user?.displayName}
        </span>
        <div className="chatIcons">
          <IconButton>
            <VideoCameraFrontIcon />
          </IconButton>
          <IconButton>
            < PersonAddIcon />
          </IconButton>
          <IconButton>
            <MoreHorizIcon />
          </IconButton>
        </div>
      </div>
      <Messages />
      <Input />
    </div>
  )
}

export default Chat