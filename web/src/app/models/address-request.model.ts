import { UserModel } from "./user.model";

export class AddressRequestModel {

    public static readonly url = '/addresses';

    public id !: number;
    public addressName!: string;
    public owner!: number;

    public constructor(obj?: Partial<AddressRequestModel>) {
        Object.assign(this, obj);
    }

}
