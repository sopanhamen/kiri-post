import React from 'react'
import { Button } from '@material-tailwind/react'
import clsx from 'clsx'

type Variant = 'filled' | 'outlined' | 'gradient' | 'text'
type Size = 'sm' | 'md' | 'lg'
type TypeButton = 'submit' | 'reset' | 'button'
type Color =
    | 'blue-grey'
    | 'grey'
    | 'brown'
    | 'deep-orange'
    | 'orange'
    | 'amber'
    | 'yellow'
    | 'lime'
    | 'light-green'
    | 'green'
    | 'teal'
    | 'cyan'
    | 'light-blue'
    | 'blue'
    | 'indigo'
    | 'deep-purple'
    | 'purple'
    | 'pink'
    | 'red'

interface IButtonProps {
    onClick?: () => void
    label: string
    type?: TypeButton
    color?: Color
    variant?: Variant
    disable?: boolean
    size?: Size
    className?: string
}

const BasicButton = (props: IButtonProps) => {
    const {
        onClick,
        label,
        color = 'blue-grey',
        variant = 'outlined',
        disable = false,
        size = 'sm',
        type = 'submit',
        className,
    } = props

    const styles = {
        wrapper: clsx(`rounded-full`, className),
        container: ``,
    }
    return (
        <>
            <Button
                variant={variant}
                type={type}
                color={color}
                size={size}
                disabled={disable}
                onClick={onClick}
                className={styles.wrapper}
            >
                {label}
            </Button>
        </>
    )
}

export default BasicButton
