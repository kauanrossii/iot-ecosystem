import IPositionPoint from "./position-point";

export default interface IPresenceInformation {
    position: IPositionPoint;
    presenceDetected: boolean;
};
