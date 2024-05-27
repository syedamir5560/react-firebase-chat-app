import React from 'react'
import './chat.css'

function Chat() {
  return (
    <div className='chat'>
      <div className="top">
        <div className="user">
          <img src="./avatar.png" alt="" />
          <div className="texts">
            <span>John deo</span>
            <p>Lorem, ipsum dolor.</p>
          </div>
         
        </div>
        <div className="icons">
            <img src="./phone.png" alt="phone" />
            <img src="./video.png" alt="vedio" />
            <img src="./info.png" alt="info" />
          </div>

      </div>
      <div className="center">

      </div>
      <div className="bottom">
        <div className="icons">
          <img src="./img.png" alt="" />
          <img src="./camera.png" alt="" />
          <img src="./mic.png" alt="" />
        </div>
        <input type="text" placeholder="Type a message"/>
        <div className="emoji">
          <img src="./emoji.png" alt="" />
        </div>

        <button className='sendButton'>Send</button>
      </div>
    </div>
  )
}

export default Chat