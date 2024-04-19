
import { io } from "socket.io-client";
import { useState, useEffect, useContext } from "react";
import { UserType, ChatType, UserStatusType, UserNameColorType } from "@/types/type"
import { MainContext } from "@/context/context";
import { URL } from "@/options";

const socket = io(URL, {
    autoConnect: false
});

import './App.scss'
import Auth from "./Auth";
import Chat from "./Chat";


export default function App() {
    
    const [isConnect, setIsConnect] = useState<boolean>(false)
    const [messeges, setMesseges] = useState<ChatType[]>([])
    const [users, setUsers] = useState<UserType[]>([])
    const [events, setEvents] = useState<string[]>(['', '', ''])
    const [nameUserId, setNameUserId] = useState<UserNameColorType>({name: '', color: ''})
    console.log('render')

    const connectSocket = (obj: {name: string, color: string, newConnect: boolean}):void => {
        if(obj.newConnect){
            localStorage.removeItem('data')
            localStorage.setItem('data', JSON.stringify({name:obj.name, color: obj.color}))
        }
        socket.auth = { username: obj.name, colorId: obj.color}
        socket.connect()
        setIsConnect(true)
    }

    const disconnectSocket = (remStorege: boolean):void => {
        if(remStorege){
            localStorage.removeItem('data')
        }
        socket.removeAllListeners();
        socket.disconnect()
        setIsConnect(false)
    }

    const eventStorage = ():void => {
        const storage = localStorage.getItem('data')
        if(storage) {
            const data = JSON.parse(storage)
            connectSocket({name: data.name, color: data.color, newConnect: false})
        } else {
            disconnectSocket(false)
        } 
    }

    useEffect(() => {
        window.addEventListener('storage', eventStorage)
        const storage = localStorage.getItem('data')
        if(storage) {
            const data = JSON.parse(storage)
            connectSocket({name: data.name, color: data.color, newConnect: false})
        } 
    },[])

    const pushMessage = (refValue: any): void => {
        socket.emit("user messege", refValue)
    }

    const outMesseges = (newmessege: ChatType): void => {
        setMesseges(elems => [...elems, newmessege])
        console.log('pop')
    }

    const outListUsers = (users: UserType[]): void => {
        setUsers(users)
    }

    const createInfo = (e: UserStatusType, status: string) => {
        const pushText = (t:string) => {
            const text = `${e.time} ${e.username} ${t}`
            setEvents(arr => {
                const g = [...arr, text]
                return [g[1], g[2], g[3]]
            })
        }
        if (status === 'connected') {
            pushText('присоединился к чату')
        }
        if (status === 'disconnected') {
            pushText('покинул чат')
        }
    }

 
    useEffect(() => {
        if (isConnect) {
            socket.on("connect_error", (err) => {
                console.log(err)
                disconnectSocket(false)
            })

            socket.on("my name", e => {
                if(e){
                    setNameUserId({name: e.name, color: e.id})
                } else {
                    setNameUserId({name: 'user', color: "rgb(199, 77, 105)"})
                }
            })

            socket.on("history", e => {
                if (e.length !== 0) {
                    setMesseges(e)
                }
            })

            socket.on("users", outListUsers)

            socket.on("update users",outListUsers)

            socket.on("user connected", e => {
                createInfo(e, 'connected')
            })

            socket.on("user disconnected", e => {
                createInfo(e, 'disconnected')
            })

            socket.on("messege",outMesseges)
        }
    }, [isConnect])

    return (
        <MainContext.Provider value={{users, messeges, events, nameUserId, pushMessage, disconnectSocket, connectSocket} } >
            <div className="content">
                <div className="content__background">
                    <div className="conteiner">
                        {!isConnect ? <Auth/> : <Chat />}
                    </div>
                </div>
            </div>
        </MainContext.Provider>
    )
}