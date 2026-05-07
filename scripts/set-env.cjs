require("dotenv").config();
const fs = require("fs");
const dotenv = require("dotenv");
dotenv.config();

const environment = `
export const environment = {
  production: false,
  apiUrl: '${process.env["API_URL"]}',
  mapboxApiToken: '${process.env["MAP_API_TOKEN"]}',
  map: {
    style: 'mapbox://styles/mapbox/streets-v12',
    logoPath: '${process.env["MAP_IMG_PATH"]}',
    defaultZoom: ${process.env["MAP_DEFAULT_ZOOM"]},
    defaultCenter: [${process.env["MAP_DEFAULT_CENTER_LNG"]}, ${process.env["MAP_DEFAULT_CENTER_LAT"]}],
    markerPopupText: '${process.env["MAP_MARKER_POPUP_TEXT"]}',
  },
  contact: {
    slogan: '${process.env["CONTACT_SLOGAN"]}',
    phone: '${process.env["CONTACT_PHONE"]}',
    email: '${process.env["CONTACT_EMAIL"]}',
    address: '${process.env["CONTACT_ADDRESS"]}',
  },
};
`;
console.log(
  "Writing to:",
  fs.realpathSync(".") + "/src/environments/environment.ts",
);
fs.writeFileSync("./src/environments/environment.ts", environment);
console.log("environment.ts generated successfully");
