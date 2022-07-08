import React from 'react'
import { Input } from '@material-tailwind/react'
import clsx from 'clsx'

export type Ref = HTMLInputElement
type Size = 'md' | 'lg'
type Color = 'indigo' | 'blue' | 'purple' | 'teal'

interface IInputProps {
    label?: string
    type?: string
    size?: Size
    color?: Color
    onChange?: () => void
    value?: string
    disable?: boolean
    pattern?: string
    helperText?: string
}

const BasicInput = React.forwardRef<Ref, IInputProps>((props, ref) => {
    const {
        type = 'text',
        size = 'md',
        color = 'indigo',
        disable = false,
        pattern,
        label,
        helperText,
        onChange,
        value,
    } = props

    const style = {
        inputWrapper: clsx('my-2'),
        inputContain: clsx(''),
        errorLabel: `text-left text-sm block text-red-600`,
    }
    return (
        <div className={style.inputWrapper}>
            <Input
                ref={ref}
                type={type}
                label={label}
                size={size}
                color={color}
                pattern={pattern}
                onChange={onChange}
                value={value}
                className={style.inputContain}
                disabled={disable}
            />
            {helperText && <p className={style.errorLabel}>{helperText}</p>}
        </div>
    )
})

export default BasicInput
