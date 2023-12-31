import { useEffect, useState } from "react";
import { IToast } from "../../types/toaster";
import { createPortal } from "react-dom";
import { useToaster } from "../Context/ToasterContext";

function Toaster() {
  // States
  const { toasts, setToasts } = useToaster();
  const [localToasts, setLocalToasts] = useState<IToast[]>([]);

  // Close toast
  const closeToast = (i: number) => {
    setLocalToasts((localToasts) =>
      localToasts.filter((_, index) => index !== i)
    );
  };

  // Hooks
  useEffect(() => {
    if (toasts.length > 0) {
      setLocalToasts([...localToasts, ...toasts]);
      setToasts([]);
      toasts.forEach((_: IToast, i: number) => {
        setTimeout(() => {
          closeToast(i);
        }, 3000);
      });
    }
  }, [toasts, setToasts, localToasts]);

  if (!localToasts.length) return;

  return createPortal(
    <div className="fixed right-0 top-0 flex max-w-full flex-col gap-2 p-4 z-50 font-[500]">
      {localToasts.map((toast, i) => (
        <div
          className={`flex justify-between items-start gap-4 text-white rounded-lg p-4 shadow-md max-w-sm bg-opacity-95 ${
            toast.type > 0 ? "bg-emerald-400" : "bg-red-400"
          }`}
          key={i}
        >
          <span className="break-words max-w-full">{toast.message}</span>
          <button onClick={() => closeToast(i)}>
            <span className="ic">close</span>
          </button>
        </div>
      ))}
    </div>,
    document.body
  );
}

export default Toaster;
