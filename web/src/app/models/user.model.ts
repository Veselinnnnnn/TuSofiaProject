export class UserModel {

    public static readonly signUpUrl = '/signUp';
    public static readonly signInUrl = '/signIn';
    public static readonly url = '/users';

    public id !: number;
    public firstName!: string;
    public lastName!: string;
    public username!: string;
    public email!: string;
    public password!: string;
    public role: string = "LOGGED_USER";

    public constructor(obj?: Partial<UserModel>) {
        Object.assign(this, obj);
    }

}
