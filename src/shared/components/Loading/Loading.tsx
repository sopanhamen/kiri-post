import React from 'react'
import clsx from 'clsx'

type Size = 'sm' | 'md' | 'lg'

interface IProps {
    isLoading: boolean
    position?: string
    className?: string
    size?: Size
}

function Loading({
    isLoading,
    position = 'absolute',
    className,
    size = 'md',
}: IProps) {
    return (
        <>
            {isLoading && (
                <div
                    className={clsx(
                        'text-center color-green center loading-container',
                        position === 'relative'
                            ? 'position-relative'
                            : 'position-absolute',
                        size === 'sm' ? 'sm-loading' : 'md-loading',
                        className,
                    )}
                    key={0}
                >
                    <div className="lds-ellipsis w-auto d-flex">
                        {' '}
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                </div>
            )}
        </>
    )
}

export default Loading
