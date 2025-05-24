import { useEffect } from "react";

const useBodyScrollLock = () => {
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);
};

export default useBodyScrollLock;
