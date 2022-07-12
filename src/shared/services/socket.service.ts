import Cookies from 'js-cookie'
import { io } from 'socket.io-client'

const publicToken = Cookies.get('publicToken')
const accessToken = Cookies.get('tokens')

// connect socket
const socketService = io(`${process.env.SocketBaseUrl}`, {
    transports: ['websocket'],
    upgrade: false,
    query: {
        ...(publicToken ? { publicToken: `bearer ${publicToken}` } : null),
        ...(accessToken ? { accessToken: `bearer ${accessToken}` } : null),
        // storyId: ''
    },
})

export default socketService
