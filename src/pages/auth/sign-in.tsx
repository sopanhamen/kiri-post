import { Controller, useForm } from 'react-hook-form'
import AuthLayout from '@layout/auth/AuthLayout'
import { Button } from '@material-tailwind/react'
import { Card, CardBody, CardHeader } from '@material-tailwind/react'
import { authActions } from '@sagaStore/features/auth/authSlice'
import { useAppDispatch } from '@sagaStore/hook'
import BasicInput from '@shared/components/Input/BasicInput'
import { ILogin } from '@shared/models'
import { FormService } from '@shared/services/form.service'

const styles = {
    wrapper: ``,
    cardWrapper: `mt-6 w-96`,
    cardHeader: `h-16 `,
    textHeader: `text-center align-middle inline-block`,
    cardBody: `text-center`,
}
const SignIn = () =>
{
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm()

    const dispatch = useAppDispatch();

    // const isLoggin = useAppSelector((state) => state.auth.logging);

    const onSubmit = (formData: ILogin) =>
    {

        dispatch(
            authActions.login({
                username: formData.username,
                password: formData.password,
            })
        );
    }


    return (
        <div className={styles.wrapper}>
            <Card className={styles.cardWrapper}>
                <CardHeader color="blue" className={styles.cardHeader}>
                    <span className={styles.textHeader}> Sign In</span>
                </CardHeader>
                <CardBody className={styles.cardBody}>
                    <form onSubmit={handleSubmit(onSubmit)}>

                        <Controller
                            name="username"
                            control={control}
                            rules={{ required: true }}
                            render={({ field: { ref, onChange, value } }) =>
                            {
                                return (
                                    <BasicInput
                                        ref={ref}
                                        label = "User Name"
                                        value={value}
                                        onChange={onChange}
                                        helperText={FormService.getErrorMessage(
                                            errors,
                                            'username',
                                            'User Name'
                                        )}
                                    />
                                )
                            }}

                        />

                        <Controller
                            name="password"
                            control={control}
                            rules={{ required: true }}
                            render={({ field: { ref, onChange, value } }) =>
                            {
                                return (
                                    <BasicInput
                                        ref={ref}
                                        type="password"
                                        label = "Password"
                                        value={value}
                                        onChange={onChange}
                                        helperText={FormService.getErrorMessage(
                                            errors,
                                            'password',
                                            'Password'
                                        )}
                                    />
                                )
                            }}

                        />

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
