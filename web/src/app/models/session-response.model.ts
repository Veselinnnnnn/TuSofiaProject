import { AddressResponseModel } from "./address-response.model";
import { HallResponseModel } from "./hall-response.model";
import { SpeakerResponseModel } from "./speaker-response.model";
import { UserModel } from "./user.model";

export class SessionResponseModel {

    public static readonly url = '/daySchedule';

    public id!: number;
    public sessionName!: string;
    public description!: string;
    public address: AddressResponseModel = new AddressResponseModel();
    public members: UserModel[] = [];
    public date!: String;
    public startTime: Date = new Date();
    public endTime: Date = new Date();
    public owner: UserModel = new UserModel();
    public hall: HallResponseModel = new HallResponseModel();
    public speaker: SpeakerResponseModel = new SpeakerResponseModel();

    public constructor(obj?: Partial<SessionResponseModel>) {
        Object.assign(this, obj);
    }

}
