import React from "react"

export default function TextBody({children, className, ...props}) {
  if(!Array.isArray(children)) {
    children = [children]
  }
  return (
    <div className={["text-xl body-font", className].filter(String).join(" ")} {...props}>
      {children.map((child) => {
        return React.cloneElement(child, {className: [child.props.className, "px-[15%] sm:px-[20%] lg:px-[25%]"].filter(String).join(" ")})
      })}
    </div>
  )
}
