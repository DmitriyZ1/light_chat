import { UserType } from "@/types/type"
import './Users.scss'
import { useState } from "react"
import classNames from "classnames"

export function Users({ usersList }: { usersList: UserType[] }) {
    const [showUsers, setShowUsers] = useState<boolean>(false)
    
    return (
        <div className={classNames("users-list ", {'users-list_show': showUsers})}>
            <div className={classNames('users-list__margin' ,{'users-list_background': showUsers})}>
                <h3 className="users-list__title">Сейчас в чате</h3>
                <ul className="users-list__items">
                    {usersList.map(elem =>
                        <li className="users-list__item"
                            key={elem.namecolor}
                            style={{ color: elem.namecolor }}>
                            {elem.name}
                        </li>)}
                </ul>
            </div>
            <div className="users-list__arrow" onClick={() => {setShowUsers(!showUsers)}}> {'<>'}</div>
        </div>
    )
}