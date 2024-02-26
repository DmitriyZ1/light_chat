import { useState, useRef, useEffect } from "react"
import { useInputText } from "@/myhooks/impHook";
import './Auth.scss'


export default function Auth({ connectSocket }: { connectSocket: (userName: string) => void }) {

    const inputName = useRef<HTMLInputElement>(null)
    const [isName, setIsName] = useState<boolean>(false)
    const {inpState, changeValue} = useInputText()

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
                connectSocket(inputName.current.value)
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
                        <button disabled={!isName} onClick={() => { connectSocket(inputName.current.value) }}> далее </button>
                    </div>
                </div>
            </div>
        </div>
    )
}