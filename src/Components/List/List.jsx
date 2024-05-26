import React from 'react'
import './list.css'
import UserInfo from './userInfo/UserInfo'
import ChatList from './ChatList/ChatList'

function List() {
  return (
    <div className='list'>
        <UserInfo/>
        <ChatList/>
    </div>
  )
}

export default List