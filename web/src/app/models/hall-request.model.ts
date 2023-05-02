import { AddressResponseModel } from "./address-response.model";
import { UserModel } from "./user.model";

export class HallRequestModel {

    public static readonly url = '/halls';

    public id !: number ;
    public name!: string;
    public seatCapacity!: number;
    public owner!: number;
    public address!: number;

    public constructor(obj?: Partial<HallRequestModel>) {
        Object.assign(this, obj);
    }
}
