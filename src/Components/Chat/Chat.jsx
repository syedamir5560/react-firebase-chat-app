import React, { useEffect, useRef, useState } from 'react'
import './chat.css'
import EmojiPicker from 'emoji-picker-react'
import { doc, getDoc, onSnapshot, updateDoc } from 'firebase/firestore'
import { db } from '../../Lib/firebase'
import { useChatStore } from '../../Lib/chatStore'
import { arrayUnion } from 'firebase/firestore/lite'
import { useUserStore } from '../../Lib/userStore'

function Chat() {
  let [open, setOpen] = useState(false)
  let [text, setText] = useState("")
  let [chat, setChat] = useState()
  const { currentUser } = useUserStore()
  const { chatId } = useChatStore()

  let endRef = useRef(null)


  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  useEffect(() => {
    const unSub = onSnapshot(
      doc(db, "chats", chatId), (res) => {
        setChat(res.data())
      }
    )
    return () => {
      unSub()
    }
  }, [chatId])
  console.log(chat)

  let handleemoji = (e) => {
    setText((perv) => perv + e.emoji)
    setOpen(false)
  }

  const handleSend = async () => {
    if (text == "") return;

    try {
      await updateDoc(doc(db, "chats", chatId), {
        messages: arrayUnion({
          senderId: currentUser.id,
          text,
          createdAt: new Date(),
        })
      })

      const userChatsRef = doc(db, "userChats", id)
      const userChatsSnapshot = await getDoc(userChatsRef)

      if (userChatsSnapshot.exists()) {
        const userChatsData = userChatsSnapshot.data()

        const chatIndex = userChatsData.chats.findIndex(
          (c) => c.chatId === chatId
        )

        userChatsData[chatIndex].lastMessages = text;
        userChatsData[chatIndex].isSeen = id === currentUser.id ? true : false;
        userChatsData[chatIndex].updateAt = Date.now();

        await updateDoc(userChatsRef, {
          chats: userChatsData.chats,
        })

      }
    } catch (error) {
      console.log(error)
    }
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

        {
          chat?.messages?.map((message) => (
            <div className="message own" key={message?.createAt}>
              <div className="texts">
                {message.img && <img src={message.img} alt="" />}
                <p>
                  {message.text}
                </p>
                {/* <span>1 min ago !</span> */}
              </div>

            </div>

          ))
        }
        <div ref={endRef}></div>
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

        <button className='sendButton' onClick={handleSend}>Send</button>

      </div>
    </div>
  )
}

export default Chat