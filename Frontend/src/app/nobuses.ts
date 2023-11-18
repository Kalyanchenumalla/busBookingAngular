import { busData } from "./busdata";
export interface buses {
    success: boolean,
    busData: busData[],
    message: string,
}