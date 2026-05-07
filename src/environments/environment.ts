
export const environment = {
  production: false,
  apiUrl: 'https://www.zommers.nl/service/index.php',
  mapboxApiToken: 'pk.eyJ1Ijoic2FnczQwIiwiYSI6ImNtaDBiOWNqbDBlYnV2eHMyYTNqZ2F2MzAifQ.mJDbuzANX3AXdomY4o0MPA',
  map: {
    style: 'mapbox://styles/mapbox/streets-v12',
    logoPath: 'https://zommers.nl/images/Logo20.png',
    defaultZoom: 9,
    defaultCenter: [4.30809, 52.07185],
    markerPopupText: 'Helena van Doeverenplantsoen 3, Den Haag',
  },
  contact: {
    slogan: 'Ready to Grab Some Bytes? Drop Us a Line!',
    phone: '06 12863601',
    email: 'hello@zommers.nl',
    address: 'Helena van Doeverenplantsoen 3, Den Haag',
  },
};
