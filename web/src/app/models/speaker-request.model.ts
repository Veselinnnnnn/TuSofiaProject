import { UserModel } from "./user.model";

export class SpeakerRequestModel {

    public static readonly url = '/speakers';

    public id !: number ;
    public speakerName!: string;
    public description!: string;
    public profilePhoto!: File;
    public owner!: number;

    public constructor(obj?: Partial<SpeakerRequestModel>) {
        Object.assign(this, obj);
    }
}
