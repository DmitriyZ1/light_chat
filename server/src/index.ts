import { Server } from 'socket.io'
import { randomColor, getTime } from './func';
import { CORS, countMessagesHistory, PORT } from './options';
import { UserData, ChatType } from './types/types';

const port:any = process.env.PORT || PORT

const io = new Server(
    {
        cors: {
            origin: CORS
        }
    }
);
let history: ChatType[] = []


io.use((socket, next) => {
    const username = socket.handshake.auth.username
    const colorId = socket.handshake.auth.colorId
    if (!username) {
        return next(new Error("name error"))
    }
    socket.data.namecolor = colorId
    socket.data.username = username
    next()
})


io.on("connection", (socket) => {
    let arrUsers: UserData[] = []
    let countUsers = 0;
    io.of("/").sockets.forEach((item) => {
        if (!arrUsers.some(arr => arr.name === item.data.username && arr.namecolor === item.data.namecolor)) {
            arrUsers.push({ id: item.id, name: item.data.username, namecolor: item.data.namecolor })
        } else {
            countUsers++
        }
    })
    
    if(countUsers === 0){
        socket.broadcast.emit("user connected", {
            userID: socket.id,
            username: socket.data.username,
            time: getTime()
        })
    }
    
    socket.emit("my name", {name: socket.data.username, id: socket.data.namecolor})
    io.emit("users", arrUsers)

    socket.on("user messege", (e) => {
        const itemMesseg: ChatType = { name: socket.data.username, messege: e, namecolor: socket.data.namecolor, time: getTime() };
        io.emit("messege", itemMesseg)
        history.push(itemMesseg)
        if (history.length > countMessagesHistory) {
            history.shift()
        }
    })

    socket.emit('history', history)

    socket.on('disconnect', () => {
        let countConnections: number = 0
        io.of("/").sockets.forEach((item) => {
            if (item.data.username === socket.data.username && item.data.colorId === socket.data.colorId) countConnections++
        })
        if (countConnections === 0) {
            arrUsers = arrUsers.filter(item => item.name !== socket.data.username && item.namecolor !== socket.data.colorId)
            io.emit("update users", arrUsers)
            socket.broadcast.emit("user disconnected",{
                userID: socket.id,
                username: socket.data.username,
                time: getTime()
            })
        }
    })
})

io.listen(port);



