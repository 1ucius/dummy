import {
  useRef,
  useLayoutEffect,
  useState,
  useEffect,
  useCallback,
} from 'react';
// import ResizeObserver from 'resize-observer-polyfill';

const useResizeObserver = target => {
  const [size, setSize] = useState();
  const [isResized, setIsResized] = useState(false);
  const [observerEntry, setObserverEntry] = useState({});
  const [node, setNode] = useState(null);
  const observer = useRef(null);

  const disconnect = useCallback(() => observer.current?.disconnect(), []);

  const observe = useCallback(() => {
    observer.current = new ResizeObserver(([entry]) => {
      setObserverEntry(entry);
      setSize(node.current.getBoundingClientRect());
      setIsResized(true);
    });
    observer.current.observe(node.current);
  }, [node]);

  useEffect(() => {
    if (isResized) setIsResized(false);
  }, [isResized]);

  useEffect(() => {
    if (!node && target) setNode(target);
  }, [target, node]);

  useLayoutEffect(() => {
    if (node) observe();

    return () => {
      disconnect();
    };
  }, [disconnect, observe, node]);

  return [isResized, size, observerEntry];
};

export default useResizeObserver;
