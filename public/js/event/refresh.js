const refresh = document.querySelector(".js-loading");

if (refresh) {
  setTimeout(() => {
    location.reload();
  }, 2000);
} else {
  setInterval(() => {
    location.reload();
  }, 600000);
}
