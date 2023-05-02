import { UserModel } from "./user.model";

export class AddressResponseModel {

    public static readonly url = '/addresses';

    public id !: number;
    public addressName!: string;
    public owner: UserModel = new UserModel();

    public constructor(obj?: Partial<AddressResponseModel>) {
        Object.assign(this, obj);
    }

}
