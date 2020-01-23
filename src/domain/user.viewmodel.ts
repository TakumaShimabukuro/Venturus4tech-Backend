import { IsNotEmpty, Length } from "class-validator"
export class userViewModel {

    constructor(userLogin: string, userName: string, password: string){
        this.userName = userName;
        this.userLogin = userLogin;
        this.password = password;
    }

    @IsNotEmpty()
    @Length(3, 10)
    readonly userLogin: string;

    @IsNotEmpty()
    @Length(3, 15)
    readonly userName: string;

    @IsNotEmpty()
    @Length(3, 10)
    readonly password: string;

}