import './Header.scss'
import classNames from 'classnames';
import labelpic from '@/assets/pics/label.png'
import { useContext } from 'react';
import { MainContext } from '@/context/context';
import { ContextType } from '@/types/type';

export default function Header(){
    const context:ContextType = useContext(MainContext);
    const {events, nameUserId, disconnectSocket} = context

    return (
        <div className="chat-header">
            <div className="chat-header__content">
                <div className="chat-header__tittle">
                    <img src={labelpic} alt="label" />
                </div>
                <div className="chat-header__events">
                    <div className="chat-header__running-line">
                        <div className='chat-header__running-items'>
                            <ul>
                                {events.map((e, ind) => <li className={classNames({ mark: ind === 2 })} key={e + ind}>{e}</li>)}
                            </ul>
                        </div>
                    </div>
                    <div className="chat-header__user">
                        <div className="chat-header__user-exit"
                        style={{color:nameUserId.color}}
                            onClick={() => { disconnectSocket(true) }}>
                            {nameUserId.name}
                            <span> выйти</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}