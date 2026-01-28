import Toastify from 'toastify-js'


export function successToast(message: string) {
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
          background: "linear-gradient(to right, rgba(196, 181, 253, 0.6), rgba(251, 207, 232, 0.5), rgba(191, 219, 254, 0.6))",
          color: "#1f2937",
          fontWeight: "bold",
          fontFamily: "Inter",
          fontSize: "0.8rem",
          border: "2px solid rgba(244, 114, 182, 0.4)",
        },
        onClick: function(){}
      }).showToast();
}

export function errorToast(message: string) {
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
          background: "linear-gradient(to right, rgba(196, 181, 253, 0.6), rgba(251, 207, 232, 0.5), rgba(191, 219, 254, 0.6))",
          color: "#dc2626",
          fontWeight: "bold",
          fontFamily: "Inter",
          fontSize: "0.8rem",
          border: "2px solid rgba(244, 114, 182, 0.4)",
        },
        onClick: function(){}
      }).showToast();
}
