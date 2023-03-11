import React from "react";
import useEscapeKeyDown from "../../hooks/escape-key-down";

function removeElementFromList(arr, id) {
  const objWithIdIndex = arr.findIndex((obj) => obj.id === id);
  arr.splice(objWithIdIndex, 1);
  return arr;
}

export const ToastContext = React.createContext();

function ToastProvider({ children }) {
  const escFunction = React.useCallback((event) => {
    if (event.key === "Escape") {
      setToasts([]);
    }
  }, []);

  useEscapeKeyDown(escFunction);

  const [toasts, setToasts] = React.useState([]);

  function removeHandler(id) {
    let newToasts = [...toasts];
    newToasts = removeElementFromList(newToasts, id);
    setToasts(newToasts);
  }

  function createToast(variant, message) {
    const toast = {
      variant,
      message,
      id: crypto.randomUUID(),
    };
    const newToasts = [...toasts];
    newToasts.push(toast);
    setToasts(newToasts);
  }

  return (
    <ToastContext.Provider
      value={{
        toasts,
        removeHandler,
        createToast,
      }}
    >
      {children}
    </ToastContext.Provider>
  );
}

export default ToastProvider;
