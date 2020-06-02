(Chart.defaults.global.defaultFontFamily = "Nanum Gothic"),
  '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';

const ctx = document.querySelector(".js-allChart");
const dataTitle = document.querySelector(".js-data-title");
const selected = document.querySelectorAll(".js-selected");

const WT_CLICK_SELECT = "wt-click-select";
const DO_CLICK_SELECT = "do-click-select";
const SALT_CLICK_SELECT = "salt-click-select";
const CHLO_CLICK_SELECT = "chlo-click-select";
const PH_CLICK_SELECT = "ph-click-select";

let allChart;

// 시간
const timeList = [];
sensorTimeArr.forEach((arr) => {
  timeList.unshift(`${arr.substring(3, 5)}시 ${arr.substring(5, 7)}분`);
});

// 날짜
const dateList = [];
sensorTimeArr.forEach((arr) => {
  dateList.unshift(arr.substring(1, 3));
});

/* 수온 */
// wtList = 수온
const minTemp = Math.min.apply(null, wtList);
const maxTemp = Math.max.apply(null, wtList);

const wtData = [];
wtList.forEach((arr) => {
  wtData.unshift(arr);
});

const wtConfig = {
  type: "line",
  data: {
    labels: timeList,
    datasets: [
      {
        labels: "수온",
        lineTension: 0.3,
        backgroundColor: "rgba(24, 100, 171, 0.3)",
        borderColor: "#1864ab",
        pointRadius: 2,
        pointHoverBackgroundColor: "#495057", // 고정
        pointHoverBorderColor: "#ced4da", // 고정
        pointHitRadius: 2,
        pointBorderWidth: 0.5,
        data: wtData,
      },
    ],
  },
  options: {
    maintainAspectRatio: false,
    layout: {
      padding: {
        left: 5,
        right: 20,
        top: 30,
        bottom: 10,
      },
    },
    scales: {
      xAxes: [
        {
          gridLines: {
            display: false,
            drawBorder: true,
          },
          ticks: {
            maxTicksLimit: 6,
          },
        },
      ],
      yAxes: [
        {
          ticks: {
            maxTicksLimit: 7,
            padding: 10,
            suggestedMin: Math.floor(minTemp) - 1,
            suggestedMax: Math.ceil(maxTemp) + 1,
            callback: (value, index, values) => {
              return value + ` ℃`;
            },
          },
          gridLines: {
            color: "#ced4da", // 고정
            drawBorder: false,
            borderDash: [5, 20],
            zeroLineBorderDash: [2],
          },
        },
      ],
    },
    legend: {
      display: false,
    },
    tooltips: {
      backgroundColor: "#f1f3f5", // 고정
      bodyFontColor: "#1864ab",
      titleMarginBottom: 10,
      titleFontColor: "#495057", // 고정
      titleFontSize: 15,
      borderColor: "#1864ab",
      borderWidth: 4,
      xPadding: 15,
      yPadding: 10,
      displayColors: false,
      intersect: false,
      mode: "nearest",
      caretPadding: 10,
      callbacks: {
        label: (tooltipItem, chart) => {
          const datasetLabel =
            chart.datasets[tooltipItem.datasetIndex].labels || "";
          return `${datasetLabel} : ${tooltipItem.yLabel} ℃`;
        },
        title: (tooltipItem, chart) => {
          const tooltipTitle = chart.labels[tooltipItem[0].index];
          return `${dateList[tooltipItem[0].index]}일 ${tooltipTitle}`;
        },
      },
    },
  },
};

/* 용존산소 */
// doList = 용존산소
const doMin = Math.min.apply(null, doList);
const doMax = Math.max.apply(null, doList);

const doData = [];
doList.forEach((arr) => {
  doData.unshift(arr);
});

