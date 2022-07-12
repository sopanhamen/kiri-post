import { useEffect, useRef } from 'react'

import socketService from '@/services/socket.service'

const useFetchSocket = (event, cb, dependencies) => {
    const firstRender = useRef(false)

    useEffect(() => {
        if (!firstRender?.current) {
            firstRender.current = true
            return
        }
        socketService.on(event, (data) => {
            cb(data)
        })

        return () => {
            socketService.removeAllListeners(event)
        }
    }, dependencies)
    return
}

export default useFetchSocket
