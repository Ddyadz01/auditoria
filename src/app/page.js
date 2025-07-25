import { Container } from '@/components/Index'
import { Title } from '@/components/Title'
import { BOOKS_LIST } from '@/constans'

import Image from 'next/image'
import Link from 'next/link'
export default function Home() {
  return (
    <div className="">
      <Container className={'flex justify-between gap-5'}>
        {BOOKS_LIST.map((book) => (
          <Link href={`${book.id}`} key={book.id} className="">
            <Title text={book.title} />
            <Image src={book.imageURL} width={250} height={250} alt={book.title} />
          </Link>
        ))}
      </Container>
    </div>
  )
}