const doConfig = {
  type: "line",
  data: {
    labels: timeList,
    datasets: [
      {
        labels: "용존산소",
        lineTension: 0.3,
        backgroundColor: "rgba(92, 124, 250, 0.3)", // do버튼색
        borderColor: "#5c7cfa", // do버튼색
        pointRadius: 2,
        pointHoverBackgroundColor: "#495057", // 고정
        pointHoverBorderColor: "#ced4da", // 고정
        pointHitRadius: 2,
        pointBorderWidth: 0.5,
        data: doData,
      },
    ],
  },
  options: {
    maintainAspectRatio: false,
    layout: {
      padding: {
        left: 5,
        right: 20,
        top: 30,
        bottom: 10,
      },
    },
    scales: {
      xAxes: [
        {
          gridLines: {
            display: false,
            drawBorder: true,
          },
          ticks: {
            maxTicksLimit: 6,
          },
        },
      ],
      yAxes: [
        {
          ticks: {
            maxTicksLimit: 7,
            padding: 10,
            suggestedMin: Math.floor(doMin) - 1,
            suggestedMax: Math.ceil(doMax) + 1,
            callback: (value, index, values) => {
              return value + " ㎎/L";
            },
          },
          gridLines: {
            color: "#ced4da", // 고정
            drawBorder: false,
            borderDash: [5, 20],
            zeroLineBorderDash: [2],
          },
        },
      ],
    },
    legend: {
      display: false,
    },
    tooltips: {
      backgroundColor: "#f1f3f5", // 고정
      bodyFontColor: "#5c7cfa", // do 버튼색
      titleMarginBottom: 10,
      titleFontColor: "#495057", // 고정
      titleFontSize: 15,
      borderColor: "#5c7cfa", // do 버튼색
      borderWidth: 4,
      xPadding: 15,
      yPadding: 10,
      displayColors: false,
      intersect: false,
      mode: "nearest",
      caretPadding: 10,
      callbacks: {
        label: (tooltipItem, chart) => {
          const datasetLabel =
            chart.datasets[tooltipItem.datasetIndex].labels || "";
          return `${datasetLabel} : ${tooltipItem.yLabel} ㎎/L`;
        },
        title: (tooltipItem, chart) => {
          const tooltipTitle = chart.labels[tooltipItem[0].index];
          return `${dateList[tooltipItem[0].index]}일 ${tooltipTitle}`;
        },
      },
    },
  },
};

/* 염도 */
// saltList = 염도
const saltMin = Math.min.apply(null, saltList);
const saltMax = Math.max.apply(null, saltList);

const slatData = [];
saltList.forEach((arr) => {
  slatData.unshift(arr);
});

const saltConfig = {
  type: "line",
  data: {
    labels: timeList,
    datasets: [
      {
        labels: "염도",
        lineTension: 0.3,
        backgroundColor: "rgba(56, 217, 169, 0.3)", // 버튼색
        borderColor: "#38D9A9", // 버튼색
        pointRadius: 2,
        pointHoverBackgroundColor: "#495057", // 고정
        pointHoverBorderColor: "#ced4da", // 고정
        pointHitRadius: 2,
        pointBorderWidth: 0.5,
        data: slatData,
      },
    ],
  },
  options: {
    maintainAspectRatio: false,
    layout: {
      padding: {
        left: 5,
        right: 20,
        top: 30,
        bottom: 10,
      },
    },
    scales: {
      xAxes: [
        {
          gridLines: {
            display: false,
            drawBorder: true,
          },
          ticks: {
            maxTicksLimit: 6,
          },
        },
      ],
      yAxes: [
        {
          ticks: {
            maxTicksLimit: 7,
            padding: 10,
            suggestedMin: Math.floor(saltMin) - 1,
            suggestedMax: Math.ceil(saltMax) + 1,
            callback: (value, index, values) => {
              return value + " PSU";
            },
          },
          gridLines: {
            color: "#ced4da", // 고정
            drawBorder: false,
            borderDash: [5, 20],
            zeroLineBorderDash: [2],
          },
        },
      ],
    },
    legend: {
      display: false,
    },
    tooltips: {
      backgroundColor: "#f1f3f5", // 고정
      bodyFontColor: "#38D9A9", // 버튼색
      titleMarginBottom: 10,
      titleFontColor: "#495057", // 고정
      titleFontSize: 15,
      borderColor: "#38D9A9", // 버튼색
      borderWidth: 4,
      xPadding: 15,
      yPadding: 10,
      displayColors: false,
      intersect: false,
      mode: "nearest",
      caretPadding: 10,
      callbacks: {
        label: (tooltipItem, chart) => {
          const datasetLabel =
            chart.datasets[tooltipItem.datasetIndex].labels || "";
          return `${datasetLabel} : ${tooltipItem.yLabel} PSU`;
        },
        title: (tooltipItem, chart) => {
          const tooltipTitle = chart.labels[tooltipItem[0].index];
          return `${dateList[tooltipItem[0].index]}일 ${tooltipTitle}`;
        },
      },
    },
  },
};

