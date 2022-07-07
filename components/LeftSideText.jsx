
export default function LeftSideText({children, className, ...props}) {
  return (
    <div className={className}>
      <div className="w-11/12" {...props}>{children}</div>
    </div>
  )
}
