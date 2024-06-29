import { getShortestHVVPath } from './traverse.js';
import { localKeys } from './locals.js';
import { renderRoute } from './routeRenderer.js';
import { postTrip } from './api.js';

export const setRoute = (origin, destination) => {
  const route = getShortestHVVPath(origin, destination);
  if (!route.length) return console.warn('No route found.');
  const routeContainer = document.querySelector('.journey-map-container');
  routeContainer.innerHTML = '';
  routeContainer.appendChild(renderRoute(route));
  localStorage.setItem(localKeys.currentOrigin, origin);
  localStorage.setItem(localKeys.currentDestination, destination);

  postTrip({
    origin,
    destination,
    duration: route.length * 2
  })
    .then(() => console.log('Trip saved.'))
    .catch(err => console.error(err));
}