/* 클로로필 */
// chloList = 클로로필
const chloMin = Math.min.apply(null, chloList);
const chloMax = Math.max.apply(null, chloList);

const chloData = [];
chloList.forEach((arr) => {
  chloData.unshift(arr);
});

const chloConfig = {
  type: "line",
  data: {
    labels: timeList,
    datasets: [
      {
        labels: "클로로필",
        lineTension: 0.3,
        backgroundColor: "rgba(92, 148, 13, 0.3)", // 버튼색
        borderColor: "#5c940d", // 버튼색
        pointRadius: 2,
        pointHoverBackgroundColor: "#495057", // 고정
        pointHoverBorderColor: "#ced4da", // 고정
        pointHitRadius: 2,
        pointBorderWidth: 0.5,
        data: chloData,
      },
    ],
  },
  options: {
    maintainAspectRatio: false,
    layout: {
      padding: {
        left: 5,
        right: 20,
        top: 30,
        bottom: 10,
      },
    },
    scales: {
      xAxes: [
        {
          gridLines: {
            display: false,
            drawBorder: true,
          },
          ticks: {
            maxTicksLimit: 6,
          },
        },
      ],
      yAxes: [
        {
          ticks: {
            maxTicksLimit: 7,
            padding: 10,
            suggestedMin: Math.floor(chloMin),
            suggestedMax: Math.ceil(chloMax),
            callback: (value, index, values) => {
              return value + " μg/L";
            },
          },
          gridLines: {
            color: "#ced4da", // 고정
            drawBorder: false,
            borderDash: [5, 20],
            zeroLineBorderDash: [2],
          },
        },
      ],
    },
    legend: {
      display: false,
    },
    tooltips: {
      backgroundColor: "#f1f3f5", // 고정
      bodyFontColor: "#5c940d", // 버튼색
      titleMarginBottom: 10,
      titleFontColor: "#495057", // 고정
      titleFontSize: 15,
      borderColor: "#5c940d", // 버튼색
      borderWidth: 4,
      xPadding: 15,
      yPadding: 10,
      displayColors: false,
      intersect: false,
      mode: "nearest",
      caretPadding: 10,
      callbacks: {
        label: (tooltipItem, chart) => {
          const datasetLabel =
            chart.datasets[tooltipItem.datasetIndex].labels || "";
          return `${datasetLabel} : ${tooltipItem.yLabel} μg/L`;
        },
        title: (tooltipItem, chart) => {
          const tooltipTitle = chart.labels[tooltipItem[0].index];
          return `${dateList[tooltipItem[0].index]}일 ${tooltipTitle}`;
        },
      },
    },
  },
};

/* pH */
// phList = pH
const phMin = Math.min.apply(null, phList);
const phMax = Math.max.apply(null, phList);

const phData = [];
phList.forEach((arr) => {
  phData.unshift(arr);
});

const phConfig = {
  type: "line",
  data: {
    labels: timeList,
    datasets: [
      {
        labels: "pH",
        lineTension: 0.3,
        backgroundColor: "rgba(255, 107, 107, 0.3)", // 버튼색
        borderColor: "#FF6B6B", // 버튼색
        pointRadius: 2,
        pointHoverBackgroundColor: "#495057", // 고정
        pointHoverBorderColor: "#ced4da", // 고정
        pointHitRadius: 2,
        pointBorderWidth: 0.5,
        data: phData,
      },
    ],
  },
  options: {
    maintainAspectRatio: false,
    layout: {
      padding: {
        left: 5,
        right: 20,
        top: 30,
        bottom: 10,
      },
    },
    scales: {
      xAxes: [
        {
          gridLines: {
            display: false,
            drawBorder: true,
          },
          ticks: {
            maxTicksLimit: 6,
          },
        },
      ],
      yAxes: [
        {
          ticks: {
            maxTicksLimit: 7,
            padding: 10,
            suggestedMin: Math.floor(phMin),
            suggestedMax: Math.ceil(phMax),
            callback: (value, index, values) => {
              return value + " pH";
            },
          },
          gridLines: {
            color: "#ced4da", // 고정
            drawBorder: false,
            borderDash: [5, 20],
            zeroLineBorderDash: [2],
          },
        },
      ],
    },
    legend: {
      display: false,
    },
    tooltips: {
      backgroundColor: "#f1f3f5", // 고정
      bodyFontColor: "#FF6B6B", // 버튼색
      titleMarginBottom: 10,
      titleFontColor: "#495057", // 고정
      titleFontSize: 15,
      borderColor: "#FF6B6B", // 버튼색
      borderWidth: 4,
      xPadding: 15,
      yPadding: 10,
      displayColors: false,
      intersect: false,
      mode: "nearest",
      caretPadding: 10,
      callbacks: {
        label: (tooltipItem, chart) => {
          const datasetLabel =
            chart.datasets[tooltipItem.datasetIndex].labels || "";
          return `${datasetLabel} : ${tooltipItem.yLabel} pH`;
        },
        title: (tooltipItem, chart) => {
          const tooltipTitle = chart.labels[tooltipItem[0].index];
          return `${dateList[tooltipItem[0].index]}일 ${tooltipTitle}`;
        },
      },
    },
  },
};

