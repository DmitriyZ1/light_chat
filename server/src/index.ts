import { Server } from 'socket.io'
import { randomColor, getTime } from './func';
import { CORS, countMessagesHistory, PORT } from './options';

const io = new Server(
    {
        cors: {
            origin: CORS
        }
    }
);

interface UserData {
    id: string,
    name: string,
    namecolor: string
}

interface ChatType {
    name: string,
    messege: string,
    time: string,
    namecolor: string
}


io.use((socket, next) => {
    const username = socket.handshake.auth.username
    if (!username) {
        return next(new Error("name error"))
    }
    socket.data.username = username
    socket.data.namecolor = randomColor()
    next()
})

let history:ChatType[] = [] 


io.on("connection", (socket) => {

    let arrUsers:UserData[] = []
   
    io.of("/").sockets.forEach((item) => {
        arrUsers.push({ id: item.id, name: item.data.username, namecolor: item.data.namecolor })
    })
    io.emit("users", arrUsers)

    socket.broadcast.emit("user connected", {
        userID: socket.id,
        username: socket.data.username,
        time: getTime()
    })

    socket.on("user messege", (e) => {
        const itemMesseg:ChatType = {name: socket.data.username, messege: e, namecolor: socket.data.namecolor, time: getTime()};
        io.emit("messege", itemMesseg)
        history.push(itemMesseg)
        if(history.length > countMessagesHistory) {
            history.shift()
        }
    })

    socket.emit('history', history)

    socket.on('disconnect', () => {
        arrUsers = arrUsers.filter(item => item.id !== socket.id)
        io.emit("update users", arrUsers)
        socket.broadcast.emit("user disconnected", {
            userID: socket.id,
            username: socket.data.username,
            time: getTime()
        })
    })
})

io.listen(PORT)



