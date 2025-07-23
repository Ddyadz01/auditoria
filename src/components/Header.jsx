import cn from 'classnames'
import Image from 'next/image'
import { Container } from './Index'
import Link from 'next/link'

export const Header = ({ className }) => {
  return (
    <div className={cn('h-[126px] flex items-center', className)}>
      <Container className={'flex items-center justify-between'}>
        <div>
          <Link href="/">
            <Image src="/logo.png" width={267} height={31} alt="logo" />
          </Link>
        </div>
        <nav>
          <ul className="flex items-center gap-10">
            <li>
              <Link href="/">Как купить</Link>
            </li>
            <li>
              <Link href="/">F.A.Q</Link>
            </li>
            <li>
              <Link href="/">Контакты</Link>
            </li>
          </ul>
        </nav>
        <div className="flex items-center gap-8">
          <button className="text-primary border-1  p-2 px-4 rounded-sm cursor-pointer">
            Регистрация
          </button>
          <button className="text-white bg-primary  p-2 px-4 rounded-sm cursor-pointer">
            Войти
          </button>
        </div>
      </Container>
    </div>
  )
}
