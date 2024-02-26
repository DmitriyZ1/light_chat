import './Messege.scss'


export default function Message({ name, message, time, colorname }: { name: string, message: string, time: string, colorname: string }) {
    return (
        <li className="messege">
            <div className="messege__user">
                <div className="messege__name" style={{color: colorname}}>{name}</div>
                <div className="messege__time">{time}</div>
            </div>
            <div className="messege__text">{message}</div>
        </li>
    )
}