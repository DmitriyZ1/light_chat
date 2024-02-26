import './Info.scss'
import classNames from 'classnames';
import labelpic from '@/assets/pics/label.png'

export default function Info({info}: {info:string[]}){

    return (
        <div className="chat-info">
            <div className="chat-info__content">
                <div className="chat-info__tittle">
                    <img src={labelpic} alt="label" />
                </div>
                <div className="chat-info__events">
                    <div className="chat-info__running-line">
                        <div className='chat-info__running-items'>
                            <ul>
                                {info.map((e, ind) => <li className={classNames({mark: ind === 2 })} key={e+ind}>{e}</li>)}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}