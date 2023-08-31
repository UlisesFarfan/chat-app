import { useState } from "react";

export default function Tooltip({ children, tooltip }: any) {
  const [show, setShow] = useState<boolean>(false)

  return (
    <div
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
      onClick={() => setShow(false)}
      className="relative"
    >
      {children}
      {show && <span className="absolute top-0 left-[100%] rounded-md p-1 bg-white border whitespace-nowrap">{tooltip}</span>}
    </div>
  );
};