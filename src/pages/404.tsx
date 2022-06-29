import Image from 'next/image'
import NotFoundImage from 'public/assets/background/404.svg'

const style = {
    wrapper: `h-full text-center`,
}
export default function Custom404() {
    return (
        <section className={style.wrapper}>
            <Image src={NotFoundImage} alt="404" height={806} width={554} />
        </section>
    )
}
