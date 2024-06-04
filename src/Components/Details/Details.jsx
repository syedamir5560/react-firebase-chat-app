import React from 'react'
import './details.css'
import { auth, db } from '../../Lib/firebase'
import { useChatStore } from '../../Lib/chatStore'
import { useUserStore } from '../../Lib/userStore'
import { arrayRemove, arrayUnion, doc, updateDoc } from 'firebase/firestore'

function Details() {

  const { chatId, user, isCurrentUserBlocked, isReceiverBlocked, changeBlock } = useChatStore()
  const { currentUser } = useUserStore()

  let handleBlock = async () => {
    if (!user) return;

    const userDocRef = doc(db, 'users', currentUser.id)

    try {
      await updateDoc(userDocRef, {
        blocked: isReceiverBlocked ? arrayRemove(user.id) : arrayUnion(user.id),
      })
      changeBlock()
    } catch (error) {
      console.log(error)
    }
  }


  // Get the current date and time
  let now = new Date();

  // Format the date and time
  let formattedDateTime = now.getFullYear() + '-' +
    String(now.getMonth() + 1).padStart(2, '0') + '-' +
    String(now.getDate()).padStart(2, '0') + ' ' +
    String(now.getHours()).padStart(2, '0') + ':' +
    String(now.getMinutes()).padStart(2, '0');

  // console.log(formattedDateTime);

  return (
    <div className='details'>
      <div className="user">
        <img src={user?.avatar || "./avatar.png"} alt="" />
        <h2>Jane Deo</h2>
        <p>{formattedDateTime}</p>
      </div>

      <div className="info">
        <div className="option">
          <div className="title">
            <span>Chat Setting</span>
            <img src="./arrowUp.png" alt="" />
          </div>
        </div>

        <div className="option">
          <div className="title">
            <span>Privacy & Help</span>
            <img src="./arrowUp.png" alt="" />
          </div>
        </div>

        <div className="option">
          <div className="title">
            <span>Share Photos</span>
            <img src="./arrowDown.png" alt="" />
          </div>
          <div className="photos">
            <div className="photoItem">
              <div className="photoDetail">
                <img src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2073&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
                <span>photo_2024.png</span>
              </div>
              <img src="download.png" className='icon' alt="" />
            </div>

            <div className="photoItem">
              <div className="photoDetail">
                <img src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2073&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
                <span>photo_2024.png</span>
              </div>
              <img src="download.png" className='icon' alt="" />
            </div>
          </div>
        </div>

        <div className="option">
          <div className="title">
            <span>Share Files</span>
            <img src="./arrowUp.png" alt="" />
          </div>
        </div>
        <button onClick={handleBlock}>
          {isCurrentUserBlocked
            ? "you are blocked"
            : isReceiverBlocked
              ? "User Blocked"
              : "Block User"}
        </button>
        <button className='logout' onClick={() => auth.signOut()}>Logout</button>
      </div>
    </div>
  )
}

export default Details