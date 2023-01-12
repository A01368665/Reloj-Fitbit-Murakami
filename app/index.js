import clock from "clock";
import * as document from "document";
import { HeartRateSensor } from "heart-rate";
import { display } from "display";
import { me as appbit } from "appbit";
// Tick every second
clock.granularity = "seconds";
const clockLabel = document.getElementById("clock-label");
//let hourHand = document.getElementById("hours");
let minHand = document.getElementById("mins");
let rostro = document.getElementById("Flor");
let corazon = document.getElementById("heart");

//let secHand = document.getElementById("secs");

// Returns an angle (0-360) for the current hour in the day, including minutes
function hoursToAngle(hours, minutes) {
  let hourAngle = (360 / 12) * hours;
  let minAngle = (360 / 12 / 60) * minutes;
  return hourAngle + minAngle;
}

// Returns an angle (0-360) for minutes
function minutesToAngle(minutes) {
  return (360 / 60) * minutes;
}

// Returns an angle (0-360) for seconds
function secondsToAngle(seconds) {
  return (360 / 60) * seconds;
}


//corazon

if (HeartRateSensor && appbit.permissions.granted("access_heart_rate")) {
  const hrm = new HeartRateSensor({ frequency: 1 });
  hrm.addEventListener("reading", () => {
    corazon.text = "bmp " + hrm.heartRate 
  });
  display.addEventListener("change", () => {
    // Automatically stop the sensor when the screen is off to conserve battery
    display.on ? hrm.start() : hrm.stop();
  });
  hrm.start();
hrm.start()
}

// Rotate the hands every tick
function updateClock(tick) {
  let today = new Date();
  let hours = today.getHours();
  let mins = today.getMinutes();
  let secs = today.getSeconds();
  
  minHand.groupTransform.rotate.angle = secondsToAngle(secs);
clockLabel.text = hours + ":" + mins;

  

  //minHand.groupTransform.rotate.angle = minutesToAngle(mins);
  //hourHand.groupTransform.rotate.angle = hoursToAngle(hours, mins);
}
function kuchau() {
 
  rostro.href ="3.png";
  setTimeout(function(){
      rostro.href ="2.png";
  },500);
}


// Update the clock every tick event
clock.addEventListener("tick", (tick) => updateClock(tick));
minHand.addEventListener("click", kuchau);