const { Router } = require("express");
const router = Router();
const request = require("request");

const SENSOR_ID = 737831;

// const CODE_KEY = "function 키";
const URL_AZURE = `http://localhost:5000/virtualTableStorage`;

let itemList = [];

const tableAPI = () => {
  request(
    {
      url: URL_AZURE,
      method: "GET",
    },
    (err, res, body) => {
      if (res && res.statusCode === 200) {
        const json = JSON.parse(body);
        const data = json.filter((data) => data.SensorID === SENSOR_ID);
        const data1000 = data
          .sort((a, b) => {
            return a.SensingTime > b.SensingTime
              ? -1
              : a.SensingTime < b.SensingTime
              ? 1
              : 0;
          })
          .slice(0, 1000);
        itemList = data1000;
      } else {
        console.log(err);
      }
    }
  );
  itemList = [];
};

tableAPI();

setInterval(() => {
  tableAPI();
}, 600000);

router.get("/", (req, res) => {
  res.render("table.html", {
    itemList: itemList,
  });
});

module.exports = router;
