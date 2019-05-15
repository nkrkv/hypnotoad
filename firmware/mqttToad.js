const ssid = "Droidxx";
const password = "mega2560";
const brokerHostname = "toad.amperka.ru";

/*
 * Amperka WiFi Slot port aliases
 * (should be no longer required one day)
 */
const SDA = D2;
const SCL = D0;

const A0 = D3;
const A1 = D1;
const A2 = D16;
const A3 = D13;
const A4 = D5;
const A5 = D14;
const A6 = D4;
const A7 = D12;

const leftEye = require("@amperka/servo").connect(A5);
const rightEye = require("@amperka/servo").connect(A7);

const wifi = require("Wifi");
const mqtt = require("tinyMQTT").create(brokerHostname);

mqtt.on("connected", function() {
  mqtt.subscribe("toad/eye/left");
  mqtt.subscribe("toad/eye/right");
  console.log("Connected to broker", brokerHostname);
});

mqtt.on("message", function(msg) {
  console.log(msg.topic, msg.message);
  const eye =
    (msg.topic === "toad/eye/left") ? leftEye :
    (msg.topic === "toad/eye/right") ? rightEye :
    null;

  if (eye) {
    eye.write(Number(msg.message), "us");
  }
});

mqtt.on("published", function() {
  console.log("message sent");
});

mqtt.on("disconnected", function() {
  console.log("Lost connection to broker");
  mqtt.connect();
});

console.log("Connecting to SSID", ssid, "...");
wifi.connect(ssid, { password: password }, function(e) {
  if (e) {
    console.log("Error connecting:", e);
    wifi.disconnect();
  } else {
    console.log("Connected to Wi-Fi");
    console.log("Connecting to broker ...");
    wifi.stopAP();
    mqtt.connect();
  }
});
