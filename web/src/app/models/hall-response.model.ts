import { AddressResponseModel } from "./address-response.model";
import { UserModel } from "./user.model";

export class HallResponseModel {

    public static readonly url = '/halls';

    public id !: number ;
    public name!: string;
    public seatCapacity!: number;
    public owner: UserModel = new UserModel();
    public address: AddressResponseModel = new AddressResponseModel();

    public constructor(obj?: Partial<HallResponseModel>) {
        Object.assign(this, obj);
    }
}
