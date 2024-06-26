import './logoutBtn';
import { login, logout } from "./login";
import { localKeys } from "./locals";
import { setRoute } from "./setRoute";

const originInput = document.getElementById('start');
const destinationInput = document.getElementById('end');

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
  setRoute(currentOrigin, currentDestination, false);
}

const loggedInUser = localStorage.getItem(localKeys.username);
if (loggedInUser) {
  login(loggedInUser);
} else {
  logout();
}