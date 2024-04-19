import { useState, useRef, useEffect, useContext } from "react"
import { useInputText } from "@/myhooks/impHook"
import './Auth.scss'
import { randomColor } from "@/func/random"
import { MainContext } from "@/context/context"
import { ContextType } from "@/types/type"

export default function Auth() {

    const inputName = useRef<HTMLInputElement>(null)
    const [isName, setIsName] = useState<boolean>(false)
    const {inpState, changeValue} = useInputText()
    const context:ContextType = useContext(MainContext);
    const {connectSocket} = context

    useEffect(() => {
        if(inpState.length < 1){
            setIsName(false)
        }else {
            setIsName(true)
        }
    }, [inpState])

    const keyPress = (event:React.KeyboardEvent<HTMLInputElement>) => {
        if(event.key === "Enter"){
            if(isName){
                connectSocket({name:inputName.current.value,  color: randomColor(), newConnect: true})
            }
        }
    } 

    return (
        <div className="auth">
            <div className="auth-form auth-form_centr">
                <div className="auth-form__title">
                    <h3>введите ваше имя</h3>
                </div>
                <div className="auth-form__content">
                    <div className="auth-form__input">
                        <input onKeyDown={keyPress} type="text" ref={inputName} value={inpState} onChange={changeValue} />
                    </div>
                    <div className="auth-form__button" >
                        <button disabled={!isName} onClick={() => { connectSocket({name:inputName.current.value, color: randomColor(), newConnect: true}) }}> далее </button>
                    </div>
                </div>
            </div>
        </div>
    )
}