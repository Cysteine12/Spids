import { useFormStatus } from 'react-dom'
import type { MouseEventHandler, ReactNode } from 'react'

interface Props {
  children?: ReactNode
  onClick?: MouseEventHandler
  type?: 'button' | 'submit'
  loading?: boolean
  disabled?: boolean
  text?: string | ReactNode
  className?: string
}

const Button = ({
  children,
  onClick,
  type = 'button',
  loading = false,
  disabled = false,
  text,
  className,
}: Props) => {
  const { pending } = useFormStatus()

  return (
    <button
      type={type}
      className={`flex items-center rounded border p-1 text-white hover-cursor-pointer ${className}`}
      disabled={disabled || pending}
      onClick={onClick}
    >
      {loading || pending ? (
        <i className={`fas fa-spinner fa-pulse fa-spin text-white`}></i>
      ) : (
        children || text
      )}
    </button>
  )
}
export default Button
