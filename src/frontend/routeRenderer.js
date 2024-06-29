import { isStationImportant } from './stations.js';
// format:
// route = [
//   {
//      station: 'Blankenese',
//      line: SBahn.S1,
// ]
// returns div to be attached to the DOM

/**
 * @param {Array<{station: string, line: string}>} route
 * @returns {HTMLDivElement}
 * @example renderRoute([{station: 'Blankenese', line: SBahn.S1}])
 */
export const renderRoute = (route) => {
  const parentDiv = document.createElement('div');

  parentDiv.className = 'route';

  for (const { station, line } of route) {
    const stationDiv = document.createElement('div');
    stationDiv.className = 'station';

    const stationNotch = document.createElement('div');
    stationNotch.className = 'station-notch';
    stationNotch.classList.add(`bg-${line.toLowerCase()}`);
    stationDiv.appendChild(stationNotch);

    const stationName = document.createElement('div');
    stationName.className = 'station-name';
    if (isStationImportant(station)) {
      stationName.style.fontWeight = 'bold';
    }
    stationName.textContent = station;
    stationDiv.appendChild(stationName);

    parentDiv.appendChild(stationDiv);
  }

  return parentDiv;
}