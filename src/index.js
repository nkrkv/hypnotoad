import mqtt from 'mqtt';

const MQTT_BROKER_URL = 'ws://localhost:9001';

const client = mqtt.connect(MQTT_BROKER_URL);

function onEyeControlClick() {
  const { queue, payload } = this.dataset;
  client.publish(`toad/eye/${queue}`, payload);
}

document
  .querySelectorAll(".toad__eye__control")
  .forEach(e => e.addEventListener('click', onEyeControlClick));
