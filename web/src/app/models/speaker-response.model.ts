import { UserModel } from "./user.model";

export class SpeakerResponseModel {

    public static readonly url = '/speakers';

    public id !: number ;
    public speakerName!: string;
    public description!: string;
    public profilePhoto!: string;
    public owner: UserModel = new UserModel();

    public constructor(obj?: Partial<SpeakerResponseModel>) {
        Object.assign(this, obj);
    }
}
