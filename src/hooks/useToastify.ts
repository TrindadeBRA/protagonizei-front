import Toastify from 'toastify-js'

let toastCssPromise: Promise<unknown> | null = null

const ensureToastStyles = () => {
  if (!toastCssPromise) {
    toastCssPromise = import('toastify-js/src/toastify.css')
  }
  return toastCssPromise
}

export async function successToast(message: string) {
    await ensureToastStyles()
    Toastify({
        text: message,
        duration: 5000,
        close: true,
        gravity: "top",
        offset: {
          x: 0,
          y: 80,
        },
        position: "right",
        stopOnFocus: true,
        style: {
          background: "linear-gradient(to right, #672873, #9a5183, #cc2e4a, #dd5736, #e37d4f, #e7ae24)",
          color: "white",
          fontWeight: "bold",
          fontFamily: "Inter",
          fontSize: "0.8rem",
        },
        onClick: function(){}
      }).showToast();
}

export async function errorToast(message: string) {
    await ensureToastStyles()
    Toastify({
        text: message,
        duration: 5000,
        close: true,
        gravity: "top",
        offset: {
          x: 0,
          y: 80,
        },
        position: "right",
        stopOnFocus: true,
        style: {
          background: "linear-gradient(to right, #f00, #f00)",
          color: "white",
          fontWeight: "bold",
          fontFamily: "Inter",
          fontSize: "0.8rem",
        },
        onClick: function(){}
      }).showToast();
}