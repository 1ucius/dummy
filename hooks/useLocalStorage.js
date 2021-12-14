import { useCallback, useEffect, useState } from 'react';

const TEST_KEY = '@@test';

function isStorageAvailable(storage) {
  try {
    storage.setItem(TEST_KEY, TEST_KEY);
    storage.removeItem(TEST_KEY);
    return true;
  } catch (error) {
    if (process.env.NODE_ENV !== 'production') {
      console.error(error);
    }
    return false;
  }
}

function createMemoryStorage() {
  const memoryStorage = new Map();
  function getItem(key) {
    return memoryStorage.get(key);
  }
  function setItem(key, value) {
    memoryStorage.set(key, value);
  }
  function removeItem(key) {
    memoryStorage.delete(key);
  }
  return {
    getItem,
    setItem,
    removeItem,
  };
}

function createObservableStorage(storage) {
  const subscribers = [];
  function getItem(key) {
    return storage.getItem(key);
  }
  function setItem(key, value) {
    storage.setItem(key, value);
    notify();
  }
  function removeItem(key) {
    storage.removeItem(key);
    notify();
  }
  function subscribe(subscriber) {
    subscribers.push(subscriber);
    let subscribed = true;
    return () => {
      if (subscribed) {
        const index = subscribers.indexOf(subscriber);
        if (~index) {
          subscribers.splice(index, 1);
        }
        subscribed = false;
      }
    };
  }
  function notify() {
    const currentSubscribers = subscribers.slice();
    while (currentSubscribers.length) {
      try {
        const subscriber = currentSubscribers.pop();
        subscriber();
      } catch (error) {
        if (process.env.NODE_ENV !== 'production') {
          console.error(error);
        }
      }
    }
  }
  return {
    getItem,
    setItem,
    removeItem,
    subscribe,
  };
}

const storage = createObservableStorage(
  isStorageAvailable(window.localStorage)
    ? window.localStorage
    : createMemoryStorage()
);

export function useLocalStorage(
  key,
  {
    initialItem = '',
    parseItem = JSON.parse,
    stringifyItem = JSON.stringify,
  } = {}
) {
  const getItem = useCallback(() => {
    const value = storage.getItem(key);

    if (value != null) {
      try {
        return parseItem(value);
      } catch (error) {
        return initialItem;
      }
    }

    return initialItem;
  }, [key, initialItem, parseItem]);

  const [item, updateItem] = useState(getItem);

  const setItem = useCallback(
    value => storage.setItem(key, stringifyItem(value)),
    [key, stringifyItem]
  );

  const removeItem = useCallback(() => storage.removeItem(key), [key]);

  const handleNext = useCallback(() => {
    updateItem(getItem);
  }, [getItem]);

  useEffect(() => storage.subscribe(handleNext), [handleNext]);

  return [item, setItem, removeItem];
}

export default useLocalStorage;
