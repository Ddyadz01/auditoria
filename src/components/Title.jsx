import cn from 'classnames'

export const Title = ({ className, text }) => {
  return <h1 className={cn('', className)}>{text}</h1>
}
