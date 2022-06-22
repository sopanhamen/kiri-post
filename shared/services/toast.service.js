import { Slide,toast } from "react-toastify";


export const success = (message) =>
	toast.success(message, {
		position: "bottom-right",
		autoClose: 5000,
		hideProgressBar: false,
		closeOnClick: false,
		pauseOnHover: true,
		draggable: true,
		progress: undefined,
		transition: Slide,
	});

export const error = (message) =>
	toast.error(message, {
		position: "bottom-right",
		autoClose: 5000,
		hideProgressBar: false,
		closeOnClick: false,
		pauseOnHover: true,
		draggable: true,
		progress: undefined,
		transition: Slide,
	});

const ToastService = {
	success,
	error,
};

export default ToastService;
