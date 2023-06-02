import { RefObject, useEffect } from "react"

export const useOnClickOutSide = <T extends HTMLElement = HTMLElement>(
  ref: RefObject<T>,
  handler: (e: Event) => void
) => {
  useEffect(() => {
    const listener = (e: Event) => {
      const el = ref?.current
      if (!el || el.contains((e?.target as Node) || null)) {
        return
      }
      handler(e)
    }

    document.addEventListener('mousedown', listener)
    document.addEventListener('touchstart', listener)

    return () => {
      document.addEventListener('mousedown', listener)
      document.addEventListener('touchstart', listener)
    }

  }, [ref, handler])
}