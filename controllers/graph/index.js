const { Router } = require("express");
const router = Router();
const request = require("request");

const SENSOR_ID = 737831;

// const CODE_KEY = "function 키";
const URL_AZURE = `http://localhost:5000/virtualTableStorage`;

let sensorTime = [],
  sensorDate = [],
  SENSOR_DATE_TIME,
  SENSOR_DATE,
  salt = [],
  ph = [],
  sensorTmep = [],
  doSensor = [],
  chlo = [];

const graphAPI = () => {
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
          .slice(0, 1000);
        data.forEach((arr) => {
          sensorTmep.push(String(arr.pi1_ui1).substring(0, 5));
          doSensor.push(String(arr.pi20_ui117).substring(0, 4));
          salt.push(String(arr.pi12_ui97).substring(0, 4));
          ph.push(String(arr.pi17_ui145).substring(0, 4));
          chlo.push(String(arr.pi50_ui118).substring(0, 4));
          sensorTime.push(
            "9" +
              arr.SensingTime.substring(4, 6) +
              arr.SensingTime.substring(7, 11)
          );
          sensorDate.push(arr.SensingTime.substring(0, 11));
        });

        const DATE_TIME = sensorDate[0];
        SENSOR_DATE_TIME = `20${DATE_TIME.replace("-", "").substring(
          0,
          2
        )}-${DATE_TIME.substring(2, 4)}-${DATE_TIME.substring(
          4,
          6
        )} ${DATE_TIME.substring(7, 9)}:${DATE_TIME.substring(9, 11)}`;
        SENSOR_DATE = `20${DATE_TIME.replace("-", "").substring(
          0,
          2
        )}-${DATE_TIME.substring(2, 4)}-${String(
          parseInt(DATE_TIME.substring(4, 6)) - 2
        )} ~ ${DATE_TIME.substring(4, 6)}`;
      } else {
        console.log(err);
      }
    }
  );
  sensorDate = [];
  sensorTime = [];
  SENSOR_DATE = "";
  SENSOR_DATE_TIME = "";
  sensorTmep = [];
  doSensor = [];
  salt = [];
  chlo = [];
  ph = [];
};
graphAPI();
setInterval(() => {
  graphAPI();
}, 600000);

router.get("/", (req, res) => {
  res.render("graph.html", {
    sensorTime: sensorTime,
    SENSOR_DATE: SENSOR_DATE,
    SENSOR_DATE_TIME: SENSOR_DATE_TIME,
    sensorTmep: sensorTmep,
    doSensor: doSensor,
    salt: salt,
    chlo: chlo,
    ph: ph,
  });
});

module.exports = router;
