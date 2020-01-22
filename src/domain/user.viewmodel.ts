import { IsNotEmpty, Length } from "class-validator"
export class userViewModel {
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