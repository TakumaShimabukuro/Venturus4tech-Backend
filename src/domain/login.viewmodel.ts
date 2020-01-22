import { IsNotEmpty, Length } from "class-validator"
export class loginViewModel {
    @IsNotEmpty()
    @Length(3, 15)
    readonly userLogin: string;

    @IsNotEmpty()
    @Length(3, 10)
    readonly password: string;

}