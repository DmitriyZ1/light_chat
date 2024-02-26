import Message from "./Messege"
import Info from "./Info"
import { useState, useEffect, useRef } from "react"
import { useInputText } from "@/myhooks/impHook"
import './Chat.scss'
import { Users } from "./Users"
import { UserType, ChatType } from "@/types/type"


interface PropsTypes {
    messeges: ChatType[],
    users: UserType[],
    pushMessage: (a: string) => void,
    info: string[]
}

export default function Chat({ messeges, users, pushMessage, info }: PropsTypes) {

    const { inpState, changeValue, setInpState } = useInputText()
    const [isNotVoid, setIsNotVoid] = useState<boolean>(true)
    const refInput = useRef<HTMLInputElement>(null);
    const refList = useRef<HTMLDivElement>(null)
    const refItems = useRef<HTMLUListElement>(null)

    useEffect(() => {
        if (inpState.length < 1) {
            setIsNotVoid(false)
        } else {
            setIsNotVoid(true)
        }
    }, [inpState])

    const messegeSend = (): void => {
        pushMessage(refInput.current.value)
        setInpState('')
        refInput.current.focus()
    }

    useEffect(() => {
        if (messeges.length > 0) {
            const chat = refList.current;
            const list = refItems.current;
            const heightList = list.scrollHeight;
            chat.scrollTo(0, heightList);
        }
    }, [messeges])

    const keyPress = (event: React.KeyboardEvent<HTMLInputElement>): void => {
        if (event.key === "Enter") {
            if (isNotVoid) {
                messegeSend()
            }
        }
    }

    return (
        <div className="chat">
            <Info info={info} />
            <div className="chat-content">
                <Users usersList={users} />
                <div className="messeges">
                    <div className="messeges__margin">
                        <div className="messeges__list" ref={refList}>
                            <ul className="messeges__items" ref={refItems}>
                                {messeges.map((elem, index) =>
                                    <Message name={elem.name}
                                        message={elem.messege}
                                        colorname={elem.namecolor}
                                        time={elem.time}
                                        key={elem.namecolor + index + elem.time}
                                    />)}
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="input-send">
                    <div className="input-send__centr">
                        <input
                            type="text"
                            onKeyDown={keyPress}
                            ref={refInput}
                            onChange={changeValue}
                            value={inpState}
                        />
                        <button
                            disabled={!isNotVoid}
                            onClick={() => { messegeSend() }}>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}