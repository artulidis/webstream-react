import React, { useEffect, useState, useContext } from 'react'
import styles from '../css/video.module.css'
import GlobalContext from '../global/GlobalContext'
import Chat from '../components/Video/Chat'
import MessageInput from '../components/Video/MessageInput'
import ChatMessage from '../components/Video/ChatMessage'
import axios from 'axios'
import { useParams } from 'react-router-dom'

const VideoPage = () => {

  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const { user } = useContext(GlobalContext)
  const {id} = useParams()

  useEffect(() => {
    getComments()
  },[])

  const getComments = async () => {
    try {
      let comments = await axios.get(`http://127.0.0.1:8000/api/comments/${id}`)
      setMessages(comments.data)
    } catch(err) {
      console.log(err)
    }
  }

  const handleSubmit = async (e, submitButton) => {
    try {
      e.preventDefault()
      let comment = await axios.post(`http://127.0.0.1:8000/api/comments/${id}`, {
        user: user.username,
        body: input,
        video: id
    })
    setMessages([...messages, comment.data])
    setInput('')
    console.log(messages)
    } catch(err) {
      console.log(err)
    }
  }

  return (
    <div>
      

      <Chat>
        <div className={styles.chatHeader}>stream chat</div>

        <div className={styles.messagesContainer}>
          {
            messages.sort((a,b)=> a.created < b.created).map((message, index) => (
                <ChatMessage message={message} key={index} />
            ))
          }
        </div>
        <MessageInput handleSubmit={handleSubmit} input={input} setInput={setInput} />

      </Chat>
    </div>
  )
}

export default VideoPage
