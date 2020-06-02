const { Router } = require("express");
const router = Router();
const request = require("request");

const SERVICE_KEY = "서비스키";
const URL = `http://www.khoa.go.kr/oceangrid/grid/api/buObsRecent/search.do?ServiceKey=${SERVICE_KEY}&ObsCode=TW_0069&ResultType=json`;

let item;

const weatherAPI = () => {
  request(
    {
      url: URL,
      method: "GET",
    },
    (err, res, body) => {
      if (res && res.statusCode === 200) {
        const json = JSON.parse(body);
        item = json.result.data;
      } else {
        console.log(err);
      }
    }
  );
  item = "";
};
weatherAPI();

setInterval(() => {
  weatherAPI();
}, 600000);

router.get("/", (req, res) => {
  res.render("weather.html", {
    at: item.air_temp,
    wt: item.water_temp,
    ws: item.wind_speed,
    wh: item.wave_height,
    time: item.record_time,
  });
});

module.exports = router;
