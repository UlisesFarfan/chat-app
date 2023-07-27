import { useEffect, useRef, useState } from "react";
import { ContextProps } from "../interfaces/Chat/chat.interface";
import { useOnClickOutSide } from "../hooks/useOnClickOutSide";

export default function ContextMenu({ context, closeMenu, children }: {
  context: ContextProps;
  children: any;
  closeMenu: () => void;
}) {
  const contextMenuRef = useRef<HTMLDivElement>(null)
  let { x, y } = context
  const isLeft = x > window?.innerWidth / 2;
  const isTop = y > window?.innerHeight / 2;

  const [contextMenuAttr, setContextMenuAttr] = useState(contextMenuRef.current?.getBoundingClientRect())
  const [view, setView] = useState(false)
  useEffect(() => {
    setContextMenuAttr(contextMenuRef.current?.getBoundingClientRect())
    setView(true)
  }, [contextMenuRef])

  let newX = contextMenuAttr ? isLeft ? x - contextMenuAttr!.width : x : -2200000;
  let newY = contextMenuAttr ? isTop ? y - contextMenuAttr!.height : y : -2200000;

  useOnClickOutSide(contextMenuRef, closeMenu)
  return (
    <div
      style={{ top: newY, left: newX }
      }
      className="absolute z-20 cursor-context-menu"
      ref={contextMenuRef}
    >
      {children}
    </div >
  )
}