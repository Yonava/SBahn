import { setRoute } from './setRoute.js';
import { localKeys } from './locals.js';
import { getUserByName } from './api.js';

const mockUsers = [{
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
}]

export const login = async (username) => {
  const user = await getUserById(username);
  if (!user) return console.warn('User not found.');
  console.log('user found', user);
  const prevTripsDiv = document.querySelector('.previous-trips-container');
  prevTripsDiv.innerHTML = '';
  const loggedInViewContent = loggedInView(user.trips);
  prevTripsDiv.appendChild(loggedInViewContent);
  localStorage.setItem(localKeys.username, username);
}

const loggedInView = (trips) => {
  const parentDiv = document.createElement('div');
  parentDiv.className = 'past-trips';

  const title = document.createElement('h1');
  title.textContent = 'Previous Trips';
  parentDiv.appendChild(title);

  const cardContainer = document.createElement('div');
  cardContainer.className = 'past-trips-card-container';

  const originInput = document.getElementById('start');
  const destinationInput = document.getElementById('end');

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

export const initLoginModal = () => {

  let showingModal = false;

  const modalBg = document.createElement('div');
  const modal = document.createElement('div');
  document.body.appendChild(modalBg);
  modalBg.appendChild(modal);

  const title = document.createElement('h1');
  title.textContent = 'What is your name?';
  modal.appendChild(title);

  const input = document.createElement('input');
  input.placeholder = 'Enter your username';
  input.className = 'login-input';
  modal.appendChild(input);

  const submitBtn = document.createElement('button');
  submitBtn.textContent = 'Login';
  submitBtn.addEventListener('click', async () => {
    const username = input.value;
    if (!username) {
      input.style.outline = '1px solid red';
      setTimeout(() => input.style.outline = 'blue', 1000);
      input.focus();
      return;
    }
    login(username);
    toggleModal();
  });
  modal.appendChild(submitBtn);

  const toggleModal = () => {
    modalBg.style.opacity = showingModal ? 0 : 1;
    modalBg.style.pointerEvents = showingModal ? 'none' : 'all';
    showingModal = !showingModal;
  }

  modalBg.className = 'login-modal-bg';
  modalBg.onclick = toggleModal;

  modal.className = 'login-modal';
  modal.onclick = (e) => e.stopPropagation();

  return toggleModal;
}