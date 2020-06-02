const { Router } = require("express");
const router = Router();

// setInterval(() => {
//   sensorAPI();
// }, 600000);
// setInterval(() => {
//   weatherAPI();
// }, 600000);

router.get("/", (req, res) => {
  res.render("index.html", {
    title: "Monitoring System",
  });
});

router.use("/graph", require("./graph"));
router.use("/table", require("./table"));
router.use("/map", require("./map"));
router.use("/weather", require("./weather"));

module.exports = router;
