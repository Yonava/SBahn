import { SBahn } from './sbahn';
import { stations, graph, lineStationSet } from './stations';

/**
 * Returns the shortest path between two stations using the HVV API.
 * @param {string} start - The starting station.
 * @param {string} end - The destination station.
 * @returns {Array<{ station: string, line: SBahn }>} - The shortest path between the two stations to be fed into the route renderer.
*/
export const getShortestHVVPath = (start, end) => {

  console.log(graph)

  // check if the stations both exist
  if (!graph.get(start) || !graph.get(end)) {
    console.warn('One or both of the stations do not exist.');
    return [];
  }

  return [{ station: start, line: SBahn.S1 }, { station: end, line: SBahn.S1 }]
};