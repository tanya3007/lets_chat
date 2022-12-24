import React from 'react';
import VideoCameraFrontIcon from '@mui/icons-material/VideoCameraFront';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import IconButton from '@mui/material/IconButton';
import Messages from './Messages';
import Input from './Input';


const Chat = () => {
  return (
    <div className='chat'>
      <div className="chatInfo">
        <span>Rishit</span>
        <div className="chatIcons">
          <IconButton>
            <VideoCameraFrontIcon/>
            </IconButton>
            <IconButton>
            < PersonAddIcon/>
            </IconButton>
            <IconButton>
            <MoreHorizIcon/>
          </IconButton>
        </div>
      </div>
      <Messages/>
      <Input/>
    </div>
  )
}

export default Chat