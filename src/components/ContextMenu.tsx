import { useRef } from "react";
import { ContextProps } from "../interfaces/Chat/chat.interface";
import { useOnClickOutSide } from "../hooks/useOnClickOutSide";

export default function ContextMenu({ context, closeMenu, children }: {
  context: ContextProps;
  children: any;
  closeMenu: () => void;
}) {
  const contextMenuRef = useRef<HTMLDivElement>(null)
  const { x, y } = context
  useOnClickOutSide(contextMenuRef, closeMenu)
  return (
    <div
      style={{ top: y, left: x }}
      className="absolute z-20 cursor-context-menu"
      ref={contextMenuRef}
    >
      {children}
    </div>
  )
}