const { Router } = require("express");
const router = Router();
const request = require("request");

const SENSOR_ID = 737831;

// const CODE_KEY = "function 키";
const URL_AZURE = `http://localhost:5000/virtualTableStorage`;

let lat = [],
  lon = [];

const mapAPI = () => {
  request(
    {
      url: URL_AZURE,
      method: "GET",
    },
    (err, res, body) => {
      if (res && res.statusCode === 200) {
        const json = JSON.parse(body);
        const data = json.filter((data) => data.SensorID === SENSOR_ID);
        data
          .sort((a, b) => {
            return a.SensingTime > b.SensingTime
              ? -1
              : a.SensingTime < b.SensingTime
              ? 1
              : 0;
          })
          .slice(0, 1);

        data.forEach((arr) => {
          lat.push(String(arr.gpsLAT));
          lon.push(String(arr.gpsLONG));
        });

        const geoLat = lat[0]; // 10
        const geoLon = lon[0]; // 11
        GEO_LAT_INT = `${geoLat.replace(".", "").substring(0, 2)}`;
        GEO_LAT_FLOAT = `${geoLat.substring(2, 10)}`;
        GEO_LON_INT = `${geoLon.replace(".", "").substring(0, 3)}`;
        GEO_LON_FLOAT = `${geoLon.substring(3, 11)}`;
      } else {
        console.log(err);
      }
    }
  );
  lat = [];
  lon = [];
  GEO_LAT_INT = "";
  GEO_LAT_FLOAT = "";
  GEO_LON_INT = "";
  GEO_LON_FLOAT = "";
};
mapAPI();

setInterval(() => {
  mapAPI();
}, 600000);

router.get("/", (req, res) => {
  res.render("map.html", {
    GEO_LAT_INT: GEO_LAT_INT,
    GEO_LAT_FLOAT: GEO_LAT_FLOAT,
    GEO_LON_INT: GEO_LON_INT,
    GEO_LON_FLOAT: GEO_LON_FLOAT,
  });
});

module.exports = router;
