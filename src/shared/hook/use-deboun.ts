import { useCallback, useEffect, useRef, useState } from 'react'
import _ from 'lodash'

function useDebounce(cb: any, dependencies: any, duration = 1000) {
    const firstRender = useRef(false)

    const [debounceChanged, setDebounceChanged] = useState({})

    const debounceDependencies = _.debounce(setDebounceChanged, duration)
    const setDebounceDependencies = useCallback((dep) => {
        debounceDependencies(dep)
    }, [])

    // hooks section
    useEffect(() => {
        if (!firstRender?.current) {
            firstRender.current = true
            return
        }
        cb(debounceChanged)
        return () => {
            //   ac.abort();
        }
    }, [debounceChanged])

    useEffect(() => {
        setDebounceDependencies(dependencies)
        return () => {
            //   ac.abort();
        }
    }, [JSON.stringify(dependencies)])

    return
}

export default useDebounce
