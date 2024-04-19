
export interface UserType {
    name: string,
    namecolor: string
}

export interface ChatType {
    name: string,
    messege: string,
    time: string,
    namecolor: string
}

export interface ContextType{
    connectSocket: (obj: {name: string, color: string|null, newConnect: boolean}) => void
    users: UserType[]
    messeges: ChatType[]
    pushMessage: (a: string) => void
    events: string[]
    nameUserId: { name: string, color: string }
    disconnectSocket: (rem: boolean) =>void
}

export interface UserStatusType {
    username: string
    time: string
}

export interface UserNameColorType {
    name: string
    color: string
}