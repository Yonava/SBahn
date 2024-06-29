import { loginObserver, logoutObserver } from './observers';
import { logout } from './login';

const logoutBtn = () => {
  const logoutBtn = document.createElement('button');
  logoutBtn.innerText = 'Logout';
  logoutBtn.className = 'logout-button';
  logoutBtn.addEventListener('click', logout);
  return logoutBtn;
}

const mountLogoutBtn = () => {
  const containerDiv = document.querySelector('.hvv-map-container');
  containerDiv.appendChild(logoutBtn());
}

const unmountLogoutBtn = () => {
  const logoutBtn = document.querySelector('.logout-button');
  if (logoutBtn) logoutBtn.remove();
}

loginObserver.subscribe(mountLogoutBtn);
logoutObserver.subscribe(unmountLogoutBtn);