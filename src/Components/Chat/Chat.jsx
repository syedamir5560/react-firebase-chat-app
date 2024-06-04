import React, { useEffect, useRef, useState } from 'react'
import { getFirestore, arrayUnion } from "firebase/firestore";
import './chat.css'
import EmojiPicker from 'emoji-picker-react'
import { doc, getDoc, onSnapshot, updateDoc } from 'firebase/firestore'
import { db } from '../../Lib/firebase'
import { useChatStore } from '../../Lib/chatStore'
// import { arrayUnion } from 'firebase/firestore/lite'
import { useUserStore } from '../../Lib/userStore'
import upload from '../../Lib/upload';

function Chat() {
  let [open, setOpen] = useState(false)

  // const { currentUser } = useUserStore() 
  let [text, setText] = useState("")
  let [chat, setChat] = useState()
  let [img, setImg] = useState({
    file: null,
    url: ''
  })


  const { currentUser } = useUserStore()
  const { chatId, user, isCurrentUserBlocked, isReceiverBlocked } = useChatStore()

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
  // console.log(chat)

  let handleemoji = (e) => {
    setText((perv) => perv + e.emoji)
    setOpen(false)
  }

  const handleImg = (e) => {
    if (e.target.files[0]) {
      setImg({
        file: e.target.files[0],
        url: URL.createObjectURL(e.target.files[0])
      })
    }
  }


  const handleSend = async () => {
    if (text === "") return;

    let imgUrl = null
    const db = getFirestore();  // Initialize Firestore

    try {

      if (img.file) {
        imgUrl = await upload(img.file)
      }
      // Update the chat document with the new message
      await updateDoc(doc(db, "chats", chatId), {
        messages: arrayUnion({
          senderId: currentUser.id,
          text,
          createdAt: new Date(),
          ...(imgUrl && { img: imgUrl })
        }),
      });

      const userIDs = [currentUser.id, user.id]
      userIDs.forEach(async (id) => {
        const userChatsRef = doc(db, "userchats", id);
        const userChatsSnapshot = await getDoc(userChatsRef);

        if (userChatsSnapshot.exists()) {
          const userChatsData = userChatsSnapshot.data();

          // Find the index of the chat to update
          const chatIndex = userChatsData.chats.findIndex(
            (c) => c.chatId === chatId
          );

          // Update the necessary fields in the chat object
          userChatsData.chats[chatIndex].lastMessages = text;
          userChatsData.chats[chatIndex].isSeen = id === currentUser.id ? true : false;
          userChatsData.chats[chatIndex].updateAt = Date.now();  // Using Date object for consistency

          // Update the userChats document with the modified chats array
          await updateDoc(userChatsRef, {
            chats: userChatsData.chats,
          });
        }
      })
      // Get the user chats document

    } catch (error) {
      console.log(error);
    }

    setImg({
      file: null,
      url: ""
    })

    setText("")

    // console.log(imgUrl)

  };

  // Get the current date and time
  let now = new Date();

  // Format the date and time
  let formattedDateTime = now.getFullYear() + '-' +
    String(now.getMonth() + 1).padStart(2, '0') + '-' +
    String(now.getDate()).padStart(2, '0') + ' ' +
    String(now.getHours()).padStart(2, '0') + ':' +
    String(now.getMinutes()).padStart(2, '0');

  console.log(formattedDateTime);

  return (
    <div className='chat'>
      <div className="top">
        <div className="user">
          <img src={user?.avatar || "./avatar.png"} alt="" />
          <div className="texts">
            <span>{user?.username}</span>
            <p>{`Online`}</p>
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
            <div className={message.senderId === currentUser?.id ? "message own" : "message"} key={message?.createAt}>
              <div className="texts">
                {message.img && <img src={message.img} alt="" />}
                <p>
                  {message.text}
                </p>
                {/* {formattedDateTime} */}
              </div>
            </div>

          ))
        }

        {
          img.url && (
            <div className='message own'>
              <div className="texts">
                <img src={img.url} alt="" />
              </div>
            </div>
          )
        }

        <div ref={endRef}>

        </div>
      </div>

      <div className="bottom">
        <div className="icons">
          <label htmlFor="file">
            <img src="./img.png" alt="" />
          </label>
          <input type="file" id='file' style={{ display: 'none' }} onChange={handleImg} />
          <img src="./camera.png" alt=""  />
     
          <img src="./mic.png" alt="" />
        </div>
        <input type="text" value={text} placeholder={(isCurrentUserBlocked || isReceiverBlocked) ? "You cannot send a messages" : "Type a message.."} onChange={(e) => setText(e.target.value)} />
        <div className="emoji">
          <img src="./emoji.png" alt="" onClick={() => setOpen((perv) => !perv)} />
          <div className="picker">
            <EmojiPicker open={open} onEmojiClick={handleemoji} />
          </div>
        </div>

        <button className='sendButton' onClick={handleSend} disabled={isCurrentUserBlocked || isReceiverBlocked}>Send</button>

      </div>
    </div>
  )
}

export default Chat