import mqtt from 'mqtt';

const client = mqtt.connect(`ws://${location.hostname}:9001`);

function onEyeControlClick() {
  const { queue, payload } = this.dataset;
  client.publish(`toad/eye/${queue}`, payload);
}

document
  .querySelectorAll(".toad__eye__control")
  .forEach(e => e.addEventListener('click', onEyeControlClick));
