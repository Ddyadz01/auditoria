import cn from 'classnames'

export const Container = ({ className, children }) => {
  return <div className={cn('w-[1202px] m-auto', className)}>{children}</div>
}
