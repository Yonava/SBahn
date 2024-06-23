import { SBahn } from './sbahn.js'
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
const renderRoute = (route) => {
  const parentDiv = document.createElement('div');

  for (const { station, line } of route) {}
}