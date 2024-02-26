import { useState } from "react"

export const useInputText = () => {
    const [inpState, setInpState] = useState<any>('');

    function changeValue(e:React.ChangeEvent<HTMLInputElement>) {
        setInpState(e.target.value)
    }

    return { inpState, changeValue, setInpState }
}