// 이벤트
const eventHandele = {
  wtShowGraph: () => {
    selected[0].classList.add(WT_CLICK_SELECT);
    selected[1].classList.remove(DO_CLICK_SELECT);
    selected[2].classList.remove(SALT_CLICK_SELECT);
    selected[3].classList.remove(CHLO_CLICK_SELECT);
    selected[4].classList.remove(PH_CLICK_SELECT);

    dataTitle.innerHTML = `수온 데이터 분포`;

    if (allChart) {
      allChart.destroy();
    }

    allChart = new Chart(ctx, wtConfig);
  },
  doShowGraph: () => {
    selected[1].classList.add(DO_CLICK_SELECT);
    selected[0].classList.remove(WT_CLICK_SELECT);
    selected[2].classList.remove(SALT_CLICK_SELECT);
    selected[3].classList.remove(CHLO_CLICK_SELECT);
    selected[4].classList.remove(PH_CLICK_SELECT);

    dataTitle.innerHTML = `용존산소 데이터 분포`;

    if (allChart) {
      allChart.destroy();
    }

    allChart = new Chart(ctx, doConfig);
  },
  saltShowGraph: () => {
    selected[2].classList.add(SALT_CLICK_SELECT);
    selected[0].classList.remove(WT_CLICK_SELECT);
    selected[1].classList.remove(DO_CLICK_SELECT);
    selected[3].classList.remove(CHLO_CLICK_SELECT);
    selected[4].classList.remove(PH_CLICK_SELECT);

    dataTitle.innerHTML = `염도 데이터 분포`;

    if (allChart) {
      allChart.destroy();
    }

    allChart = new Chart(ctx, saltConfig);
  },
  chloShowGraph: () => {
    selected[3].classList.add(CHLO_CLICK_SELECT);
    selected[0].classList.remove(WT_CLICK_SELECT);
    selected[1].classList.remove(DO_CLICK_SELECT);
    selected[2].classList.remove(SALT_CLICK_SELECT);
    selected[4].classList.remove(PH_CLICK_SELECT);

    dataTitle.innerHTML = `클로로필 데이터 분포`;

    if (allChart) {
      allChart.destroy();
    }

    allChart = new Chart(ctx, chloConfig);
  },
  phShowGraph: () => {
    selected[4].classList.add(PH_CLICK_SELECT);
    selected[0].classList.remove(WT_CLICK_SELECT);
    selected[1].classList.remove(DO_CLICK_SELECT);
    selected[2].classList.remove(SALT_CLICK_SELECT);
    selected[3].classList.remove(CHLO_CLICK_SELECT);

    dataTitle.innerHTML = `pH 데이터 분포`;

    if (allChart) {
      allChart.destroy();
    }

    allChart = new Chart(ctx, phConfig);
  },
};
eventHandele.wtShowGraph();
selected[0].addEventListener("click", eventHandele.wtShowGraph);
selected[1].addEventListener("click", eventHandele.doShowGraph);
selected[2].addEventListener("click", eventHandele.saltShowGraph);
selected[3].addEventListener("click", eventHandele.chloShowGraph);
selected[4].addEventListener("click", eventHandele.phShowGraph);
