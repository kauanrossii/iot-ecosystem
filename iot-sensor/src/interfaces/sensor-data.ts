import IPresenceInformation from "./presence-information";

export default interface ISensorData {
    date: Date;
    sensorId: number;
    presenceInformations: IPresenceInformation[];
};
