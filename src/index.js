import mqtt from 'mqtt';

const MQTT_BROKER_URL = 'ws://localhost:9001';

const client = mqtt.connect(MQTT_BROKER_URL);

setInterval(() => {
  client.publish('toad', 'hello');
}, 5000);
