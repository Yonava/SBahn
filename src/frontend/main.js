import { renderRoute } from "./routeRenderer";

const mockUser = {
  id: 1,
  name: 'Yona',
  trips: [
    {
    origin: 'Blankenese',
    destination: 'Hauptbahnhof',
    duration: '30 minutes'
  },
  {
    origin: 'Blankenese',
    destination: 'Hauptbahnhof',
    duration: '30 minutes'
  },
  {
    origin: 'Blankenese',
    destination: 'Hauptbahnhof',
    duration: '30 minutes'
  },
  {
    origin: 'Blankenese',
    destination: 'Hauptbahnhof',
    duration: '30 minutes'
  }
]
}

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
    cardContainer.appendChild(tripDiv);
  });

  parentDiv.appendChild(cardContainer);
  return parentDiv;
}

const login = (user) => {
  const prevTripsDiv = document.querySelector('.previous-trips-container');
  console.log(`Welcome ${user.name}`);
  prevTripsDiv.innerHTML = '';
  prevTripsDiv.appendChild(pastTripsContent(user.trips));
}

loginBtn.addEventListener('click', () => {
  login(mockUser);
});

const mockRoute = [
  {
    station: 'Blankenese',
    line: 'S1'
  },
  {
    station: 'Altona',
    line: 'S1'
  },
  {
    station: 'Königstraße',
    line: 'S1'
  },
  {
    station: 'Reeperbahn',
    line: 'S1'
  },
  {
    station: 'Landungsbrücken',
    line: 'S1'
  },
  {
    station: 'Stadthausbrücke',
    line: 'S1'
  },
  {
    station: 'Jungfernstieg',
    line: 'S1'
  },
  {
    station: 'Hauptbahnhof',
    line: 'S1'
  }
]

const routeContainer = document.querySelector('.journey-map-container');
routeContainer.innerHTML = '';
routeContainer.appendChild(renderRoute(mockRoute));