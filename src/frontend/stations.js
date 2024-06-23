
// Stations
// - name: string station name
// - time: time it takes to get to the next station on the line in minutes

const cityMainTunnel = [
  { name: 'Altona', time: 2 },
  { name: 'Königstraße', time: 2 },
  { name: 'Repeerbahn', time: 2 },
  { name: 'Landungsbrücken', time: 2 },
  { name: 'Stadthausbrücke', time: 2 },
  { name: 'Jungfernstieg', time: 2 },
  { name: 'Hauptbahnhof', time: 2 }
]

const dammtorWay = [
  { name: 'Holstenstraße', time: 2 },
  { name: 'Sternschanze', time: 2 },
  { name: 'Dammtor', time: 2 },
  { name: 'Hauptbahnhof', time: 2 }
]

const s1 = [
  { name: 'Wedel', time: 2 },
  { name: 'Rissen', time: 2 },
  { name: 'Sulldorf', time: 2 },
  { name: 'Iserbrook', time: 2 },
  { name: 'Blankenese', time: 2 },
  { name: 'Hochkamp', time: 2 },
  { name: 'Klein Flottbek', time: 2 },
  { name: 'Othmarschen', time: 2 },
  { name: 'Bahrenfeld', time: 2 },
  { name: 'Ottensen', time: 2 },
  ...cityMainTunnel,
  { name: 'Berliner Tor', time: 2 },
  { name: 'Landwehr', time: 2 },
  { name: 'Hasselbrook', time: 2 },
  { name: 'Wansbecker Chaussee', time: 2 },
  { name: 'Freidrichsberg', time: 2 },
  { name: 'Barmbek', time: 2 },
  { name: 'Alte Wöhr', time: 2 },
  { name: 'Rübenkamp', time: 2 },
  { name: 'Ohlsdorf', time: 2 },
]

export const stations = {
  s1a: [
    ...s1,
    { name: 'Hamburg Airport', time: 0 },
  ],
  s1p: [
    ...s1,
    { name: 'Kornweg', time: 2 },
    { name: 'Hoheneichen', time: 2 },
    { name: 'Wellingsbüttel', time: 2 },
    { name: 'Poppenbüttel', time: 0 },
  ],
  s2: [
    { name: 'Altona', time: 2 },
    ...dammtorWay,
    { name: 'Berliner Tor', time: 2 },
    { name: 'Rothenburgsort', time: 2 },
    { name: 'Tiefstack', time: 2 },
    { name: 'Billwerder-Moorfleet', time: 2 },
    { name: 'Mittlerer Landweg', time: 2 },
    { name: 'Allermöhe', time: 2 },
    { name: 'Nettelnburg', time: 2 },
    { name: 'Bergedorf', time: 2 },
    { name: 'Reinbek', time: 2 },
    { name: 'Wohltorf', time: 2 },
    { name: 'Aumühle', time: 2 },
  ],
  s3: [
    { name: 'Pinneberg', time: 2 },
    { name: 'Thesdorf', time: 2 },
    { name: 'Halstenbek', time: 2 },
    { name: 'Krupunder', time: 2 },
    { name: 'Elbgaustraße', time: 2 },
    { name: 'Eidelstedt', time: 2 },
    { name: 'Stellingen', time: 2 },
    { name: 'Langenfelde', time: 2 },
    { name: 'Diebsteich', time: 2 },
    ...cityMainTunnel,
    { name: 'Hammerbrook', time: 2 },
    { name: 'Elbbrücken', time: 2 },
    { name: 'Veddel', time: 2 },
    { name: 'Wilhelmsburg', time: 2 },
    { name: 'Harburg', time: 2 },
    { name: 'Harburg Rathaus', time: 2 },
    { name: 'Heimfeld', time: 2 },
    { name: 'Neuwiedenthal', time: 2 },
    { name: 'Neugraben', time: 0 },
  ],
  s5: [
    { name: 'Elbgaustraße', time: 2 },
    { name: 'Eidelstedt', time: 2 },
    { name: 'Stellingen', time: 2 },
    { name: 'Langenfelde', time: 2 },
    { name: 'Diebsteich', time: 2 },
    ...dammtorWay,
    { name: 'Hammerbrook', time: 2 },
    { name: 'Elbbrücken', time: 2 },
    { name: 'Veddel', time: 2 },
    { name: 'Wilhelmsburg', time: 2 },
    { name: 'Harburg', time: 2 },
    { name: 'Harburg Rathaus', time: 2 },
    { name: 'Heimfeld', time: 2 },
    { name: 'Neuwiedenthal', time: 2 },
    { name: 'Neugraben', time: 2 },
    { name: 'Fischbek', time: 2 },
    { name: 'Neu Wulmstorf', time: 2 },
    { name: 'Buxtehude', time: 2 },
    { name: 'Neukloster', time: 2 },
    { name: 'Horneburg', time: 2 },
    { name: 'Dollern', time: 2 },
    { name: 'Agathenburg', time: 2 },
    { name: 'Stade', time: 0 },
  ]
}

export const importantStations = [
  'Blankenese',
  'Altona',
  'Hauptbahnhof',
]

export const isStationImportant = (station) => importantStations.includes(station)