import { useEffect } from "react";

export const useOnClickOutside = (modalRef, handler) => {
	useEffect(() => {
		const listener = (event) => {
			// Do nothing if clicking ref's element or descendent elements
			if (!modalRef.current || modalRef.current.contains(event.target)) {
				return;
			}
			handler(event);
		};
		document.addEventListener("mousedown", listener);
		document.addEventListener("touchstart", listener);
		return () => {
			document.removeEventListener("mousedown", listener);
			document.removeEventListener("touchstart", listener);
		};
	}, [modalRef, handler]);
};
