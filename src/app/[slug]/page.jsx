import { Container } from '@/components/Index'
import { Title } from '@/components/Title'
import { BOOKS_LIST, SITENAME } from '@/constans'
import Image from 'next/image'
import { Bookmark } from 'lucide-react'
import cn from 'classname'

export async function generateMetadata({ params }) {
  const { slug } = await params
  const book = BOOKS_LIST.filter((book) => book.id == slug)
  if (book[0].title) {
    return {
      title: book[0].title,
      openGraph: {
        images: book[0].imageURL,
        title: book[0].title,
        description: book[0].description,
        url: `%s | ${SITENAME}`,
      },
    }
  } else {
    return {
      title: 'Не найдено',
    }
  }
}

export default async function BookPage({ params }) {
  const { slug } = await params
  const bookFiltered = BOOKS_LIST.filter((book) => book.id == slug)
  const book = bookFiltered[0]

  if (!book) return <Container>Error</Container>

  return (
    <div className={''}>
      <Container>
        <div className="flex gap-5">
          <div>
            <Image src={book.imageURL} width={438} height={438} alt={book.title} />
          </div>
          <div className="w-[100%]">
            <div className="flex items-center justify-between gap-15 leading-[52px]">
              <Title text={book.title} className={'text-[48px] font-[700] text-wrap'} />
              <div className="flex items-center gap-3 ">
                <p className="bg-primary text-white flex w-[32px] h-[32px] text-[14px] justify-center items-center font-[800] rounded-sm align-center">
                  {book.age + '+'}
                </p>
                <Bookmark className="text-primary" size={32} />
              </div>
            </div>
            <div className="mt-8">
              <div className="flex item-center justify-between text-gray ">
                <div>
                  <div className="flex item-center gap-2 ">
                    <Title text="Автор:" />
                    {book.authors.map((author, idx) => (
                      <p key={author.id} className=" cursor-pointer hover:underline">
                        {author.name} {idx + 1 != book.authors.length && ','}
                      </p>
                    ))}
                  </div>
                  <div className="flex item-center gap-2">
                    <Title text="Читает:" />
                    <div>
                      <p>{book.reads.name}</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 justify-center">
                  <div>
                    <Title
                      text={book.rating}
                      className={cn(
                        `${
                          book.rating < 5
                            ? 'text-red-500'
                            : book.rating < 9
                            ? 'text-primary'
                            : 'text-green-500'
                        }`,
                        'text-[42px] font-[700] ',
                      )}
                    />
                  </div>
                  <div className="flex align-center flex-col ">
                    <p className="text-white text-xs">Рейтинг аудитории</p>
                    <span className="text-gray text-xs">57889 оценок</span>
                  </div>
                </div>
              </div>
              <div className="mt-8">
                <p className="text-gray">{book.description}</p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}
