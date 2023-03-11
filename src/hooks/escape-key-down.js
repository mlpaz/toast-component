// hooks/escape-key-down.js
import React from "react";

function useEscapeKeyDown(escFunction) {
  React.useEffect(() => {
    document.addEventListener("keydown", escFunction, false);

    return () => {
      document.removeEventListener("keydown", escFunction, false);
    };
  }, [escFunction]);
}

export default useEscapeKeyDown;
