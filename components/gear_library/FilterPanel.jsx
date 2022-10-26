import { CSSTransition } from "react-transition-group"
import { disableHideOnScroll, enableHideOnScroll, GlobalPubSub } from '../utils';
import styles from '../../styles/GearLibrary.module.scss'
import { useRef, useState } from 'react'
import classNames from "classnames";

export default function FilterPanel({ children }) {
  const [isOpen, setIsOpen] = useState(false)
  const childContainer = useRef(null)
  const [navBarClosed, setNavBarClosed] = useState(false)

  GlobalPubSub.subscribe("hidden-on-scroll", (args) => {
    if(args.identifer == "nav") {
      setNavBarClosed(true)
    }
  })

  GlobalPubSub.subscribe("shown-on-scroll", (args) => {
    if(args.identifer == "nav") {
      setNavBarClosed(false)
    }
  })

  return (
    <div className={classNames(
      styles["sticky-filter-panel"],
      'z-10',
      {
        [styles["nav-bar-closed"]] : navBarClosed
      }
    )}>
      <div
        className='text-2xl px-6 py-3 bg-tertiary-light flex flex-row items-center border-y-2  border-y-tertiary-light/60'
        onClick={() => setIsOpen(!isOpen)}
      >
        <p>Filter</p>
        <i className={classNames(
          "fas",
          "grow",
          "text-right",
          {"fa-arrow-up": isOpen},
          {"fa-arrow-down": !isOpen}
          )}></i>
      </div>
      <CSSTransition
        in={isOpen}
        nodeRef={childContainer}
        timeout={300}
        onEnter={() => disableHideOnScroll("nav")}
        onExited={() => enableHideOnScroll("nav")}
        classNames={{
          enter: styles["gear-filter-enter"],
          enterActive: styles["gear-filter-enter-active"],
          enterDone: styles["gear-filter-enter-done"],
          exit: styles["gear-filter-exit"],
          exitActive: styles["gear-filter-exit-active"],
          exitDone: styles["gear-filter-exit-done"],
        }}>
          <div ref={childContainer} className={styles["gear-filter"]}>
            {children}
          </div>
        </CSSTransition>
    </div>
  )
}
