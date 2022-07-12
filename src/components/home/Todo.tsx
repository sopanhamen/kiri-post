import { Controller, useForm } from 'react-hook-form'
import BasicButton from '@shared/components/Button/BasicButton'
import BasicInput from '@shared/components/Input/BasicInput'
import { FormService } from '@shared/services/form.service'

interface ITodoProps {
    addTodo?: () => void
}
// interface IFormData {
//     text?: string
// }
const Todo = (props: ITodoProps) => {
    // const { addTodo } = props
    const {
        control,
        formState: { errors },
        handleSubmit,
    } = useForm()

    const style = {
        spaceButton: `my-3`,
    }

    return (
        <>
            <form>
                <Controller
                    name="text"
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { ref, value, onChange } }) => {
                        return (
                            <BasicInput
                                ref={ref}
                                label="Todo"
                                value={value}
                                onChange={onChange}
                                helperText={FormService.getErrorMessage(
                                    errors,
                                    'text',
                                    'Label is required ',
                                )}
                            />
                        )
                    }}
                />

                <div className={style.spaceButton}>
                    <BasicButton label="Button" />
                </div>
            </form>
        </>
    )
}
