
import { Dispatch } from 'redux'
import { Controller, useForm } from "react-hook-form"
import { connect } from "react-redux"
import todoSlice, { addTodo } from "@store/todo/todoSlice"

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
            
            
        </>
    )
}

const mapDispatchToProps = (dispatch: Dispatch ) => {
    return {
        addTodo: (text: string) => dispatch(addTodo(text))
    }
}

export default connect(null, mapDispatchToProps)(Todo)
