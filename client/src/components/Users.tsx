import { ContextType } from "@/types/type"
import './Users.scss'
import { useState, useContext } from "react"
import { MainContext } from "@/context/context"
import classNames from "classnames"


export function Users() {
    const [showUsers, setShowUsers] = useState<boolean>(false)
    const context:ContextType = useContext(MainContext);
    const {users} = context;
   
    return (
        <div className={classNames("users-list ", {'users-list_show': showUsers})}>
            <div className={classNames('users-list__margin' ,{'users-list_background': showUsers})}>
                <h3 className="users-list__title">Сейчас в чате</h3>
                <ul className="users-list__items">
                    {users.map(elem =>
                        <li className="users-list__item"
                            key={elem.namecolor + elem.name}
                            style={{ color: elem.namecolor }}>
                            {elem.name}
                        </li>)}
                </ul>
            </div>
            <div className="users-list__arrow" onClick={() => {setShowUsers(!showUsers)}}> {'<>'}</div>
        </div>
    )
}