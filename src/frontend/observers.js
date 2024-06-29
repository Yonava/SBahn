// observers for tracking events and updating the UI

const observer = () => {
  const subscribers = [];
  const subscribe = (fn) => subscribers.push(fn);
  const notify = (data) => subscribers.forEach(fn => fn(data));
  return { subscribe, notify };
}

export const tripObserver = observer();
export const loginObserver = observer();
export const logoutObserver = observer();