import { AddressResponseModel } from "./address-response.model";
import { UserModel } from "./user.model";

export class SessionRequestModel {

    public static readonly url = '/daySchedule';

    public id!: number;
    public sessionName!: string;
    public description!: string;
    public address!: number;
    public members: UserModel[] = [];
    public date!: String;
    public startTime: Date = new Date();
    public endTime: Date = new Date();
    public owner!: number;
    public hall!: number;
    public speaker!: number;

    public constructor(obj?: Partial<SessionRequestModel>) {
        Object.assign(this, obj);
    }

}
