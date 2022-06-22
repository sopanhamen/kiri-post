import { useForm } from 'react-hook-form'
import AuthLayout from '@layout/auth/Authlayout'
import { Input } from '@material-tailwind/react'
import { Button } from '@material-tailwind/react'
import { Card, CardBody, CardHeader } from '@material-tailwind/react'

const styles = {
    wrapper: ``,
    cardWrapper: `mt-6 w-96`,
    cardHeader: `relative h-5`,
    cardBody: `text-center`,
}
const SignIn = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()
    const onSubmit = () => {
        console.log('test')
    }
    return (
        <div className={styles.wrapper}>
            <Card className={styles.cardWrapper}>
                <CardHeader color="blue" className={styles.cardHeader}>
                    <h4> Sign In</h4>
                </CardHeader>
                <CardBody className={styles.cardBody}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Input
                            label="Email"
                            {...register('email', { required: true })}
                        />

                        <Input
                            label="Password"
                            {...register('password', { required: true })}
                        />

                        {errors.email && <span>This field is required</span>}

                        <Button variant="outlined" type="submit">
                            Sign In
                        </Button>
                    </form>
                </CardBody>
            </Card>
        </div>
    )
}
SignIn.layout = AuthLayout

export default SignIn
