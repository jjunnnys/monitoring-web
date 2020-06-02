const container = document.querySelector(".js-map"), //지도를 담을 영역의 DOM 레퍼런스
  sensorLocBtn = document.querySelector(".js-curr-btn");

let geoLat, geoLon;
const latFloat = (GEO_LAT_FLOAT / 60).toFixed(5);
const lonFloat = (GEO_LON_FLOAT / 60).toFixed(6);

if (GEO_LAT_INT && GEO_LON_INT) {
  geoLat = GEO_LAT_INT + parseFloat(latFloat);
  geoLon = GEO_LON_INT + parseFloat(lonFloat);
}

const LAT = geoLat;
const LON = geoLon;

const options = {
  center: new kakao.maps.LatLng(LAT, LON), // 가상 현재 위치
  level: 10,
};
const map = new kakao.maps.Map(container, options); //지도 생성 및 객체 리턴

const mapTypeControl = new kakao.maps.MapTypeControl();
map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);

const zoomControl = new kakao.maps.ZoomControl();
map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

const position = new kakao.maps.LatLng(LAT, LON);

// 마커를 생성합니다
const marker = new kakao.maps.Marker({
  position,
  clickable: true,
});

// 마커를 지도에 표시합니다.
marker.setMap(map);

// 마커를 클릭했을 때 마커 위에 표시할 인포윈도우를 생성합니다
const iwContent = '<div style="padding:5px;">buoy</div>',
  iwRemoveable = true;

// 인포윈도우를 생성합니다
const infowindow = new kakao.maps.InfoWindow({
  content: iwContent,
  removable: iwRemoveable,
});

// 마커에 클릭이벤트를 등록합니다
kakao.maps.event.addListener(marker, "click", function () {
  // 마커 위에 인포윈도우를 표시합니다
  infowindow.open(map, marker);
});

const setZoomable = (zoomable) => {
  // 마우스 휠로 지도 확대,축소 가능여부를 설정합니다
  map.setZoomable(zoomable);
};

setZoomable();

const panTo = () => {
  const moveLatLon = new kakao.maps.LatLng(LAT, LON);
  map.panTo(moveLatLon);
};

sensorLocBtn.addEventListener("click", panTo);
