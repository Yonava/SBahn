import { SBahn } from './sbahn';
import { stations, graph, stationToLine } from './stations';

/**
 * Returns the shortest path between two stations using the HVV API.
 * @param {string} start - The starting station.
 * @param {string} end - The destination station.
 * @returns {Array<{ station: string, line: SBahn }>} - The shortest path between the two stations to be fed into the route renderer.
*/
export const getShortestHVVPath = (start, end) => {

  if (!graph.get(start) || !graph.get(end)) {
    return [];
  }

  const queue = [start];
  const visited = new Set();
  const predecessors = new Map();

  while (queue.length) {
    const currStation = queue.shift();
    if (visited.has(currStation)) continue;

    visited.add(currStation);
    if (currStation === end) break;

    for (const neighbor of graph.get(currStation)) {
      if (!visited.has(neighbor)) {
        queue.push(neighbor);
        predecessors.set(neighbor, currStation);
      }
    }
  }

  const trace = [];
  let step = end;
  while (step !== undefined) {
    trace.push(step);
    step = predecessors.get(step);
  }

  // performs in-place
  trace.reverse();

  let [ currentLine ] = stationToLine.get(trace[1] ?? end);

  return trace
    .map((station, i) => {
      const possibleLines = stationToLine.get(trace[i + 1] ?? end);
      const transferNecessary = !possibleLines.includes(currentLine);
      if (transferNecessary) currentLine = possibleLines[0];
      return { station, line: currentLine };
    })
};