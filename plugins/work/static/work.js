const weekdays = [
  "Vasárnap",
  "Hétfő",
  "Kedd",
  "Szerda",
  "Csütörtök",
  "Péntek",
  "Szombat",
];
const t0540 = 20400;
const t0550 = 21000;
const t0600 = 21600;
const t1340 = 49200;
const t1350 = 49800;
const t1400 = 50400;
const t2140 = 78000;
const t2150 = 78600;
const t2200 = 79200;
const t2400 = 86400;
const t0800 = 28800;
const t1140 = 42000;
const t1200 = 43200;
const t1740 = 63600;
const t1750 = 64200;
const t1800 = 64800;

console.log("own.js loaded");
function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  var expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function timeToSec(h, m, s) {
  return h * 3600 + m * 60 + s;
}

function timeToSec(date) {
  let s = 0;
  s += date.getHours() * 3600;
  s += date.getMinutes() * 60;
  s += date.getSeconds();
  return s;
}

function db8(darab) {
  let date = new Date();
  let sec = timeToSec(date);
  let takt = t0800 / darab;
  if (sec <= t0550) sec += 7800;
  else if (sec <= t1350) sec -= t0550;
  else if (sec <= t2150) sec -= t1350;
  else sec -= t2150;

  return (sec / takt).toFixed(0);
}

function db12(darab) {
  let date = new Date();
  let sec = timeToSec(date);
  let takt = t1140 / darab;
  if (sec <= t0540) sec += t0600;
  else if (sec <= t1740) sec -= t0600;
  else sec -= t1800;

  return (sec / takt).toFixed(0);
}

// Returns the ISO week of the date.
Date.prototype.getWeek = function () {
  var date = new Date(this.getTime());
  date.setHours(0, 0, 0, 0);
  // Thursday in current week decides the year.
  date.setDate(date.getDate() + 3 - ((date.getDay() + 6) % 7));
  // January 4 is always in week 1.
  var week1 = new Date(date.getFullYear(), 0, 4);
  // Adjust to Thursday in week 1 and count number of weeks from date to week1.
  return (
    1 +
    Math.round(
      ((date.getTime() - week1.getTime()) / 86400000 -
        3 +
        ((week1.getDay() + 6) % 7)) /
        7
    )
  );
};

// Returns the four-digit year corresponding to the ISO week of the date.
Date.prototype.getWeekYear = function () {
  var date = new Date(this.getTime());
  date.setDate(date.getDate() + 3 - ((date.getDay() + 6) % 7));
  return date.getFullYear();
};

function selectWeek() {
  console.log("selectWeek run");
  let tds = document.getElementsByTagName("td");
  let date = new Date();
  console.log(date);
  for (let i = 0; i < tds.length; i++) {
    if (tds[i].innerHTML == "KW" + date.getWeek()) {
      tds[i].style =
        "color:red; background-color:black; font-weight:bolder; border: 2px solid red";
      console.log(tds[i].innerHTML);
    }
  }
}
