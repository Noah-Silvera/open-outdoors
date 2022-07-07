import LeftSideText from "./LeftSideText";

export default function RightSideText({children, className, ...props}) {
  return (
    <div className={className}>
      <div className="w-11/12 ml-auto text-right" {...props}>{children}</div>
    </div>
  )
}
