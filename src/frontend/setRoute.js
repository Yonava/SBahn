import { getShortestHVVPath } from './traverse.js';
import { localKeys } from './locals.js';
import { renderRoute } from './routeRenderer.js';
import { postTrip } from './api.js';
import { tripObserver } from './observers.js';

let lastOrigin = '';
let lastDestination = '';

export const setRoute = (origin, destination, postRoute = true) => {
  if (origin === lastOrigin && destination === lastDestination) return;
  const route = getShortestHVVPath(origin, destination);
  if (!route.length) return console.warn('No route found.');
  const routeContainer = document.querySelector('.journey-map-container');
  routeContainer.innerHTML = '';
  routeContainer.appendChild(renderRoute(route));
  localStorage.setItem(localKeys.currentOrigin, origin);
  localStorage.setItem(localKeys.currentDestination, destination);
  lastOrigin = origin;
  lastDestination = destination;

  if (!postRoute) return;

  const trip = {
    origin,
    destination,
    duration: route.length * 2
  };

  tripObserver.notify(trip);

  postTrip(trip)
    .then(() => console.log('Trip saved.'))
    .catch(err => console.error(err));
}