import React from 'react'
import { Button } from '@material-tailwind/react'

type Variant = 'filled' | 'outlined' | 'gradient' | 'text'
type Size = 'sm' | 'md' | 'lg'
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
    color?: Color
    variant?: Variant
    disable?: boolean
    size?: Size
}

const BasicButton = (props: IButtonProps) => {
    const {
        onClick,
        label,
        color = 'blue-grey',
        variant = 'outlined',
        disable = false,
        size = 'md',
    } = props

    const styles = {
        wrapper: `rounded-full px-0.5`,
        container: ``,
    }
    return (
        <div>
            <Button
                variant={variant}
                color={color}
                size={size}
                disabled={disable}
                onClick={onClick}
                className={styles.wrapper}
            >
                {label}
            </Button>
        </div>
    )
}

export default BasicButton
