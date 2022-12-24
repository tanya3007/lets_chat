import React from 'react';
import IconButton from '@mui/material/IconButton';
import ImageIcon from '@mui/icons-material/Image';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import SendIcon from '@mui/icons-material/Send';

const Input = () => {
  return (
    <div className='input'>
      <input type="text" placeholder='Type something..... ' />
      <div className="send">
        <IconButton>
          <ImageIcon/>
        </IconButton>
        <input type="file" style={{display:'none'}} id="file"/>
        <label htmlFor="file">
        <IconButton>
          <AttachFileIcon/>
        </IconButton>
        </label>
        <IconButton style={{color:'#8da4f1'}}>
          <SendIcon/>
        </IconButton>

      </div>
    </div>
  )
}

export default Input