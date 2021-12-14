import { useEffect } from 'react';

function useClickOutside(ref, onClickOutside, ignore = []) {
  useEffect(() => {
    if (!onClickOutside || !ref || !ref.current) return;

    function handleClickOutside(event) {
      if (!ref || !ref.current) return;

      const ignoredCheck = ignore.length
        ? !ignore.some(element => element && element.contains(event.target))
        : true;

      if (ref.current && !ref.current.contains(event.target) && ignoredCheck) {
        onClickOutside();
      }
    }

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref, onClickOutside, ignore]);
}

export default useClickOutside;
