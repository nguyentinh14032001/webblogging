import { useEffect, useRef, useState } from "react";

export default function useClickOutSide(dom = "button") {
  const [show, setShow] = useState(false);
  const nodeRef = useRef(null);

  useEffect(() => {
    function handleClick(e) {
      if (
        nodeRef.current &&
        !nodeRef.current.contains(e.target) &&
        !e.target.matches(dom)
      ) {
        console.log(e.target);
        setShow(false);
      } else {
        console.log("button");
      }
    }
    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);
  return {
    show,
    setShow,
    nodeRef,
  };
}
