import { Kafka } from "kafkajs";
import IPresenceInformation from "./interfaces/presence-information";
import randomLocation from 'random-location'
import IPositionPoint from "./interfaces/position-point";
import ISensorData from "./interfaces/sensor-data";

const quantityFactoryAreas = 5;
const radius = 200;
const factoryCenterPosition: IPositionPoint = {
    latitude: 23.426306,
    longitude: 51.93825
};

const kafka = new Kafka({
    clientId: "iot-sensor",
    brokers: ['localhost:9093']
});

const producer = kafka.producer();
await producer.connect();

function collectAreaData(): IPresenceInformation[] {
    const presenceInformations: IPresenceInformation[] = [];

    for (let i = 0; i < quantityFactoryAreas; i++) {
        presenceInformations.push(collectSensorData());
    }

    return presenceInformations;
}

function collectSensorData(): IPresenceInformation {
    const randomPosition: IPositionPoint = randomLocation
        .randomCirclePoint(factoryCenterPosition, radius);

    return {
        position: randomPosition,
        presenceDetected: Boolean(Math.random())
    }
}

function prepareSensorData(): ISensorData {
    const areaData = collectAreaData();
    const currentDate = new Date(); 
    return {
        date: currentDate,
        sensorId: Number(process.env.SENSOR_ID) ?? 1,
        presenceInformations: areaData
    }
}

setInterval(() => {
    const sensorData = prepareSensorData();
    const sensorDataString = JSON.stringify(sensorData);

    producer.send({
        topic: 'factory-sensors-presence',
        messages: [
            { value: sensorDataString, key: process.env.SENSOR_ID }
        ]
    });
}, 3000);