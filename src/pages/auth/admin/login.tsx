import { Controller, useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import BlankLayout from '@layout/auth/BlankLayout'
import BasicButton from '@shared/components/Button/BasicButton'
import BasicInput from '@shared/components/Input/BasicInput'
import Loading from '@shared/components/Loading/Loading'
import EAuth from '@shared/enum/auth.enum'
import { FormService } from '@shared/services/form.service'
import AuthAction from '@store/admin/auth/auth.action'
import { useRouter } from 'next/router'

const style = {
    wrapper: ` box-border w-7/12  mx-auto bg-white h-96 rounded-xl drop-shadow-xl  `,
    loginContainer: `px-7 py-5`,
    header: `py-4 text-center `,
    textHeader: `antialiased text-3xl mx-auto leading-5 text-amber-600 font-bold`,
    button: `text-center align-middle mx-auto `,
}
const Login = () => {
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm()

    const dispatch = useDispatch()

    const isLoading = useSelector((state) => state.auth?.isLoading)
    console.log('isRequesting', isLoading)
    // const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()

    // const handleLogin = (formData) =>
    // {
    //     console.log("formData", formData)
    // }
    const onSubmitLogIn = async (formData) => {
        // setIsLoading(true)
        dispatch(AuthAction.setRequesting(true))
        const isEmail = formData?.username.includes('@')
        if (!isEmail) {
            const res = await dispatch(AuthAction.getCountryCode())

            const phoneNumber = formData?.username || ''
            let realNumber = ''
            const countryCode = `+${res?.data?.phoneCode}`
            const countryCodeWithoutPlus = res?.data?.phoneCode
            if (phoneNumber.startsWith(countryCode + '0')) {
                realNumber =
                    countryCode + phoneNumber.split(countryCode + '0')[1]
            } else if (phoneNumber.startsWith(countryCodeWithoutPlus)) {
                const tempNumber = phoneNumber.split(countryCodeWithoutPlus)[1]
                if (tempNumber && tempNumber.startsWith('0')) {
                    realNumber = countryCode + tempNumber.slice(1)
                } else realNumber = countryCode + tempNumber
            } else if (phoneNumber.startsWith('0')) {
                realNumber = countryCode + phoneNumber.slice(1)
            } else realNumber = phoneNumber

            const payload = {
                ...formData,
                username: realNumber,
            }
            handleLogin(payload)
        } else {
            handleLogin(formData)
        }
    }

    const handleLogin = async (payload) => {
        const res = await dispatch(AuthAction.login(payload))
        console.log('res', res)
        const { permissions } = res?.user
        dispatch(AuthAction.setRequesting(false))
        // setIsLoading(false)

        checkingRedirect(permissions)
    }
    const checkingRedirect = (permissions: string[]) => {
        if (permissions?.includes(EAuth.EAdminPermissions.LOGIN))
            return router.replace('/admin/dashboard')
        if (permissions?.includes(EAuth.EClientPermissions.LOGIN)) {
            return router.push('/404')
        }
    }

    return (
        <>
            <div className={style.wrapper}>
                <div className={style.loginContainer}>
                    <div className={style.header}>
                        <span className={style.textHeader}> Log In</span>
                    </div>
                    <form
                        onSubmit={handleSubmit(onSubmitLogIn)}
                        autoComplete="off"
                    >
                        <Controller
                            name="username"
                            control={control}
                            rules={{ required: true }}
                            render={({ field: { ref, onChange, value } }) => {
                                return (
                                    <BasicInput
                                        ref={ref}
                                        size="lg"
                                        label="User Name"
                                        className="my-5"
                                        value={value}
                                        onChange={onChange}
                                        helperText={FormService.getErrorMessage(
                                            errors,
                                            'username',
                                            'User Name',
                                        )}
                                    />
                                )
                            }}
                        />
                        <Controller
                            name="password"
                            control={control}
                            rules={{ required: true }}
                            render={({ field: { ref, onChange, value } }) => {
                                return (
                                    <BasicInput
                                        ref={ref}
                                        type="password"
                                        className="my-5"
                                        size="lg"
                                        label="Password"
                                        value={value}
                                        onChange={onChange}
                                        helperText={FormService.getErrorMessage(
                                            errors,
                                            'password',
                                            'Password',
                                        )}
                                    />
                                )
                            }}
                        />
                        <div className={style.button}>
                            <BasicButton
                                label="Log In"
                                size="md"
                                className="w-full"
                                color="orange"
                            />
                        </div>
                    </form>
                </div>
            </div>
            <Loading isLoading={isLoading} position="absolute" />
        </>
    )
}

Login.layout = BlankLayout

export default Login
