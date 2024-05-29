import React, { useState } from 'react'
import './chat.css'
import EmojiPicker from 'emoji-picker-react'

function Chat() {
  let [open, setOpen] = useState(false)
  let [text, setText] = useState("")

  let handleemoji = (e) => {
    setText((perv) => perv + e.emoji)
    setOpen(false)
  }
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
        <div className="message">
          <img src="./avatar.png" alt="" />
          <div className="texts">
            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eius
              a autem quaerat inciduntve!
            </p>
            <span>1 min ago!</span>
          </div>
        </div>

        <div className="message own">

          <div className="texts">
            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eius
              a autem quaerat inciduntve!
            </p>
            <span>1 min ago!</span>
          </div>
        </div>

        <div className="message">
          <img src="./avatar.png" alt="" />
          <div className="texts">
            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eius
              a autem quaerat inciduntve!
            </p>
            <span>1 min ago!</span>
          </div>
        </div>

        <div className="message own">
          <div className="texts">
            <img src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmVhY2h8ZW58MHx8MHx8fDA%3D" alt="" />
            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eius
              a autem quaerat inciduntve!
            </p>
            <span>1 min ago!</span>
          </div>
        </div>

        <div className="message">
          <img src="./avatar.png" alt="" />
          <div className="texts">
            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eius
              a autem quaerat inciduntve!
            </p>
            <span>1 min ago!</span>
          </div>
        </div>
      </div>
      <div className="bottom">
        <div className="icons">
          <img src="./img.png" alt="" />
          <img src="./camera.png" alt="" />
          <img src="./mic.png" alt="" />
        </div>
        <input type="text" value={text} placeholder="Type a message" onChange={(e) => setText(e.target.value)} />
        <div className="emoji">
          <img src="./emoji.png" alt="" onClick={() => setOpen((perv) => !perv)} />
          <div className="picker">
            <EmojiPicker open={open} onEmojiClick={handleemoji} />
          </div>
        </div>

        <button className='sendButton'>Send</button>
      </div>
    </div>
  )
}

export default Chat