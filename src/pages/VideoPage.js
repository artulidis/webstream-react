import React, { useEffect, useState, useContext } from 'react'
import styles from '../css/video.module.css'
import GlobalContext from '../global/GlobalContext'
import Chat from '../components/Video/Chat'
import MessageInput from '../components/Video/MessageInput'
import ChatMessage from '../components/Video/ChatMessage'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import ReconnectingWebSocket from 'reconnecting-websocket';

const VideoPage = () => {

  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const { user } = useContext(GlobalContext)
  const {id} = useParams()

  let endpoint = `ws://127.0.0.1:8000/videos/${user.username}/${id}`
  let socket = new ReconnectingWebSocket(endpoint)

  useEffect(() => {
   socket.onopen = (e) => {
      console.log("open", e)
   }
  },[])

  const handleSubmit = (e) => {
    e.preventDefault()
    socket.send(JSON.stringify({
      user: user.username,
      body: input,
      video: id
    }))
  }

  socket.onmessage = (e) => {
    let message_data = JSON.parse(e.data)
    setMessages([...messages, message_data])
    setInput('')
 }

  useEffect(() => {
    getComments()
  },[messages.length])

  const getComments = async () => {
    try {
      let comments = await axios.get(`http://127.0.0.1:8000/api/comments/${id}`)
      setMessages(comments.data)
    } catch(err) {
      console.log(err)
    }
  }

  return (
    <div>
      <Video>
        
      </Video>

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
