import { setRoute } from './setRoute.js';
import { localKeys } from './locals.js';
import { getUserByName, createUser } from './api.js';
import { loginObserver, tripObserver, logoutObserver } from './observers.js';

export const login = async (username) => {
  const user = await getUserByName(username);
  if (!user) return;
  console.log('user found', user);
  localStorage.setItem(localKeys.username, username);
  loggedInView(user.trips);
  loginObserver.notify(user);
  return user;
}

export const loggedInView = (trips) => {
  const render = () => {
    const prevTripsDiv = document.querySelector('.previous-trips-container');
    prevTripsDiv.innerHTML = '';

    const parentDiv = document.createElement('div');
    parentDiv.className = 'past-trips';

    const title = document.createElement('h1');
    title.textContent = `Previous Trips (${trips.length})`;
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
    <p>Duration: ${trip.duration} minutes</p>
    `
      tripDiv.addEventListener('click', () => {
        originInput.value = trip.origin;
        destinationInput.value = trip.destination;
        setRoute(trip.origin, trip.destination, false);
      });
      cardContainer.appendChild(tripDiv);
    });

    parentDiv.appendChild(cardContainer);
    prevTripsDiv.appendChild(parentDiv);
  }

  const addTrip = (trip) => {
    trips.unshift(trip);
    render();
  }

  render();

  tripObserver.subscribe(addTrip);
}

export const logout = () => {
  localStorage.clear();
  renderLoggedOutView();
  logoutObserver.notify();
}

const renderLoggedOutView = () => {
  const prevTripsDiv = document.querySelector('.previous-trips-container');
  prevTripsDiv.innerHTML = '';

  const notLoggedInDiv = document.createElement('div');
  notLoggedInDiv.className = 'not-logged-in';
  notLoggedInDiv.innerHTML = `
    <p>Log in to retain previous journeys</p>
    <button class="login-button">sign in</button>
  `;
  const loginBtn = notLoggedInDiv.querySelector('.login-button');
  const toggleModal = initLoginModal();
  loginBtn.addEventListener('click', toggleModal);
  prevTripsDiv.appendChild(notLoggedInDiv);
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
    const loggedInUser = await login(username);
    if (!loggedInUser) {
      await createUser({
        name: username,
        trips: []
      })
      login(username);
    }
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