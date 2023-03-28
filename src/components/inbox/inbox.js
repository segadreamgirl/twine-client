import { fetchIt } from '../auth/fetchit.js'
import { useState, useEffect } from 'react'
import '../dashboard/dashboard.css'
import './inbox.css'
import { Link } from 'react-router-dom'
import { isFocusable } from '@testing-library/user-event/dist/utils/index.js'

export const Inbox = () => {
    let current_user = localStorage.getItem('twine_token')
        current_user = JSON.parse(current_user)
    const [sentMessages, setSentMessages] = useState([])
    const [receivedMessages, setReceivedMessages] = useState([])
    const [clickedUser, setClickedUser] = useState(current_user.id)
    const [sendButton, sendButtonPressed] = useState(false)

    const [messageToSend, update] = useState({
        body: "",
        sender_id: 0,
        receiver_id: 0
    })

    useEffect(
        () => {
            fetchIt(`http://localhost:8000/messages?sender_id=${current_user.id}`)
                .then((data) => {
                    setSentMessages(data)
                })
        },
        [sendButton]
    )

    useEffect(
        () => {
            fetchIt(`http://localhost:8000/messages?receiver_id=${current_user.id}`)
                .then((data) => {
                    setReceivedMessages(data)
                })
        },
        []
    )
    

    const handleSend = () => {
        sendButtonPressed(true)
        //what gets sent to the "API" thing
        const messageToSendToAPI = {
            body: messageToSend.body,
            sender_id: current_user.id,
            receiver_id: clickedUser
        }

        //fetch call uses POST method to send postToSendToAPI to... the API...
        return fetch(`http://localhost:8000/messages`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(messageToSendToAPI)
        }).then(response => response.json())
            .then(() => {
                sendButtonPressed(false)
                const textarea = document.getElementById('body')
                textarea.value = ''
            })
    }

    const allMessages = sentMessages.concat(receivedMessages).sort(
        (m1, m2) =>
            (m1.time_sent > m2.time_sent) ? 1: (m1.time_sent<m2.time_sent)? -1:0)

    const getMessages = (userId) => {
        return allMessages.map((message) => {
            let senderAccount = message?.sender?.employee_account
            let dept = senderAccount[0]?.department?.name
            let theme = dept.split(' ').join('-').toLowerCase() +"-card"

            if(userId!==current_user.id){
            if(message?.sender?.id===userId || message?.receiver?.id===userId){
                if(message?.sender?.id!== current_user.id){
                    return <><div className='message' id={theme}>{message.body}</div></>
                } else{
                    return<><div className='message-from-me' id={theme}>{message.body}</div></>
                }
            }
        } else{
            if (message?.sender?.id===current_user.id&&message?.receiver?.id===current_user.id){
                return<><div className='message-from-me' id={theme}>{message.body}</div></>
            }
        }
    }
    )
    }

    const getUniqueNames = () =>{

        let accounts = []
        let accountIds = []
        let ids = []
        let names = []

        allMessages.map((message)=>{
                accounts.push(message?.sender?.employee_account[0])
                accountIds.push(message?.sender?.employee_account[0].id)

            }
        )
        ids = new Set(accountIds)
        ids = Array.from(ids)

        for(let i=0;i<ids.length;i++){
            let accountArray = []
            accountArray.push(accounts.filter(account => account.id===ids[i]))
            names.push(accountArray[0][0])
        }

        return names
    }

    const displayNames = () =>{
        let names = getUniqueNames()

        return names.map((name)=>{
            let dept = name?.department?.name
            let theme = dept.split(' ').join('-').toLowerCase()

            return<><div className="name-box" onClick={()=>{nameClicked(name)}} id={theme}><img src={name.profile_pic}/><b>{name?.user?.first_name} {name?.user?.last_name}</b> </div></>
        })
    }

    const nameClicked = (account) =>{
        setClickedUser(account?.user?.id)
        if(account?.user?.id!==current_user.id){
            document.getElementById('box-title').innerHTML = `Messages with ${account?.user?.first_name}`
        } else {
            document.getElementById('box-title').innerHTML = `Messages with yourself`
        }
    }


    return <>
    <div className='content-frame'>
        <div className='content-title' id="box-title">
            Messages with Yourself
        </div>
                <section className='project-box'>
                    <div className='inbox-names'>{displayNames()}</div>
                    <div className='message-container'>
                    <div className='inbox-messages'>
                        {
                            getMessages(clickedUser)
                        }
                    </div>
                    <div className='new-message'>
                    <textarea
                        rows="2"
                        cols="88"
                        placeholder="Send a message..."
                        id='body' 
                        onChange={
                            (event) => {
                                const copy = { ...messageToSend }
                                copy.body = event.target.value
                                update(copy)
                            }
                        }/>
                    <button className="message_send--btn" onClick={() => handleSend()}>
                        send
                    </button>
                    </div>
                    </div>
                </section>
    </div>
    </>
}