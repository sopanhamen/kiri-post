import BasicButton from "@shared/components/Button/BasicButton"
import BasicInput from "@shared/components/Input/BasicInput"
import { FormService } from "@shared/services/form.service"
import { Dispatch } from 'redux'
import { Controller, useForm } from "react-hook-form"
import { connect } from "react-redux"
import { addTodo } from "@store/todo/todoSlice"

interface ITodoProps
{
    addTodo?: ()=> void
}
interface IFormData {
    text?: string
}
const Todo = ( props: ITodoProps) =>
{
    const { addTodo } = props
    const { control, formState: { errors }, handleSubmit  } = useForm()

    const style = {
        spaceButton: `my-3`
    }
    
    const handleAddTodo = ( formData: IFormData) => {
        console.log("formData", formData )
        addTodo(formData?.text)
    }
    return (
        <>
            <form onSubmit={handleSubmit(handleAddTodo)}>
                <Controller
                    name = "text"
                    control = { control }
                    rules = {{ required: true }}
                    render={({ field: { ref, value ,onChange} }) => {
                        return (
                        <BasicInput
                            ref = { ref }
                            label = 'Todo'
                            value = { value }
                            onChange = { onChange }
                            helperText = { FormService.getErrorMessage(
                                errors,
                                'text',
                                'Label is required '
                            )}
                        />
                        )
                    }}
                />
                
                <div className={style.spaceButton}>
                    <BasicButton
                        label="Button"
                        onClick={() => handleSubmit(handleAddTodo)()}
                    />
                </div>
            </form>
        </>
    )
}


const mapDispatchToProps = (dispatch: Dispatch ) => {
    return {
        addTodo: (text: string) => dispatch(addTodo(text))
    }
}

export default connect(null, mapDispatchToProps)(Todo)
