
import { io } from "socket.io-client";
import { useState, useEffect, useRef } from "react";
import { UserType, ChatType } from "@/types/type"

const socket = io('http://localhost:4000/', {
    auth: {
        token: "abcd"
    },
    autoConnect: false
});

import './App.scss'
import Auth from "./Auth";
import Chat from "./Chat";

interface UserStatus {
    username: string
    time: string
}


export default function App() {

    const [isConnect, setIsConnect] = useState<boolean>(false)
    const [messeges, setMesseges] = useState<ChatType[]>([])
    const [users, setUsers] = useState<UserType[]>([])
    const [events, setEvents] = useState<string[]>(['', '', '']);
    console.log('render')


    const connectSocket = (name: string) => {
        socket.auth = { username: name };
        socket.connect();
        setIsConnect(true)
    }

    const pushMessage = (refValue: any): void => {
        socket.emit("user messege", refValue)
    }

    const outMesseges = (newmessege: ChatType): void => {
        setMesseges(elems => [...elems, newmessege])
    }

    const outListUsers = (users: UserType[]): void => {
        setUsers(users)
    }

    const createInfo = (e: UserStatus, status: string) => {
        if (status === 'connected') {
            const text = `${e.time} пользователь ${e.username} подключился`

            setEvents(arr => {
                const g = [...arr, text]
                return [g[1], g[2], g[3]]
            })
        }
        if (status === 'disconnected') {
            const text = `${e.time} пользователь ${e.username} отключился`
            setEvents(arr => {
                const g = [...arr, text]
                return [g[1], g[2], g[3]]
            })
        }
    }

    useEffect(() => {
        if (isConnect) {
            socket.on("connect_error", (err) => {
                if (err.message === "name error") {
                    console.log(err)
                }
            })

            socket.on("history", e => {
                if (e.length !== 0) {
                    setMesseges(e)
                }
            })

            socket.on("users", e => {
                outListUsers(e)
            })

            socket.on("update users", e => {
                outListUsers(e)
            })

            socket.on("user connected", e => {
                createInfo(e, 'connected')
            })

            socket.on("user disconnected", e => {
                createInfo(e, 'disconnected')
            })

            socket.on("messege", e => {
                outMesseges(e)
            })

        }

    }, [isConnect])

    return (
        <div className="content">
            <div className="content__background">
                <div className="conteiner">
                    {!isConnect ?
                        <Auth connectSocket={connectSocket} /> :
                        <Chat
                            users={users}
                            messeges={messeges}
                            pushMessage={pushMessage}
                            info={events}
                        />}
                </div>
            </div>
        </div>
    )
}