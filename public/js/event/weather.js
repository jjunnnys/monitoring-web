const jsW = document.querySelectorAll(".js-w");
const weather = document.querySelectorAll(".js-weather");

const handleEvent = {
  mouseenter0: () => {
    weather[0].classList.add("w-text");
  },
  mouseleave0: () => {
    weather[0].classList.remove("w-text");
  },
  mouseenter1: () => {
    weather[1].classList.add("w-text");
  },
  mouseleave1: () => {
    weather[1].classList.remove("w-text");
  },
  mouseenter2: () => {
    weather[2].classList.add("w-text");
  },
  mouseleave2: () => {
    weather[2].classList.remove("w-text");
  },
  mouseenter3: () => {
    weather[3].classList.add("w-text");
  },
  mouseleave3: () => {
    weather[3].classList.remove("w-text");
  },
};

jsW[0].addEventListener("mouseenter", handleEvent.mouseenter0);
jsW[0].addEventListener("mouseleave", handleEvent.mouseleave0);

jsW[1].addEventListener("mouseenter", handleEvent.mouseenter1);
jsW[1].addEventListener("mouseleave", handleEvent.mouseleave1);

jsW[2].addEventListener("mouseenter", handleEvent.mouseenter2);
jsW[2].addEventListener("mouseleave", handleEvent.mouseleave2);

jsW[3].addEventListener("mouseenter", handleEvent.mouseenter3);
jsW[3].addEventListener("mouseleave", handleEvent.mouseleave3);
