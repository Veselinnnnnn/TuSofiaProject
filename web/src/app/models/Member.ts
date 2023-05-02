import { UserModel } from "./user.model";

export class Member {

    public sessionId!:number;
    public members: UserModel[] = [];

    public constructor(obj?: Partial<Member>) {
        Object.assign(this, obj);
    }

}
