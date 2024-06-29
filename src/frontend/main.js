import { renderRoute } from "./routeRenderer";
import { getShortestHVVPath } from "./traverse";
import { localKeys } from "./locals";

const mockUser = {
  id: 1,
  name: 'Yona',
  trips: [
    {
    origin: 'Blankenese',
    destination: 'Pinneberg',
    duration: '30 minutes'
  },
  {
    origin: 'Berliner Tor',
    destination: 'Hauptbahnhof',
    duration: '30 minutes'
  },
  {
    origin: 'Harburg Rathaus',
    destination: 'Bergedorf',
    duration: '30 minutes'
  },
  {
    origin: 'Blankenese',
    destination: 'Hauptbahnhof',
    duration: '30 minutes'
  }
]
}

const originInput = document.getElementById('start');
const destinationInput = document.getElementById('end');

const loginBtn = document.querySelector('.login-button');

const pastTripsContent = (trips) => {
  const parentDiv = document.createElement('div');
  parentDiv.className = 'past-trips';

  const title = document.createElement('h1');
  title.textContent = 'Previous Trips';
  parentDiv.appendChild(title);

  const cardContainer = document.createElement('div');
  cardContainer.className = 'past-trips-card-container';

  trips.forEach(trip => {
    const tripDiv = document.createElement('div');
    tripDiv.className = 'past-trip-card';
    tripDiv.innerHTML = `
    <h3>${trip.origin} - ${trip.destination}</h3>
    <p>Duration: ${trip.duration}</p>
    `
    tripDiv.addEventListener('click', () => {
      originInput.value = trip.origin;
      destinationInput.value = trip.destination;
      setRoute(trip.origin, trip.destination);
    });
    cardContainer.appendChild(tripDiv);
  });

  parentDiv.appendChild(cardContainer);
  return parentDiv;
}

const login = (user) => {
  const prevTripsDiv = document.querySelector('.previous-trips-container');
  alert(`Welcome ${user.name}`);
  prevTripsDiv.innerHTML = '';
  prevTripsDiv.appendChild(pastTripsContent(user.trips));
  localStorage.setItem(localKeys.loggedInUser, JSON.stringify(user));
}

loginBtn.addEventListener('click', () => {
  login(mockUser);
});

const setRoute = (origin, destination) => {
  const route = getShortestHVVPath(origin, destination);
  if (!route.length) return console.warn('No route found.');
  const routeContainer = document.querySelector('.journey-map-container');
  routeContainer.innerHTML = '';
  routeContainer.appendChild(renderRoute(route));
  localStorage.setItem(localKeys.currentOrigin, origin);
  localStorage.setItem(localKeys.currentDestination, destination);
}

originInput.addEventListener('keyup', (e) => {
  setRoute(e.target.value, destinationInput.value);
});

destinationInput.addEventListener('keyup', (e) => {
  setRoute(originInput.value, e.target.value);
});

const currentOrigin = localStorage.getItem(localKeys.currentOrigin);
const currentDestination = localStorage.getItem(localKeys.currentDestination);

if (currentOrigin && currentDestination) {
  originInput.value = currentOrigin;
  destinationInput.value = currentDestination;
  setRoute(currentOrigin, currentDestination);
}

const loggedInUser = localStorage.getItem(localKeys.loggedInUser);
if (loggedInUser) {
  login(JSON.parse(loggedInUser));
}